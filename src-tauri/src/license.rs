//! Trial and license management for Hush.
//!
//! Model: a 14-day free trial starting at first launch, then a paid
//! lifetime license activated against the Dodo Payments license API.
//! Everything stays local-first: after activation the entitlement is
//! cached on disk and validation is re-checked online at most every
//! few days. Network failures never lock out a licensed user.
//!
//! State is dual-written to two files and HMAC-signed so that casual
//! tampering with one file does not reset the trial or forge a license.

use serde::{Deserialize, Serialize};
use specta::Type;
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Emitter, Manager};

pub const TRIAL_DAYS: i64 = 14;
fn license_api_base() -> String {
    std::env::var("HUSH_LICENSE_API_BASE")
        .unwrap_or_else(|_| "https://live.dodopayments.com/licenses".to_string())
}
const REVALIDATE_AFTER_SECS: i64 = 7 * 24 * 60 * 60; // weekly best-effort revalidation
const DAY_SECS: i64 = 86_400;

// Obfuscated signing key for the local state files. This is reasonable
// obscurity, not real cryptography against a determined attacker: it
// stops casual file edits, which is the bar for a $19 indie license.
const SIGN_KEY_XOR: [u8; 32] = [
    0x3b, 0x51, 0x6a, 0x28, 0x7f, 0x44, 0x19, 0x62, 0x0d, 0x73, 0x5e, 0x31, 0x47, 0x26, 0x6b,
    0x58, 0x04, 0x3c, 0x71, 0x2a, 0x66, 0x1d, 0x49, 0x37, 0x0a, 0x5f, 0x22, 0x6e, 0x14, 0x79,
    0x43, 0x08,
];

fn signing_key() -> [u8; 32] {
    let mut k = [0u8; 32];
    for (i, b) in SIGN_KEY_XOR.iter().enumerate() {
        k[i] = b ^ 0x5a;
    }
    k
}

// ---------- SHA-256 + HMAC (dependency-free) ----------

const SHA256_K: [u32; 64] = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

fn sha256(data: &[u8]) -> [u8; 32] {
    let mut h: [u32; 8] = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab,
        0x5be0cd19,
    ];
    let bit_len = (data.len() as u64).wrapping_mul(8);
    let mut msg = data.to_vec();
    msg.push(0x80);
    while msg.len() % 64 != 56 {
        msg.push(0);
    }
    msg.extend_from_slice(&bit_len.to_be_bytes());

    for chunk in msg.chunks_exact(64) {
        let mut w = [0u32; 64];
        for i in 0..16 {
            w[i] = u32::from_be_bytes([chunk[4 * i], chunk[4 * i + 1], chunk[4 * i + 2], chunk[4 * i + 3]]);
        }
        for i in 16..64 {
            let s0 = w[i - 15].rotate_right(7) ^ w[i - 15].rotate_right(18) ^ (w[i - 15] >> 3);
            let s1 = w[i - 2].rotate_right(17) ^ w[i - 2].rotate_right(19) ^ (w[i - 2] >> 10);
            w[i] = w[i - 16]
                .wrapping_add(s0)
                .wrapping_add(w[i - 7])
                .wrapping_add(s1);
        }
        let (mut a, mut b, mut c, mut d, mut e, mut f, mut g, mut hh) =
            (h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7]);
        for i in 0..64 {
            let s1 = e.rotate_right(6) ^ e.rotate_right(11) ^ e.rotate_right(25);
            let ch = (e & f) ^ ((!e) & g);
            let t1 = hh
                .wrapping_add(s1)
                .wrapping_add(ch)
                .wrapping_add(SHA256_K[i])
                .wrapping_add(w[i]);
            let s0 = a.rotate_right(2) ^ a.rotate_right(13) ^ a.rotate_right(22);
            let maj = (a & b) ^ (a & c) ^ (b & c);
            let t2 = s0.wrapping_add(maj);
            hh = g;
            g = f;
            f = e;
            e = d.wrapping_add(t1);
            d = c;
            c = b;
            b = a;
            a = t1.wrapping_add(t2);
        }
        h[0] = h[0].wrapping_add(a);
        h[1] = h[1].wrapping_add(b);
        h[2] = h[2].wrapping_add(c);
        h[3] = h[3].wrapping_add(d);
        h[4] = h[4].wrapping_add(e);
        h[5] = h[5].wrapping_add(f);
        h[6] = h[6].wrapping_add(g);
        h[7] = h[7].wrapping_add(hh);
    }

    let mut out = [0u8; 32];
    for (i, v) in h.iter().enumerate() {
        out[4 * i..4 * i + 4].copy_from_slice(&v.to_be_bytes());
    }
    out
}

fn hmac_sha256(key: &[u8], msg: &[u8]) -> [u8; 32] {
    let mut k = [0u8; 64];
    if key.len() > 64 {
        let d = sha256(key);
        k[..32].copy_from_slice(&d);
    } else {
        k[..key.len()].copy_from_slice(key);
    }
    let mut inner = Vec::with_capacity(64 + msg.len());
    let mut outer = Vec::with_capacity(64 + 32);
    for b in k.iter() {
        inner.push(b ^ 0x36);
    }
    inner.extend_from_slice(msg);
    let inner_hash = sha256(&inner);
    for b in k.iter() {
        outer.push(b ^ 0x5c);
    }
    outer.extend_from_slice(&inner_hash);
    sha256(&outer)
}

fn to_hex(bytes: &[u8]) -> String {
    bytes.iter().map(|b| format!("{:02x}", b)).collect()
}

fn sign_payload(json: &str) -> String {
    to_hex(&hmac_sha256(&signing_key(), json.as_bytes()))
}

fn verify_payload(json: &str, sig: &str) -> bool {
    sign_payload(json) == sig
}

// ---------- Stored state ----------

#[derive(Serialize, Deserialize, Clone, Debug)]
struct StoredLicense {
    trial_started_at: i64,
    last_seen_at: i64,
    #[serde(default)]
    license_key: Option<String>,
    #[serde(default)]
    instance_id: Option<String>,
    #[serde(default)]
    instance_name: Option<String>,
    #[serde(default)]
    customer_email: Option<String>,
    #[serde(default)]
    last_validated_at: Option<i64>,
}

/// Public state exposed to the frontend.
#[derive(Serialize, Clone, Debug, Type)]
pub struct LicenseState {
    /// "trial" | "licensed" | "expired"
    pub status: String,
    pub trial_days: i64,
    pub days_remaining: i64,
    pub customer_email: Option<String>,
    pub masked_key: Option<String>,
}

fn now() -> i64 {
    chrono::Utc::now().timestamp()
}

fn state_path(app: &AppHandle) -> Option<PathBuf> {
    crate::portable::app_data_dir(app)
        .ok()
        .map(|d| d.join("license.dat"))
}

fn shadow_path(app: &AppHandle) -> Option<PathBuf> {
    // Redundant anchor under an inconspicuous name; earliest trial start wins.
    crate::portable::app_data_dir(app)
        .ok()
        .map(|d| d.join(".sync_cache"))
}

fn read_signed(path: &PathBuf) -> Option<StoredLicense> {
    let raw = fs::read_to_string(path).ok()?;
    let (sig, json) = raw.split_once('\n')?;
    if !verify_payload(json, sig.trim()) {
        log::warn!("License state file failed integrity check: {:?}", path);
        return None;
    }
    serde_json::from_str(json).ok()
}

fn write_signed(path: &PathBuf, state: &StoredLicense) {
    if let Ok(json) = serde_json::to_string(state) {
        let sig = sign_payload(&json);
        let _ = fs::write(path, format!("{}\n{}", sig, json));
    }
}

fn load(app: &AppHandle) -> StoredLicense {
    let primary = state_path(app).and_then(|p| read_signed(&p));
    let shadow = shadow_path(app).and_then(|p| read_signed(&p));

    let mut state = match (primary, shadow) {
        (Some(mut a), Some(b)) => {
            // Merge: the earliest trial start and latest activity win.
            if b.trial_started_at < a.trial_started_at {
                a.trial_started_at = b.trial_started_at;
            }
            if b.last_seen_at > a.last_seen_at {
                a.last_seen_at = b.last_seen_at;
            }
            if a.license_key.is_none() && b.license_key.is_some() {
                a.license_key = b.license_key;
                a.instance_id = b.instance_id;
                a.instance_name = b.instance_name;
                a.customer_email = b.customer_email;
                a.last_validated_at = b.last_validated_at;
            }
            a
        }
        (Some(a), None) => a,
        (None, Some(b)) => b,
        (None, None) => {
            let t = now();
            StoredLicense {
                trial_started_at: t,
                last_seen_at: t,
                license_key: None,
                instance_id: None,
                instance_name: None,
                customer_email: None,
                last_validated_at: None,
            }
        }
    };

    // Clock-rollback guard: never let time appear to move backwards.
    let t = now();
    if t > state.last_seen_at {
        state.last_seen_at = t;
    }
    state
}

fn save(app: &AppHandle, state: &StoredLicense) {
    if let Some(p) = state_path(app) {
        write_signed(&p, state);
    }
    if let Some(p) = shadow_path(app) {
        write_signed(&p, state);
    }
}

fn compute_status(state: &StoredLicense) -> (String, i64) {
    if state.license_key.is_some() {
        return ("licensed".to_string(), 0);
    }
    // Use the latest clock reading we have ever seen so a rolled-back
    // clock cannot extend the trial.
    let reference_now = state.last_seen_at.max(now());
    let elapsed_days = (reference_now - state.trial_started_at) / DAY_SECS;
    let remaining = TRIAL_DAYS - elapsed_days;
    if remaining > 0 {
        ("trial".to_string(), remaining)
    } else {
        ("expired".to_string(), 0)
    }
}

fn mask_key(key: &str) -> String {
    let k = key.trim();
    if k.len() > 8 {
        format!("{}…{}", &k[..4], &k[k.len() - 4..])
    } else {
        "…".to_string()
    }
}

pub fn get_state(app: &AppHandle) -> LicenseState {
    let state = load(app);
    let (status, days_remaining) = compute_status(&state);
    LicenseState {
        status,
        trial_days: TRIAL_DAYS,
        days_remaining,
        customer_email: state.customer_email.clone(),
        masked_key: state.license_key.as_deref().map(mask_key),
    }
}

/// Gate used by the transcription pipeline. Offline-safe and fast:
/// reads only the signed local state.
pub fn is_transcription_allowed(app: &AppHandle) -> bool {
    let state = load(app);
    let (status, _) = compute_status(&state);
    status != "expired"
}

/// Called when a transcription attempt is blocked: surface the app so the
/// user lands on the activation screen.
pub fn notify_license_blocked(app: &AppHandle) {
    crate::show_main_window_pub(app);
    let _ = app.emit("license-blocked", ());
}

/// App startup hook: persist state (starts the trial clock on first
/// launch) and kick off a best-effort revalidation for licensed users.
pub fn initialize(app: &AppHandle) {
    let state = load(app);
    save(app, &state);

    if state.license_key.is_some() {
        let stale = state
            .last_validated_at
            .map_or(true, |t| now() - t > REVALIDATE_AFTER_SECS);
        if stale {
            let app_handle = app.clone();
            tauri::async_runtime::spawn(async move {
                revalidate(&app_handle).await;
            });
        }
    }
}

fn instance_name_for(state: &StoredLicense) -> String {
    if let Some(n) = &state.instance_name {
        return n.clone();
    }
    // Stable per-install label shown in the payment provider dashboard.
    let seed = format!("{}:{}", state.trial_started_at, state.last_seen_at);
    let hash = to_hex(&sha256(seed.as_bytes()));
    format!("Mac {}", &hash[..6])
}

// ---------- Dodo Payments license API ----------

#[derive(Deserialize)]
struct DodoError {
    error: Option<String>,
}

#[derive(Deserialize)]
struct DodoActivateResponse {
    id: Option<String>,
    error: Option<String>,
    message: Option<String>,
}

#[derive(Deserialize)]
struct DodoValidateResponse {
    valid: Option<bool>,
    error: Option<String>,
    message: Option<String>,
}

fn dodo_client() -> reqwest::Client {
    reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(20))
        .build()
        .unwrap_or_else(|_| reqwest::Client::new())
}

async fn activate_remote(key: &str, instance_name: &str) -> Result<(String, Option<String>), String> {
    let resp = dodo_client()
        .post(format!("{}/activate", license_api_base()))
        .header("Accept", "application/json")
        .json(&serde_json::json!({ "license_key": key, "name": instance_name }))
        .send()
        .await
        .map_err(|e| format!("Could not reach the license server. Check your connection and try again. ({})", e))?;

    let status = resp.status();
    let body = resp.text().await.map_err(|e| e.to_string())?;

    if !status.is_success() {
        if let Ok(parsed) = serde_json::from_str::<DodoError>(&body) {
            if let Some(err) = parsed.error {
                return Err(err);
            }
        }
        return Err(format!("Activation failed (HTTP {}).", status.as_u16()));
    }

    let parsed: DodoActivateResponse =
        serde_json::from_str(&body).map_err(|_| "Unexpected response from the license server.".to_string())?;

    let instance_id = parsed
        .id
        .ok_or_else(|| parsed
            .error
            .or(parsed.message)
            .unwrap_or_else(|| "The license server did not return an activation instance.".to_string()))?;

    Ok((instance_id, None))
}

async fn validate_remote(key: &str, instance_id: &str) -> Result<bool, String> {
    let resp = dodo_client()
        .post(format!("{}/validate", license_api_base()))
        .header("Accept", "application/json")
        .json(&serde_json::json!({ "license_key": key, "license_key_instance_id": instance_id }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !resp.status().is_success() {
        return Err(format!("HTTP {}", resp.status().as_u16()));
    }

    let parsed: DodoValidateResponse = resp.json().await.map_err(|e| e.to_string())?;
    Ok(parsed.valid == Some(true))
}

async fn deactivate_remote(key: &str, instance_id: &str) -> Result<(), String> {
    let resp = dodo_client()
        .post(format!("{}/deactivate", license_api_base()))
        .header("Accept", "application/json")
        .json(&serde_json::json!({ "license_key": key, "license_key_instance_id": instance_id }))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !resp.status().is_success() {
        return Err(format!("HTTP {}", resp.status().as_u16()));
    }
    Ok(())
}

/// Best-effort background revalidation. A definitive "not valid"
/// (refunded, disabled, key deleted) flips the app back to the paywall;
/// any network or parse problem is ignored so a paid user is never
/// locked out by connectivity.
async fn revalidate(app: &AppHandle) {
    let state = load(app);
    let (Some(key), Some(instance_id)) = (state.license_key.clone(), state.instance_id.clone())
    else {
        return;
    };

    match validate_remote(&key, &instance_id).await {
        Ok(true) => {
            let mut state = load(app);
            state.last_validated_at = Some(now());
            save(app, &state);
            log::info!("License revalidated successfully");
        }
        Ok(false) => {
            log::warn!("License revalidation returned invalid; reverting to unlicensed state");
            let mut state = load(app);
            state.license_key = None;
            state.instance_id = None;
            state.customer_email = None;
            state.last_validated_at = None;
            save(app, &state);
            let _ = app.emit("license-blocked", ());
        }
        Err(e) => {
            log::info!("License revalidation skipped (offline or server issue): {}", e);
        }
    }
}

// ---------- Tauri commands ----------

#[tauri::command]
#[specta::specta]
pub fn get_license_state(app: AppHandle) -> Result<LicenseState, String> {
    Ok(get_state(&app))
}

#[tauri::command]
#[specta::specta]
pub async fn activate_license(app: AppHandle, license_key: String) -> Result<LicenseState, String> {
    let key = license_key.trim().to_string();
    if key.len() < 8 {
        return Err("That doesn't look like a complete license key.".to_string());
    }

    let mut state = load(&app);
    let instance_name = instance_name_for(&state);
    let (instance_id, email) = activate_remote(&key, &instance_name).await?;

    state.license_key = Some(key);
    state.instance_id = Some(instance_id);
    state.instance_name = Some(instance_name);
    state.customer_email = email;
    state.last_validated_at = Some(now());
    save(&app, &state);

    let _ = app.emit("license-activated", ());
    Ok(get_state(&app))
}

#[tauri::command]
#[specta::specta]
pub async fn deactivate_license(app: AppHandle) -> Result<LicenseState, String> {
    let mut state = load(&app);

    if let (Some(key), Some(instance_id)) = (state.license_key.clone(), state.instance_id.clone()) {
        // Best effort: free up the activation slot remotely, but always
        // deactivate locally even if the network call fails.
        if let Err(e) = deactivate_remote(&key, &instance_id).await {
            log::warn!("Remote deactivation failed (continuing locally): {}", e);
        }
    }

    state.license_key = None;
    state.instance_id = None;
    state.customer_email = None;
    state.last_validated_at = None;
    save(&app, &state);

    Ok(get_state(&app))
}

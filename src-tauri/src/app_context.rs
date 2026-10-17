//! Which app the user is dictating into.
//!
//! AI clean-up picks a per-app style from the frontmost application, and the
//! settings UI offers the running apps as candidates for a style rule. Only
//! the app's bundle identifier and display name are read: never window
//! titles, contents or screenshots.

use serde::Serialize;
use specta::Type;

/// A user-facing application, identified for style matching.
#[derive(Clone, Debug, PartialEq, Eq, Serialize, Type)]
pub struct AppInfo {
    /// macOS bundle identifier (`com.apple.mail`), when the app has one.
    pub bundle_id: Option<String>,
    /// Localized display name (`Mail`).
    pub name: String,
}

/// Hush's own bundle id, excluded from the running-app picker.
const OWN_BUNDLE_ID: &str = "com.hush.software";

/// The application that currently has focus (where a paste would land).
#[cfg(target_os = "macos")]
pub fn frontmost_app() -> Option<AppInfo> {
    use objc2_app_kit::NSWorkspace;

    let workspace = NSWorkspace::sharedWorkspace();
    let app = workspace.frontmostApplication()?;
    Some(AppInfo {
        bundle_id: app.bundleIdentifier().map(|id| id.to_string()),
        name: app
            .localizedName()
            .map(|name| name.to_string())
            .unwrap_or_default(),
    })
}

#[cfg(not(target_os = "macos"))]
pub fn frontmost_app() -> Option<AppInfo> {
    None
}

/// Regular (Dock-visible) running apps, sorted by name, without Hush itself.
#[cfg(target_os = "macos")]
pub fn running_apps() -> Vec<AppInfo> {
    use objc2_app_kit::{NSApplicationActivationPolicy, NSWorkspace};

    let workspace = NSWorkspace::sharedWorkspace();
    let mut apps: Vec<AppInfo> = workspace
        .runningApplications()
        .iter()
        .filter(|app| app.activationPolicy() == NSApplicationActivationPolicy::Regular)
        .filter_map(|app| {
            let name = app.localizedName()?.to_string();
            let bundle_id = app.bundleIdentifier().map(|id| id.to_string());
            if bundle_id.as_deref() == Some(OWN_BUNDLE_ID) {
                return None;
            }
            Some(AppInfo { bundle_id, name })
        })
        .collect();
    apps.sort_by_key(|app| app.name.to_lowercase());
    apps.dedup_by(|a, b| a.bundle_id == b.bundle_id && a.name == b.name);
    apps
}

#[cfg(not(target_os = "macos"))]
pub fn running_apps() -> Vec<AppInfo> {
    let _ = OWN_BUNDLE_ID;
    Vec::new()
}

/// Lists the running apps for the per-app style picker.
#[tauri::command]
#[specta::specta]
pub fn list_running_apps() -> Vec<AppInfo> {
    running_apps()
}

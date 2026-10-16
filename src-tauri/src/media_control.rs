//! Pausing or lowering other audio while the user dictates.
//!
//! "Pause" asks the system's now-playing app (Music, Spotify, a browser tab,
//! ...) to pause, but only when something is actually playing, and asks it to
//! play again once the recording ends, but only if we were the ones who paused
//! it and it is still paused. "Lower volume" turns the system output volume
//! down for the recording and puts it back afterwards.
//!
//! On macOS 15.4+ the private MediaRemote framework only answers processes
//! signed by Apple, so asking it from inside Hush reports nothing as playing.
//! We run the query through `osascript` (JavaScript for Automation), which is
//! an Apple-signed binary and is still allowed to read the now-playing state
//! and send it commands. This is the same idea as the `/usr/bin/perl` trick
//! used by the mediaremote-adapter project, without shipping a helper
//! framework, and it needs no new permission (no Apple Events to other apps).
//!
//! All work happens on one background thread, in order, so a quick
//! stop-then-start can never resume after the next recording has paused, and
//! the slow `osascript` calls never delay the start or stop of a recording.

use crate::settings::MediaWhileRecording;
use log::debug;
use std::sync::mpsc::{self, Sender};
use std::sync::{Mutex, OnceLock};
use std::time::Duration;

/// The fraction of the previous output volume used while recording in
/// "Lower volume" mode.
const DUCKED_VOLUME_PERCENT: u32 = 25;

/// How far the volume may drift from what we set and still count as
/// "untouched" when restoring. macOS stores volume in coarser steps than the
/// 0-100 scale AppleScript reports, so reading back what we set can differ
/// by a point or two.
const VOLUME_RESTORE_TOLERANCE: u8 = 3;

/// The system output volume we should use while recording, given the volume
/// before recording. `None` means leave the volume alone (already silent, or
/// so quiet that lowering it would not change anything).
pub fn ducked_volume(previous: u8) -> Option<u8> {
    let previous = previous.min(100);
    let ducked = ((previous as u32 * DUCKED_VOLUME_PERCENT + 50) / 100) as u8;
    (ducked < previous).then_some(ducked)
}

/// Whether to put the volume back after recording. If the user changed the
/// volume themselves during the recording, we keep their choice. An unknown
/// current volume restores, so we never leave the system quieter than we found
/// it.
pub fn should_restore_volume(set_by_us: u8, current: Option<u8>) -> bool {
    match current {
        Some(current) => current.abs_diff(set_by_us) <= VOLUME_RESTORE_TOLERANCE,
        None => true,
    }
}

/// Parses AppleScript's `output volume of (get volume settings)`. It prints
/// `missing value` for outputs without a volume control (some HDMI and USB
/// devices).
pub fn parse_volume(output: &str) -> Option<u8> {
    output
        .trim()
        .parse::<u32>()
        .ok()
        .map(|volume| volume.min(100) as u8)
}

/// The platform side of media control, behind a trait so the session logic
/// can be tested without touching real audio.
pub trait MediaBackend {
    /// Pauses the now-playing app if, and only if, it is playing. Returns
    /// whether it paused something.
    fn pause_if_playing(&mut self) -> bool;
    /// Starts the now-playing app again if it is still paused.
    fn resume_if_paused(&mut self);
    fn output_volume(&mut self) -> Option<u8>;
    fn set_output_volume(&mut self, volume: u8);
}

/// What we changed for the current recording, so `end` undoes exactly that.
#[derive(Debug, Default, PartialEq, Eq)]
pub struct MediaSession {
    paused: bool,
    /// (volume before recording, volume we set)
    lowered: Option<(u8, u8)>,
}

impl MediaSession {
    pub fn begin(&mut self, mode: MediaWhileRecording, backend: &mut dyn MediaBackend) {
        // A late or duplicate begin must not snapshot our own changes (a
        // paused player, a lowered volume) as the user's state.
        if self.is_active() {
            return;
        }
        match mode {
            MediaWhileRecording::Pause => {
                self.paused = backend.pause_if_playing();
                debug!("Media pause requested (paused={})", self.paused);
            }
            MediaWhileRecording::LowerVolume => {
                if let Some(previous) = backend.output_volume() {
                    if let Some(ducked) = ducked_volume(previous) {
                        backend.set_output_volume(ducked);
                        self.lowered = Some((previous, ducked));
                        debug!("Output volume lowered from {previous} to {ducked}");
                    }
                }
            }
            // Mute is handled by the audio manager, which also owns the
            // microphone stream it is tied to.
            MediaWhileRecording::Mute | MediaWhileRecording::Off => {}
        }
    }

    pub fn end(&mut self, backend: &mut dyn MediaBackend) {
        if std::mem::take(&mut self.paused) {
            backend.resume_if_paused();
            debug!("Media resume requested");
        }
        if let Some((previous, ducked)) = self.lowered.take() {
            if should_restore_volume(ducked, backend.output_volume()) {
                backend.set_output_volume(previous);
                debug!("Output volume restored to {previous}");
            } else {
                debug!("Output volume changed during recording; leaving it");
            }
        }
    }

    pub fn is_active(&self) -> bool {
        self.paused || self.lowered.is_some()
    }
}

#[cfg(target_os = "macos")]
mod macos {
    use super::{parse_volume, MediaBackend};
    use std::process::Command;

    /// Asks MediaRemote, through Apple-signed `osascript`, to pause or play
    /// the now-playing app. Prints "paused"/"resumed" when it sent a command,
    /// "skipped" when the player was already in the wanted state, and
    /// "unsupported" when this macOS lacks the APIs.
    ///
    /// MRMediaRemoteSendCommand commands: 0 = play, 1 = pause.
    const NOW_PLAYING_SCRIPT: &str = r#"
function run(argv) {
  ObjC.import('Foundation');
  const bundle = $.NSBundle.bundleWithPath('/System/Library/PrivateFrameworks/MediaRemote.framework/');
  if (!bundle || bundle.isNil() || !bundle.load) return 'unsupported';
  const Request = $.NSClassFromString('MRNowPlayingRequest');
  if (!Request || Request.isNil()) return 'unsupported';
  ObjC.bindFunction('MRMediaRemoteSendCommand', ['bool', ['unsigned int', 'id']]);
  const playing = Request.localIsPlaying;
  if (argv[0] === 'pause') {
    if (!playing) return 'skipped';
    $.MRMediaRemoteSendCommand(1, $());
    return 'paused';
  }
  if (playing) return 'skipped';
  $.MRMediaRemoteSendCommand(0, $());
  return 'resumed';
}
"#;

    fn run_now_playing(action: &str) -> Option<String> {
        let output = Command::new("osascript")
            .args(["-l", "JavaScript", "-e", NOW_PLAYING_SCRIPT, action])
            .output()
            .ok()?;
        if !output.status.success() {
            return None;
        }
        Some(String::from_utf8_lossy(&output.stdout).trim().to_string())
    }

    pub struct MacBackend;

    impl MediaBackend for MacBackend {
        fn pause_if_playing(&mut self) -> bool {
            let result = run_now_playing("pause");
            log::debug!("Now-playing pause: {result:?}");
            result.as_deref() == Some("paused")
        }

        fn resume_if_paused(&mut self) {
            let result = run_now_playing("resume");
            log::debug!("Now-playing resume: {result:?}");
        }

        fn output_volume(&mut self) -> Option<u8> {
            let output = Command::new("osascript")
                .args(["-e", "output volume of (get volume settings)"])
                .output()
                .ok()?;
            if !output.status.success() {
                return None;
            }
            parse_volume(&String::from_utf8_lossy(&output.stdout))
        }

        fn set_output_volume(&mut self, volume: u8) {
            let script = format!("set volume output volume {}", volume.min(100));
            let _ = Command::new("osascript").args(["-e", &script]).output();
        }
    }
}

/// Pause and lower volume are macOS-only for now; elsewhere they do nothing.
#[cfg(not(target_os = "macos"))]
struct NoopBackend;

#[cfg(not(target_os = "macos"))]
impl MediaBackend for NoopBackend {
    fn pause_if_playing(&mut self) -> bool {
        false
    }
    fn resume_if_paused(&mut self) {}
    fn output_volume(&mut self) -> Option<u8> {
        None
    }
    fn set_output_volume(&mut self, _volume: u8) {}
}

enum Request {
    Begin(MediaWhileRecording),
    End(Option<Sender<()>>),
}

fn worker() -> &'static Mutex<Sender<Request>> {
    static WORKER: OnceLock<Mutex<Sender<Request>>> = OnceLock::new();
    WORKER.get_or_init(|| {
        let (tx, rx) = mpsc::channel::<Request>();
        std::thread::Builder::new()
            .name("media-control".into())
            .spawn(move || {
                #[cfg(target_os = "macos")]
                let mut backend = macos::MacBackend;
                #[cfg(not(target_os = "macos"))]
                let mut backend = NoopBackend;
                let mut session = MediaSession::default();
                for request in rx {
                    match request {
                        Request::Begin(mode) => session.begin(mode, &mut backend),
                        Request::End(done) => {
                            session.end(&mut backend);
                            if let Some(done) = done {
                                let _ = done.send(());
                            }
                        }
                    }
                }
            })
            .expect("spawn media-control thread");
        Mutex::new(tx)
    })
}

fn send(request: Request) {
    let sender = worker().lock().unwrap_or_else(|e| e.into_inner());
    let _ = sender.send(request);
}

/// Pauses media or lowers the volume for a recording that just became ready.
/// Returns immediately; the work happens in order on a background thread.
pub fn begin(mode: MediaWhileRecording) {
    if matches!(
        mode,
        MediaWhileRecording::Pause | MediaWhileRecording::LowerVolume
    ) {
        send(Request::Begin(mode));
    }
}

/// Undoes whatever `begin` changed. Safe to call any number of times, and
/// whatever the setting is now (it undoes what was actually done).
pub fn end() {
    send(Request::End(None));
}

/// Like `end`, but waits (briefly) for the restore to finish. Used on quit,
/// so music paused or volume lowered by Hush is never left that way.
pub fn end_blocking(timeout: Duration) {
    let (done_tx, done_rx) = mpsc::channel();
    send(Request::End(Some(done_tx)));
    let _ = done_rx.recv_timeout(timeout);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[derive(Default)]
    struct FakeBackend {
        playing: bool,
        volume: Option<u8>,
        pauses: u32,
        resumes: u32,
        /// Simulates the user changing the volume mid-recording.
        user_volume_change: Option<u8>,
    }

    impl MediaBackend for FakeBackend {
        fn pause_if_playing(&mut self) -> bool {
            if self.playing {
                self.playing = false;
                self.pauses += 1;
                true
            } else {
                false
            }
        }
        fn resume_if_paused(&mut self) {
            if !self.playing {
                self.playing = true;
                self.resumes += 1;
            }
        }
        fn output_volume(&mut self) -> Option<u8> {
            if let Some(changed) = self.user_volume_change.take() {
                self.volume = Some(changed);
            }
            self.volume
        }
        fn set_output_volume(&mut self, volume: u8) {
            self.volume = Some(volume);
        }
    }

    #[test]
    fn pause_resumes_only_what_it_paused() {
        let mut backend = FakeBackend {
            playing: true,
            ..Default::default()
        };
        let mut session = MediaSession::default();
        session.begin(MediaWhileRecording::Pause, &mut backend);
        assert!(!backend.playing);
        session.end(&mut backend);
        assert!(backend.playing);
        assert_eq!((backend.pauses, backend.resumes), (1, 1));
    }

    #[test]
    fn pause_does_not_start_media_that_was_not_playing() {
        let mut backend = FakeBackend::default();
        let mut session = MediaSession::default();
        session.begin(MediaWhileRecording::Pause, &mut backend);
        session.end(&mut backend);
        assert!(!backend.playing);
        assert_eq!(backend.resumes, 0);
    }

    #[test]
    fn duplicate_begin_and_end_are_harmless() {
        let mut backend = FakeBackend {
            playing: true,
            ..Default::default()
        };
        let mut session = MediaSession::default();
        session.begin(MediaWhileRecording::Pause, &mut backend);
        // A late second begin sees nothing playing (we paused it) and must not
        // forget that we owe a resume.
        session.begin(MediaWhileRecording::Pause, &mut backend);
        session.end(&mut backend);
        session.end(&mut backend);
        assert_eq!((backend.pauses, backend.resumes), (1, 1));
        assert!(!session.is_active());
    }

    #[test]
    fn lower_volume_restores_previous_volume() {
        let mut backend = FakeBackend {
            volume: Some(80),
            ..Default::default()
        };
        let mut session = MediaSession::default();
        session.begin(MediaWhileRecording::LowerVolume, &mut backend);
        assert_eq!(backend.volume, Some(20));
        session.end(&mut backend);
        assert_eq!(backend.volume, Some(80));
    }

    #[test]
    fn lower_volume_keeps_a_volume_the_user_changed() {
        let mut backend = FakeBackend {
            volume: Some(80),
            ..Default::default()
        };
        let mut session = MediaSession::default();
        session.begin(MediaWhileRecording::LowerVolume, &mut backend);
        backend.user_volume_change = Some(60);
        session.end(&mut backend);
        assert_eq!(backend.volume, Some(60));
    }

    #[test]
    fn lower_volume_skips_unknown_or_silent_output() {
        let mut backend = FakeBackend::default();
        let mut session = MediaSession::default();
        session.begin(MediaWhileRecording::LowerVolume, &mut backend);
        assert!(!session.is_active());

        backend.volume = Some(0);
        session.begin(MediaWhileRecording::LowerVolume, &mut backend);
        assert!(!session.is_active());
        assert_eq!(backend.volume, Some(0));
    }

    #[test]
    fn off_and_mute_leave_media_alone() {
        let mut backend = FakeBackend {
            playing: true,
            volume: Some(50),
            ..Default::default()
        };
        let mut session = MediaSession::default();
        for mode in [MediaWhileRecording::Off, MediaWhileRecording::Mute] {
            session.begin(mode, &mut backend);
            session.end(&mut backend);
        }
        assert!(backend.playing);
        assert_eq!(backend.volume, Some(50));
        assert_eq!(backend.pauses, 0);
    }

    #[test]
    fn ducked_volume_values() {
        assert_eq!(ducked_volume(100), Some(25));
        assert_eq!(ducked_volume(50), Some(13));
        assert_eq!(ducked_volume(4), Some(1));
        assert_eq!(ducked_volume(1), Some(0));
        assert_eq!(ducked_volume(0), None);
        assert_eq!(ducked_volume(200), Some(25));
    }

    #[test]
    fn restore_tolerates_volume_step_rounding() {
        assert!(should_restore_volume(25, Some(25)));
        assert!(should_restore_volume(25, Some(27)));
        assert!(should_restore_volume(25, Some(22)));
        assert!(!should_restore_volume(25, Some(40)));
        assert!(!should_restore_volume(25, Some(0)));
        assert!(should_restore_volume(25, None));
    }

    #[test]
    fn parses_applescript_volume() {
        assert_eq!(parse_volume("56\n"), Some(56));
        assert_eq!(parse_volume(" 100 "), Some(100));
        assert_eq!(parse_volume("missing value"), None);
        assert_eq!(parse_volume(""), None);
    }
}

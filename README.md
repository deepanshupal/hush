# Hush

Hush is a local voice-to-text app for macOS. Hold a shortcut (Fn by default), speak, release, and the transcribed text is pasted wherever your cursor is. Speech recognition runs on-device; audio never leaves your Mac unless you opt in to an AI clean-up step with your own API key.

- Website: https://hush.software
- Contact: hi@hush.software
- Current version: 0.8.0 (Apple Silicon DMG)

## Who it's for

People who write a lot on a Mac (email, chat, notes, code comments, terminal) and want dictation that works in any app, keeps audio local, and doesn't need a subscription. Hush is sold as a one-time lifetime license after a 14-day free trial.

## Features

- **Push-to-talk or toggle dictation** with a global shortcut. On macOS the default is the Fn key; a second shortcut runs dictation with post-processing.
- **On-device transcription** with a choice of downloadable models: Whisper (Small, Medium, Turbo, Large), Breeze ASR, Parakeet V2/V3, Moonshine (Base and V2 Tiny/Small/Medium streaming, English), SenseVoice and GigaAM v3.
- **Voice Snippets**: define a trigger phrase and its expansion. When a transcription matches a trigger, the expansion is pasted instead.
- **AI Polish** (optional, bring your own Groq API key): cleans up grammar, punctuation and filler words using `llama-3.3-70b-versatile` on Groq, with a short timeout so dictation never stalls.
- **Per-app tone**: choose Default, Casual, Professional, Developer or Raw (no AI Polish) for specific apps (e.g. Slack, Gmail in Chrome, Notes, Terminal). The frontmost app decides which tone is used.
- **Post-processing prompts** with OpenAI, Z.AI, OpenRouter, Anthropic, Groq, Cerebras, a custom OpenAI-compatible endpoint, or Apple Intelligence on supported Macs.
- **Transcription history** stored locally in SQLite, with optional saved recordings and configurable retention (never, by count limit, 3 days, 2 weeks, 3 months).
- **Custom words** to bias recognition toward names and jargon, plus translate-to-English.
- **Output options**: paste via clipboard (Cmd+V and variants), direct typing, or an external script; optional trailing space and auto-submit; choose whether the transcript is also left on the clipboard.
- **Recording overlay**, menu-bar tray icon with state indicators, start/stop sounds, mute-while-recording, microphone and output device selection, launch at login.
- **CLI flags** for scripting a running instance: `--toggle-transcription`, `--toggle-post-process`, `--cancel`, `--start-hidden`, `--no-tray`, `--debug`.
- **UI in 17 languages** (i18next).
- **14-day trial, then lifetime license** activated through Dodo Payments. Buy link: https://hush.software/license.

## How it works

```
Global shortcut ─► Audio capture (cpal) ─► Silero VAD ─► transcribe-rs model
      │                                                    │
      │                                     Snippet match? ─┤
      │                                                    ▼
      │                         AI Polish / post-processing (optional, network)
      │                                                    │
      └──────────────── overlay + tray state ◄──── paste into frontmost app
                                                           │
                                                 history.db (SQLite) + WAV
```

1. A global shortcut (Tauri global-shortcut or the low-level `handy-keys` listener, selectable in Debug settings) starts recording.
2. Audio is captured from the selected microphone, resampled, and filtered with the bundled Silero VAD model (`src-tauri/resources/models/silero_vad_v4.onnx`).
3. The selected speech model (via the `transcribe-rs` crate: Whisper, Parakeet, Moonshine, SenseVoice, GigaAM) transcribes the audio locally. Models are downloaded on first use from the `DeepanshuPal/hush-downloads` GitHub release mirror (`models-v1`).
4. The text is checked against Voice Snippets, then optionally sent to Groq (AI Polish) or a configured LLM provider for post-processing, using the tone set for the frontmost app.
5. The result is pasted into the active app and saved to local history.

### License model

`src-tauri/src/license.rs` implements a 14-day trial starting at first launch and a lifetime license validated against the Dodo Payments license API (`HUSH_LICENSE_API_BASE` overrides the endpoint). License state is cached locally, HMAC-signed and written to two files; it is revalidated online roughly weekly, and network failures never lock out a licensed user. The paywall (`src/components/Paywall.tsx`) blocks the UI once the trial ends.

## Tech stack

- **Shell**: Tauri 2 (Rust backend, system WebView), macOS private APIs for the overlay panel (`tauri-nspanel`)
- **Backend**: Rust; `transcribe-rs`, `cpal`/`rodio` audio, `vad-rs` (Silero), `rusqlite` + migrations, `reqwest`, `enigo` input, `tauri-specta` for typed bindings
- **Apple Intelligence bridge**: Swift (`src-tauri/swift/`), compiled by `build.rs` on macOS
- **Frontend**: React 18, TypeScript, Vite 6, Tailwind CSS 4, Zustand, i18next, Sonner
- **Tooling**: Bun, ESLint (with `i18next/no-literal-string`), Prettier, Playwright smoke test

## Repository layout

```
src/                     React frontend (settings window, onboarding, paywall)
  components/settings/   One component per setting / settings page
  overlay/               Recording overlay window
  i18n/locales/          Translations (en is the source)
  stores/                Zustand stores (settings, models, license)
  bindings.ts            Generated by tauri-specta; do not edit
src-tauri/
  src/
    lib.rs               App setup, managers, tray, commands
    actions.rs           Transcribe → snippet → AI Polish → paste pipeline
    license.rs           Trial and license gate
    managers/            audio, model, transcription, history, snippets
    audio_toolkit/       Recording, resampling, VAD
    shortcut/            Global shortcut backends
    llm_client.rs        OpenAI-compatible client for post-processing
  resources/             Tray icons, sounds, VAD model, default settings
  swift/                 Apple Intelligence bridge
.github/workflows/       release.yml (DMG build and publish)
```

## Running locally

Prerequisites: macOS with Xcode Command Line Tools, [Rust](https://rustup.rs/) (stable), [Bun](https://bun.sh/), and `cmake` (for the Whisper build).

```bash
bun install
bun run tauri dev
# If CMake complains about the policy version:
CMAKE_POLICY_VERSION_MINIMUM=3.5 bun run tauri dev
```

Hush needs Microphone and Accessibility permissions (Accessibility is used to paste into other apps); onboarding walks through both.

Other useful commands:

```bash
bun run dev                  # frontend only (Vite on :1420)
bun run build                # typecheck + build frontend
bun run lint                 # ESLint
bun run format               # Prettier + cargo fmt
bun run check:translations   # compare locales against en
bun run test:playwright      # smoke test against the dev server
bun run tauri build          # production bundle
```

Debug settings are hidden behind `Cmd+Shift+D`.

The Rust code still compiles for Windows and Linux (NSIS template, Linux bundle config), but releases and testing target macOS on Apple Silicon.

## Releases

Releases are built by `.github/workflows/release.yml`, which runs on a pushed tag matching `release-v*` or a manual dispatch (pushes to `main` do not trigger it). It:

1. reads the version from `src-tauri/tauri.conf.json`,
2. builds an aarch64 DMG on `macos-latest` (ad-hoc signed, `signingIdentity: "-"`),
3. publishes it to a `v<version>` release in the `DeepanshuPal/hush-downloads` repository using the `DOWNLOADS_RELEASE_TOKEN` secret.

To cut a release, bump the version in `package.json`, `src-tauri/Cargo.toml` and `src-tauri/tauri.conf.json`, then push a `release-v<version>` tag.

There is no in-app auto-updater: the updater plugin is removed and new versions are installed by downloading the latest DMG from hush.software.

## Status

Actively developed commercial product. Version 0.8.0 is the current release (macOS, Apple Silicon). The repository is private and does not accept external contributions; see `CONTRIBUTING.md`.

## License

See [LICENSE](LICENSE).

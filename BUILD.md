# Building Hush from source

Hush ships for macOS (Apple Silicon first). The Windows and Linux code paths
from the upstream codebase still compile, but they are not built, tested or
supported by this project.

## Prerequisites

- macOS 13 or later with Xcode Command Line Tools: `xcode-select --install`
- [Rust](https://rustup.rs/) (latest stable)
- [Bun](https://bun.sh/)
- [CMake](https://cmake.org/) (`brew install cmake`), used to build the
  transcribe.cpp / ggml speech engine

## Build

```bash
git clone https://github.com/DeepanshuPal/hush.git
cd hush
bun install

# Development (hot-reloading frontend, debug Rust build)
CMAKE_POLICY_VERSION_MINIMUM=3.5 bun run tauri dev

# Release DMG for Apple Silicon (ad-hoc signed)
CMAKE_POLICY_VERSION_MINIMUM=3.5 bun run tauri build --target aarch64-apple-darwin --bundles dmg
```

The DMG lands in `src-tauri/target/aarch64-apple-darwin/release/bundle/dmg/`.

`CMAKE_POLICY_VERSION_MINIMUM=3.5` keeps newer CMake releases from rejecting
the bundled native libraries' CMake files.

The Silero VAD model (`src-tauri/resources/models/silero-vad-v6.2-F32.gguf`) is
checked in. Speech models are downloaded by the app at runtime.

## Regenerating TypeScript bindings

`src/bindings.ts` is generated from the Rust commands by tauri-specta. A debug
run (`bun run tauri dev`) rewrites it, or without launching the app:

```bash
cd src-tauri && cargo test --lib export_bindings -- --ignored
```

## Releasing

Release builds are published to
[`DeepanshuPal/downloads`](https://github.com/DeepanshuPal/downloads), the one
public downloads repository for all of Deepanshu's apps (Hush, Doja, Clippy).
The tag prefix says which app a release belongs to:

| What | Tag | Example |
| --- | --- | --- |
| Hush app | `hush-vX.Y.Z` | `hush-v1.2.0` |
| Speech-model mirror the app downloads from | `hush-models-vN` | `hush-models-v1` |

1. Bump the version in `src-tauri/tauri.conf.json` and add a `## X.Y.Z (date)`
   section to `CHANGELOG.md`. That section becomes the release notes, which
   hush.software shows on `/changelog`.
2. Push a `release-vX.Y.Z` tag (or run the Release workflow from the Actions
   tab). It builds the DMG and publishes it as `hush-vX.Y.Z` without marking
   it "latest" (`make_latest: false`). The repository holds several apps, so
   nothing may read its "latest" release; hush.software picks the highest
   `hush-v*` version within the hour.
3. Add the version, its SHA-256 (shown on the release page, or
   `shasum -a 256 Hush_X.Y.Z_aarch64.dmg`) and the direct link to the Hush
   table in the downloads repository's README.

To publish by hand instead:
`gh release create hush-vX.Y.Z Hush_X.Y.Z_aarch64.dmg -R DeepanshuPal/downloads --title "Hush vX.Y.Z" --notes-file notes.md --latest=false`

Model files are never replaced in place: the app pins each file's SHA-256. To
change a model, upload it under a new name or to a new `hush-models-vN`
release, and point `src-tauri/src/managers/model.rs` at it. Hush 1.1.0 and
older download from `DeepanshuPal/hush-downloads` (`models-v1`), which is
archived and must never be deleted.

The workflow's `DOWNLOADS_RELEASE_TOKEN` secret needs Contents read and write
access to `DeepanshuPal/downloads`.

## Troubleshooting

### Accessibility stays "enabled" but Hush waits for permission after a rebuild

Local and release builds are ad-hoc signed, so every new build has a new code
identity, and macOS no longer matches the old Accessibility grant even though
the switch still looks on. Quit Hush, clear only its Accessibility record and
reopen it:

```bash
osascript -e 'tell application id "com.hush.software" to quit' || true
tccutil reset Accessibility com.hush.software
open /Applications/Hush.app
```

Grant Accessibility again when asked. Microphone and other permissions are not
affected.

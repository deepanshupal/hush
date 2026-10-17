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

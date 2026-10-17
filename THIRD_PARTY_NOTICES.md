# Third-party notices

Hush's own source code is released under the MIT license (see [LICENSE](LICENSE)).
Hush also bundles, or downloads at your request, the third-party assets listed
below. Each remains under its own license. Rust crates and npm packages are
listed with their licenses in `src-tauri/Cargo.lock` / `bun.lock` and in each
package's own metadata.

## Bundled with the app

| Asset                                                            | Where                                                 | Licence                                                         |
| ---------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| **Inter** typeface (Rasmus Andersson)                            | UI text, via `@fontsource-variable/inter`             | SIL Open Font License 1.1                                       |
| **DM Serif Display** typeface (Colophon Foundry, DeepMind)       | display headings, via `@fontsource/dm-serif-display`  | SIL Open Font License 1.1                                       |
| **Silero VAD v6.2** (Silero Team), GGUF conversion               | `src-tauri/resources/models/silero-vad-v6.2-F32.gguf` | MIT                                                             |
| **transcribe.cpp** / **ggml** (Georgi Gerganov and contributors) | speech-recognition runtime, linked into the app       | MIT                                                             |
| **Lucide** icons                                                 | UI icons, via `lucide-react`                          | ISC                                                             |
| Feedback sounds (`marimba_*`, `pop_*`)                           | `src-tauri/resources/`                                | MIT, as part of the upstream project this codebase derives from |

The SIL Open Font License 1.1 text is available at <https://openfontlicense.org>.

## Speech models (downloaded only when you choose them)

Models are fetched from Hugging Face (`huggingface.co`) and, for two legacy
Whisper files, from the Hush downloads mirror on GitHub. They are not part of
the app bundle and are used under their authors' licenses:

| Models                                                                                                  | Author                  | Licence                                           | Notes                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parakeet (TDT/CTC/RNNT, Unified EN), Canary 180M Flash, Canary 1B Flash, Canary 1B v2, Canary-Qwen 2.5B | NVIDIA                  | CC-BY-4.0                                         | **Attribution:** these models are © NVIDIA, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Hush converts them to GGUF for local inference; no other changes to the weights. |
| Parakeet Primeline                                                                                      | primeline               | CC-BY-4.0                                         | Attribution as above.                                                                                                                                                                                   |
| Canary 1B                                                                                               | NVIDIA                  | CC-BY-NC-4.0                                      | Non-commercial use only.                                                                                                                                                                                |
| Nemotron streaming ASR, Multitalker Parakeet streaming                                                  | NVIDIA                  | NVIDIA Open Model License                         | See the model card.                                                                                                                                                                                     |
| Whisper (tiny … large-v3, turbo)                                                                        | OpenAI                  | MIT (code) / Apache-2.0 (weights, per model card) | Legacy `.bin` files come from [`ggerganov/whisper.cpp`](https://huggingface.co/ggerganov/whisper.cpp) (MIT).                                                                                            |
| Breeze ASR 25                                                                                           | MediaTek Research       | Apache-2.0                                        |                                                                                                                                                                                                         |
| Moonshine (tiny/base/streaming, multilingual variants)                                                  | Useful Sensors          | MIT (per model card)                              | Some language variants use the Moonshine Community License; check the card.                                                                                                                             |
| GigaAM v3                                                                                               | SaluteDevices / ai-sage | MIT                                               |                                                                                                                                                                                                         |
| SenseVoice Small, Fun-ASR                                                                               | FunAudioLLM (Alibaba)   | Model license on the card ("other")               |                                                                                                                                                                                                         |
| Qwen3-ASR                                                                                               | Alibaba Qwen            | Apache-2.0                                        |                                                                                                                                                                                                         |
| Voxtral                                                                                                 | Mistral AI              | Apache-2.0                                        |                                                                                                                                                                                                         |
| Granite Speech                                                                                          | IBM                     | Apache-2.0                                        |                                                                                                                                                                                                         |
| Cohere Transcribe                                                                                       | Cohere Labs             | Apache-2.0                                        |                                                                                                                                                                                                         |
| MedASR                                                                                                  | Google                  | Health AI Developer Foundations terms             |                                                                                                                                                                                                         |
| MOSS Transcribe Diarize                                                                                 | OpenMOSS                | Apache-2.0                                        |                                                                                                                                                                                                         |

The GGUF conversions are hosted in the public `handy-computer` organization on
Hugging Face. Each repository's model card states the original source and
license; that card is authoritative if it differs from this summary.

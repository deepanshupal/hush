# Changelog

All notable changes to Hush. Downloads are on [GitHub](https://github.com/DeepanshuPal/downloads#hush) and [hush.software](https://www.hush.software/download). What's coming next: [roadmap](https://www.hush.software/roadmap).

## 1.1.0 (2026-10-16)

Faster to control, quieter while you talk, and simpler to set up.

- **Double-tap for hands-free.** Double-tap your shortcut to keep recording without holding the key, even in Hold mode. Tap again to finish.
- **Paste last transcript.** Ctrl+Cmd+V (or your own shortcut) pastes your most recent dictation again. Also in the menu bar, with "Copy last transcript".
- **Your music pauses while you dictate**, and resumes when you're done, only if Hush paused it. Or choose Lower volume, Mute all sound or Do nothing.
- **Simpler settings.** Everyday options first; power-user controls in collapsed Advanced groups; extra AI providers behind "More providers".
- **Clearer model choice.** Fast (Parakeet V3, recommended), Live preview (Nemotron Streaming) and Most accurate (Granite Speech 4.1, for Macs with 16 GB or more).
- **Polish everywhere.** Every screen uses the same design system as hush.software, in light and dark mode.

Upgrading: install over 1.0. The first launch spends up to a minute preparing the speech engine for your Mac's GPU, once. "Mute while recording" becomes "Mute all sound".

## 1.0.0 (2026-10-16)

Hush is free and open source under the MIT license. No trial, no license key, no account.

- **Faster speech recognition** on the GPU with Metal, about twice as fast as 0.8 on an M1. The model warms up at launch.
- **Hold or tap** Fn to talk; **live preview** of your words as you speak.
- **AI clean-up, rebuilt:** one system with a provider (Groq, OpenAI, Anthropic, OpenRouter, Cerebras, a custom endpoint or Apple Intelligence) and a level. Falls back to your raw text after 4 seconds.
- **Per-app styles:** Default, Message, Email, Code or Raw.
- **Voice snippets** that match regardless of capitals and punctuation, inside a sentence.
- **Filler-word removal without AI**, in many languages.
- **More models**, every download verified against a checksum.
- **More reliable** pasting, microphone-disconnect recovery, a Secure Input warning, and recordings kept when transcription fails.
- **New look:** a cream and burgundy design system with a proper dark mode.

# Launch and directory checklist

A short plan for getting Hush 1.1 in front of people, following the launch and directory-submissions skills. Nothing here has been submitted. Each submission needs the owner's go-ahead, an account and a final read of the blurb.

## Readiness

| Check | Status |
| --- | --- |
| Product public, no password wall | Yes |
| Pricing page | The product is free; `/download`, the FAQ and `llms.txt` say so. Directories that insist on a pricing URL can use `/faq#basics` |
| Privacy policy and terms | Yes: `/privacy`, `/terms` |
| Single H1, clean headings, FAQ and app structured data | Yes |
| Destination pages for "X alternative" traffic | Yes: `/alternatives/wispr-flow`, `/superwhisper`, `/voiceink` (live once this branch deploys) |
| Logo: PNG, SVG, 1024×1024 square | Partly: `public/icons/icon-512.png`, wordmark PNG. **To do:** export a 1024×1024 PNG and an SVG |
| 5 to 8 real screenshots (1920×1080 or 1270×760 for Product Hunt) | **To do:** overlay while dictating, live preview, per-app styles, model picker, AI clean-up settings, snippets, menu bar |
| 60 to 90 second demo video | **To do:** the strongest asset. Hold Fn in Slack, Mail and Cursor; show live preview; show it working with Wi-Fi off |
| Notarized build | No. The Gatekeeper "Open Anyway" step will come up in every thread; have the one-line answer ready (see FAQ), and prioritize notarization |
| 20 users to ask for reviews | Unknown. Not needed for the free directories below |

Don't launch before the screenshots and video exist; they are what Product Hunt and AlternativeTo visitors judge.

## Submission order

**Week 1, launch week**

1. **Show HN** (Tuesday to Thursday, morning US Eastern). Lead with the technical angle; HN will flag a generic launch post.
2. **Product Hunt** on a Tuesday to Thursday at 12:01 AM Pacific. Three weeks of account warm-up first (comment on a few launches a day); make an Upcoming page two weeks out. Post the first comment yourself, reply to everything, ask for feedback, never for upvotes.
3. **AlternativeTo**: list Hush as an alternative to Wispr Flow, Superwhisper, VoiceInk, Apple Dictation and MacWhisper. Nofollow, but it ranks for "[app] alternatives" and AI engines read it.
4. **GitHub**: set the repo description, website and topics (`dictation`, `speech-to-text`, `macos`, `whisper`, `parakeet`, `apple-silicon`, `wispr-flow-alternative`).

**Week 2**

5. **Awesome lists** (one PR each, matching each list's format; check the list still merges PRs):
   - `jaywcjlove/awesome-mac` (Productivity or Audio section)
   - `serhii-londar/open-source-mac-os-apps` (Audio or Productivity, open-source apps only)
   - `sindresorhus/awesome-whisper` (apps built on Whisper models), if the list still takes apps
   - Lists of open-source alternatives to paid apps (skip `awesome-selfhosted`: Hush isn't a server)
6. **SaaSHub** (as an alternative to Wispr Flow and Superwhisper) and **SourceForge** (mirror listing for an open-source app).
7. **Indie launch sites with real traffic**: Uneed, Fazier, DevHunt (open-source dev-adjacent tools do well there).

**Week 3 and rolling**

8. **Mac app sites**: MacUpdate, Softpedia (Mac), Setapp-style roundups by outreach rather than listing.
9. **Homebrew cask** (`brew install --cask hush`): only after builds are signed and notarized; Homebrew is phasing out unsigned casks.
10. **Reddit**, as a participant first: r/macapps (their self-promotion rules require disclosure and a specific post format), r/MacOS, r/opensource, r/productivity. One post per subreddit, honest about what Hush doesn't do yet.
11. **"Best dictation app for Mac" articles**: email the authors of the top 10 results with one sentence on what's different (free, open source, on-device) and a link to `/compare`. No paid placements.
12. **Entity profiles**: Wikidata item (software, MIT, macOS, developer), Crunchbase only if it makes sense, and add each live profile to `sameAs` in `lib/structured-data.ts`.

Track each submission in a sheet: date, URL, status, the link's actual `rel` attribute once live (check the HTML, not headers).

## Drafted blurbs

Different wording per surface on purpose; duplicate descriptions everywhere help no one.

### Product Hunt

- **Name:** Hush
- **Tagline (60 chars max):** Free, open-source dictation that stays on your Mac
- **Description (260 chars):** Hold Fn, talk, let go: clean, punctuated text appears in any app. Hush recognizes speech on your Mac with open models (Parakeet, Whisper and more), works offline, and has no account or telemetry. AI clean-up is optional, with your own key or Apple Intelligence. MIT licensed.
- **Topics:** Mac, Productivity, Open Source, Artificial Intelligence, Privacy
- **First comment (maker):**
  > Hi, I'm Deepanshu. I built Hush because I wanted Wispr Flow-style dictation without a subscription or sending my voice to a server. Open speech models got good enough, and Apple Silicon fast enough, that a Mac can do it alone.
  >
  > What to try first: hold Fn in Slack, then in Mail, and see the per-app styles. Turn off Wi-Fi; it keeps working.
  >
  > What it doesn't do yet: edit selected text by voice, Intel Macs, Windows or iPhone. They're on the public roadmap (hush.software/roadmap). The build isn't notarized yet, so macOS asks you to click Open Anyway once.
  >
  > I'd love your honest take, especially on accuracy with your accent and the setup steps.

### Show HN

- **Title:** Show HN: Hush – Open-source push-to-talk dictation for Mac, fully on-device
- **Text:**
  > Hush is a free, MIT-licensed macOS app: hold a key, speak, and the text is pasted into the frontmost app. Recognition runs locally (Parakeet V3 by default, plus Nemotron Streaming for live preview, Granite Speech, Whisper and others) through ggml with Metal. It's built with Tauri 2 (Rust backend, React UI).
  >
  > Optional "AI clean-up" sends only the transcript text to an OpenAI-compatible endpoint you configure (a local Ollama server works), or uses Apple Intelligence on-device. There's no telemetry or account; release builds don't log transcript text.
  >
  > Known gaps: Apple Silicon only, builds aren't notarized yet, no voice editing of selected text. Source: github.com/DeepanshuPal/hush. Happy to talk about streaming models, the paste/clipboard dance, or macOS Accessibility quirks.

### AlternativeTo

- **Short:** Free, open-source push-to-talk dictation for Mac with on-device speech recognition.
- **Long:** Hush turns speech into text in any Mac app: hold Fn, talk and let go. Recognition runs on your Mac with open models, so it works offline and audio is never uploaded. It has live preview, per-app writing styles, voice snippets, custom vocabulary and optional AI clean-up through your own API key, a local server or Apple Intelligence. No account, no subscription, no telemetry. MIT licensed. Requires an Apple Silicon Mac.
- **Alternative to:** Wispr Flow, Superwhisper, VoiceInk, Apple Dictation, MacWhisper
- **Tags:** dictation, speech-to-text, voice-typing, open-source, offline, privacy-focused, macos
- **License / price:** Open source (MIT), free

### SaaSHub / indie launch sites

- **Tagline:** The free Wispr Flow alternative that runs on your Mac
- **Description:** Hush is dictation for people who'd rather not pay monthly or upload their voice. Hold Fn, speak, and polished text lands in Slack, Mail, your code editor or any text field. Open speech models run locally on Apple Silicon; AI clean-up is optional. Free and open source.

### Awesome-list entries (match each list's format)

- `[Hush](https://github.com/DeepanshuPal/hush) - Push-to-talk dictation with on-device speech recognition (Parakeet, Whisper). [![Open-Source Software][OSS Icon]](https://github.com/DeepanshuPal/hush) ![Freeware][Freeware Icon]`
- Plain form: `Hush - Free, open-source push-to-talk dictation for Apple Silicon Macs; speech is recognized on-device.` Language, where a list asks: Rust, TypeScript (Tauri).

### Mac app directories (MacUpdate, Softpedia)

- **Summary:** Hold a key and dictate into any app; speech recognition runs on your Mac.
- **Description:** Hush is a menu bar app for fast dictation. Hold Fn (or any shortcut) and talk; let go and the text is typed where your cursor is. Choose Fast, Live preview or Most accurate speech models, all running on-device. Music pauses while you speak, Ctrl+Cmd+V pastes your last transcript again, and per-app styles keep chat casual and email formal. Free and open source.
- **Requirements:** Mac with Apple Silicon (M1 or later)

### Reddit (r/macapps format)

- **Title:** [Free] [Open source] Hush – push-to-talk dictation that runs on-device
- **Body:** what it is (2 lines), what's free (all of it), privacy (on-device, no telemetry), honest gaps (Apple Silicon only, not notarized yet, no voice editing), link to the site and the GitHub repo, and "I'm the developer" disclosure.

## Launch-day checklist

- [ ] Branch `seo` merged and deployed; `/alternatives/*` return 200 and are in the sitemap
- [ ] Sitemap submitted in Search Console and Bing Webmaster Tools
- [ ] Screenshots, demo video and square logo ready
- [ ] Release notes for the current version up to date on GitHub
- [ ] FAQ answer for the Gatekeeper warning linked in the first comment
- [ ] Every comment answered within the day; feedback logged as GitHub issues
- [ ] Day 2: a short, honest recap post (what happened, what's next) on the changelog or X

## After launch

- Turn repeated questions into FAQ entries.
- Check AI answers monthly for the prompts listed in `docs/seo-audit-2026-10.md`.
- Re-check competitor facts quarterly (`CHECKED` in `lib/comparison-data.ts`).
- Every release is a small launch: changelog, a post, and an update to the roadmap page.

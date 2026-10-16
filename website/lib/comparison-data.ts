/**
 * Data for the comparison table on /compare and the short table on the home page.
 *
 * Rules:
 * - Competitor cells come only from each product's own website, docs, pricing page,
 *   terms or source repository. Put the URL in `source`. If it can't be confirmed
 *   there, use "unknown" (shown as "?"). Never guess.
 * - Hush gets "yes" only for features in the current release. Roadmap features are
 *   `{ value: "no", planned: "1.1" | "next" | "later" }`, matching the stage on
 *   /roadmap (lib/roadmap.ts); they render as "Coming in 1.1", "Coming next" or
 *   "Coming later". Flip them to "yes" only once the release ships.
 * - `note` is shown as a short tooltip on the cell; `source` is the evidence and is
 *   kept here for maintainers, not rendered.
 * - Update CHECKED whenever you re-check the competitors.
 */

import type { RoadmapStage } from "@/lib/roadmap"

export const CHECKED = "October 2026"

export type AppId =
  | "hush"
  | "wispr"
  | "superwhisper"
  | "voiceink"
  | "openwhispr"
  | "spokenly"
  | "willow"
  | "apple"

export type App = { id: AppId; name: string; tagline?: string; url: string }

/** "yes" ✓, "no" ✗, "partial" ◐, "unknown" ?, or any other string shown as short text. */
export type CellValue = "yes" | "no" | "partial" | "unknown" | (string & {})

export type Cell = {
  value: CellValue
  /** Short nuance, shown as a tooltip on the cell. */
  note?: string
  /** Official page the value was checked against. */
  source?: string
  /** Hush only: on the roadmap, at this stage. Renders a "Coming …" pill instead of ✗. */
  planned?: RoadmapStage
}

export type Row = {
  id: string
  label: string
  /** One-line explanation shown under the label. */
  description?: string
  cells: Record<AppId, Cell>
}

export type Group = { id: string; label: string; rows: Row[] }

export const apps: App[] = [
  { id: "hush", name: "Hush", tagline: "Free, open source", url: "https://github.com/DeepanshuPal/hush" },
  { id: "wispr", name: "Wispr Flow", url: "https://wisprflow.ai" },
  { id: "superwhisper", name: "Superwhisper", url: "https://superwhisper.com" },
  { id: "voiceink", name: "VoiceInk", url: "https://tryvoiceink.com" },
  { id: "openwhispr", name: "OpenWhispr", url: "https://openwhispr.com" },
  { id: "spokenly", name: "Spokenly", url: "https://spokenly.app" },
  { id: "willow", name: "Willow", url: "https://willowvoice.com" },
  { id: "apple", name: "Apple Dictation", tagline: "Built into macOS", url: "https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac" },
]

const HUSH = "https://github.com/DeepanshuPal/hush"
const HUSH_PRIVACY = "https://www.hush.software/privacy"

// Frequently used official pages.
const WISPR_PRICING = "https://wisprflow.ai/pricing"
const WISPR_WHAT = "https://docs.wisprflow.ai/articles/2772472373-what-is-flow"
const WISPR_DEVICES = "https://docs.wisprflow.ai/articles/1036674442-supported-devices-and-system-requirements"
const WISPR_HANDSFREE = "https://docs.wisprflow.ai/articles/6391241694-use-flow-hands-free"
const WISPR_DICTIONARY = "https://docs.wisprflow.ai/articles/4052411709-teach-flow-your-words-with-the-dictionary"
const SW_PLANS = "https://superwhisper.com/docs/billing/plans"
const SW_INTRO = "https://superwhisper.com/docs/get-started/introduction"
const SW_SETTINGS = "https://superwhisper.com/docs/get-started/essential-settings"
const SW_LANGUAGE = "https://superwhisper.com/docs/models/language"
const SW_VOCAB = "https://superwhisper.com/docs/get-started/interface-vocabulary"
const SW_BUILTIN = "https://superwhisper.com/docs/modes/built-in"
const SW_HOME = "https://superwhisper.com"
const VI_PRICING = "https://tryvoiceink.com/pricing"
const VI_HOME = "https://tryvoiceink.com"
const VI_INTRO = "https://tryvoiceink.com/docs/introduction"
const VI_LOCAL = "https://tryvoiceink.com/docs/local-models"
const VI_SHORTCUTS = "https://tryvoiceink.com/docs/shortcuts"
const VI_REFINE = "https://tryvoiceink.com/docs/voiceink-refine"
const VI_CONTEXT = "https://tryvoiceink.com/docs/context-awareness"
const OW_PLANS = "https://docs.openwhispr.com/help/plans-and-limits"
const OW_README = "https://github.com/OpenWhispr/openwhispr/blob/main/README.md"
const OW_LOCAL = "https://docs.openwhispr.com/guides/cloud-vs-local"
const OW_DATA = "https://docs.openwhispr.com/help/privacy/where-your-data-goes"
const OW_HOLD = "https://docs.openwhispr.com/help/dictation/hold-or-tap"
const OW_CLEANUP = "https://docs.openwhispr.com/help/dictation/cleanup"
const OW_DICTIONARY = "https://docs.openwhispr.com/help/customise/custom-dictionary"
const OW_AGENT = "https://docs.openwhispr.com/help/agent/voice-agent"
const SP_PRICING = "https://spokenly.app/pricing"
const SP_HOME = "https://spokenly.app/"
const SP_MAC = "https://spokenly.app/dictation-for-mac"
const SP_DOWNLOAD = "https://spokenly.app/download"
const SP_MODES = "https://spokenly.app/docs/modes"
const SP_LOCAL_CLEANUP = "https://spokenly.app/docs/local-model-cleanup"
const WI_PRICING = "https://willowvoice.com/pricing"
const WI_HOME = "https://willowvoice.com"
const WI_PLANS = "https://help.willowvoice.com/en/articles/12854184-willow-pricing-plans-overview"
const WI_PRIVACY = "https://help.willowvoice.com/en/articles/12854269-how-willow-protects-your-data-and-privacy"
const WI_DICTATING = "https://help.willowvoice.com/en/articles/10876920-dictating-with-willow-voice"
const WI_DICTIONARY = "https://help.willowvoice.com/en/articles/13183918-using-personal-dictionary-and-shortcuts"
const WI_CHANGELOG = "https://internal-changelog.willowvoice.com/"
const AP_GUIDE = "https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac"
const AP_AVAILABILITY = "https://www.apple.com/macos/feature-availability/"
const AP_PRIVACY = "https://www.apple.com/legal/privacy/data/en/ask-siri-dictation/"

const ON_DEVICE_HUSH = "Parakeet, Whisper, Moonshine, Canary and other open models run locally."

export const groups: Group[] = [
  {
    id: "price",
    label: "Price & openness",
    rows: [
      {
        id: "price",
        label: "Price",
        description: "Paid plan, monthly unless noted",
        cells: {
          hush: { value: "Free", source: HUSH },
          wispr: { value: "$15/mo", note: "Pro plan; $12/mo billed yearly.", source: WISPR_PRICING },
          superwhisper: { value: "$8.49/mo", note: "Or $84.99/yr, or $249.99 lifetime.", source: SW_PLANS },
          voiceink: { value: "$25 one-time", note: "For 1 Mac; $39 for 2 Macs, $49 for 3.", source: VI_PRICING },
          openwhispr: { value: "$8/mo", note: "Pro plan, or $80/yr. Only needed for their hosted cloud.", source: OW_PLANS },
          spokenly: { value: "$9.99/mo", note: "Pro plan, or $99.99/yr; a one-time Local+ plan is $29.", source: SP_PRICING },
          willow: { value: "$15/mo", note: "Pro plan; $12/mo billed yearly.", source: WI_PRICING },
          apple: { value: "Free", note: "Built into macOS.", source: AP_GUIDE },
        },
      },
      {
        id: "free-tier",
        label: "Free version",
        description: "What you get without paying",
        cells: {
          hush: { value: "Everything", source: HUSH },
          wispr: { value: "2,000 words a week", note: "On desktop; 1,000 words a week on iPhone.", source: WISPR_PRICING },
          superwhisper: { value: "Local models", note: "Unlimited dictation with local models, no AI clean-up.", source: SW_PLANS },
          voiceink: { value: "7-day trial", note: "Free if you build it yourself from the GPL source.", source: "https://tryvoiceink.com/docs/license-management" },
          openwhispr: { value: "Local models", note: "Unlimited with local models or your own keys; 2,000 cloud words a week.", source: OW_PLANS },
          spokenly: { value: "Local models", note: "Unlimited with local models or your own API keys.", source: SP_PRICING },
          willow: { value: "Limited", note: "Unlimited dictation on a lighter model, plus 20 uses a week of their Scribe feature.", source: WI_PRICING },
          apple: { value: "Everything", source: AP_GUIDE },
        },
      },
      {
        id: "open-source",
        label: "Open source",
        description: "License, if the code is public",
        cells: {
          hush: { value: "MIT", source: "https://github.com/DeepanshuPal/hush/blob/main/LICENSE" },
          wispr: { value: "no", note: "Terms forbid decompiling to access source code.", source: "https://wisprflow.ai/terms-of-service" },
          superwhisper: { value: "no", note: "Terms forbid extracting the app's source code.", source: "https://superwhisper.com/terms" },
          voiceink: { value: "GPL-3.0", source: "https://github.com/Beingpax/VoiceInk/blob/main/LICENSE" },
          openwhispr: { value: "MIT", source: "https://github.com/OpenWhispr/openwhispr/blob/main/LICENSE" },
          spokenly: { value: "no", note: "Terms say the app is owned by Spokenly and protected by copyright.", source: "https://spokenly.app/terms" },
          willow: { value: "no", note: "Terms prohibit reverse engineering.", source: "https://willowvoice.com/terms-of-service" },
          apple: { value: "no", source: "https://www.apple.com/legal/sla/" },
        },
      },
      {
        id: "account",
        label: "Account",
        description: "Do you have to sign in?",
        cells: {
          hush: { value: "Not needed", source: HUSH },
          wispr: { value: "Required", source: WISPR_WHAT },
          superwhisper: { value: "Not needed", note: "Activates with a license key.", source: "https://superwhisper.com/docs/billing/activate" },
          voiceink: { value: "Not needed", note: "Activates with a license key.", source: "https://tryvoiceink.com/docs/license-management" },
          openwhispr: { value: "partial", note: "Only for their hosted cloud; local models and your own keys need no account.", source: "https://docs.openwhispr.com/platform/mobile" },
          spokenly: { value: "Not needed", note: "Sign-in only to activate a purchase made on their website.", source: SP_PRICING },
          willow: { value: "Required", source: "https://help.willowvoice.com/en/articles/10876111-install-and-setup-willow-voice-mac-windows" },
          apple: { value: "unknown" },
        },
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy",
    rows: [
      {
        id: "on-device",
        label: "On-device speech recognition",
        description: "Your voice is turned into text on your computer",
        cells: {
          hush: { value: "yes", note: ON_DEVICE_HUSH, source: HUSH },
          wispr: { value: "no", note: "Cloud only.", source: "https://docs.wisprflow.ai/articles/3467817258-security-and-compliance-faq" },
          superwhisper: { value: "yes", note: "Cloud models also available.", source: "https://superwhisper.com/docs/models/voice" },
          voiceink: { value: "yes", note: "Cloud providers optional.", source: VI_LOCAL },
          openwhispr: { value: "yes", note: "Cloud models also available.", source: OW_LOCAL },
          spokenly: { value: "yes", note: "Cloud models are the default; local models optional.", source: SP_HOME },
          willow: { value: "partial", note: "Cloud by default; local recognition only in Offline mode (Pro).", source: WI_CHANGELOG },
          apple: { value: "partial", note: "On Apple Silicon for 48 languages; otherwise Apple's servers.", source: AP_AVAILABILITY },
        },
      },
      {
        id: "offline",
        label: "Works offline",
        cells: {
          hush: { value: "yes", note: "Only the optional AI clean-up with a cloud provider needs a connection.", source: HUSH },
          wispr: { value: "no", note: "Their docs say an internet connection is required.", source: WISPR_WHAT },
          superwhisper: { value: "yes", source: SW_INTRO },
          voiceink: { value: "yes", note: "With local models.", source: "https://tryvoiceink.com/docs/privacy-and-data" },
          openwhispr: { value: "yes", note: "With local models.", source: OW_LOCAL },
          spokenly: { value: "yes", note: "With local models.", source: SP_MAC },
          willow: { value: "partial", note: "Offline mode is a Pro feature.", source: WI_PLANS },
          apple: { value: "partial", note: "Only for on-device languages on Apple Silicon.", source: "https://support.apple.com/en-kg/guide/mac-help/use-dictation-mh40584/12.0/mac" },
        },
      },
      {
        id: "audio-leaves",
        label: "Audio sent to a server",
        description: "When your recording leaves your computer",
        cells: {
          hush: { value: "Never", source: HUSH_PRIVACY },
          wispr: { value: "Always", source: "https://docs.wisprflow.ai/articles/9609615338-private-cloud-sync-and-data-sharing-preferences-in-wispr-flow" },
          superwhisper: { value: "By default", note: "Cloud models are the default on Pro; local models keep audio on your Mac.", source: "https://superwhisper.com/docs/get-started/choose-your-model" },
          voiceink: { value: "Only with cloud models", source: "https://tryvoiceink.com/privacy" },
          openwhispr: { value: "Only with cloud models", source: OW_DATA },
          spokenly: { value: "By default", note: "Cloud models are the default; local models keep audio on your device.", source: "https://spokenly.app/llms-full.txt" },
          willow: { value: "By default", note: "Except in Offline mode (Pro).", source: WI_PRIVACY },
          apple: { value: "Sometimes", note: "On Intel Macs, for languages without on-device support, and in search boxes.", source: AP_PRIVACY },
        },
      },
      {
        id: "telemetry",
        label: "Usage analytics",
        description: "Telemetry about how you use the app",
        cells: {
          hush: { value: "None", source: HUSH_PRIVACY },
          wispr: { value: "Yes", note: "Usage data is collected even with “Never store my data” on.", source: "https://wisprflow.ai/privacy-policy" },
          superwhisper: { value: "Yes", note: "The App Store privacy label lists diagnostics and a device ID; their privacy policy says no usage data is collected.", source: "https://apps.apple.com/us/app/superwhisper/id6471464415" },
          voiceink: { value: "unknown", note: "Their privacy policy doesn't say either way." },
          openwhispr: { value: "Opt-in", note: "Off by default.", source: OW_DATA },
          spokenly: { value: "On by default", note: "Turned off only by Local Only Mode.", source: "https://spokenly.app/docs/local-only-mode" },
          willow: { value: "Yes", source: "https://willowvoice.com/privacy-policy" },
          apple: { value: "Opt-in", note: "Storing audio is opt-in; server requests still log device and performance data.", source: AP_PRIVACY },
        },
      },
    ],
  },
  {
    id: "dictation",
    label: "Dictation",
    rows: [
      {
        id: "push-to-talk",
        label: "Push to talk",
        description: "Hold a key, speak, release",
        cells: {
          hush: { value: "yes", source: HUSH },
          wispr: { value: "yes", source: WISPR_HANDSFREE },
          superwhisper: { value: "yes", source: SW_SETTINGS },
          voiceink: { value: "yes", source: VI_SHORTCUTS },
          openwhispr: { value: "yes", source: OW_HOLD },
          spokenly: { value: "yes", source: "https://spokenly.app/docs" },
          willow: { value: "yes", source: WI_DICTATING },
          apple: { value: "unknown", note: "Apple documents press-to-start only; holding the Microphone key opens Siri." },
        },
      },
      {
        id: "hands-free",
        label: "Hands-free mode",
        description: "Tap once to start, again to stop",
        cells: {
          hush: { value: "yes", note: "A quick tap latches; holding works as push to talk.", source: HUSH },
          wispr: { value: "yes", source: WISPR_HANDSFREE },
          superwhisper: { value: "yes", source: SW_SETTINGS },
          voiceink: { value: "yes", source: VI_SHORTCUTS },
          openwhispr: { value: "yes", source: OW_HOLD },
          spokenly: { value: "yes", source: SP_MODES },
          willow: { value: "yes", source: "https://help.willowvoice.com/en/articles/10876257-hotkey-settings" },
          apple: { value: "yes", source: AP_GUIDE },
        },
      },
      {
        id: "live-preview",
        label: "Live preview",
        description: "See words appear while you speak",
        cells: {
          hush: { value: "yes", source: HUSH },
          wispr: { value: "no", note: "Text is inserted after you stop speaking.", source: WISPR_WHAT },
          superwhisper: { value: "yes", note: "Pro, with selected models.", source: "https://superwhisper.com/docs/common-issues/realtime" },
          voiceink: { value: "partial", note: "Only with streaming models, not local Whisper.", source: "https://tryvoiceink.com/docs/realtime-transcription" },
          openwhispr: { value: "partial", note: "Only with streaming models.", source: "https://docs.openwhispr.com/guides/local-models" },
          spokenly: { value: "yes", note: "With streaming models.", source: SP_HOME },
          willow: { value: "unknown" },
          apple: { value: "unknown" },
        },
      },
      {
        id: "any-app",
        label: "Works in any app",
        cells: {
          hush: { value: "yes", source: HUSH },
          wispr: { value: "yes", source: WISPR_PRICING },
          superwhisper: { value: "yes", source: SW_INTRO },
          voiceink: { value: "yes", source: VI_HOME },
          openwhispr: { value: "yes", source: "https://docs.openwhispr.com/guides/dictation" },
          spokenly: { value: "yes", source: SP_HOME },
          willow: { value: "yes", source: WI_DICTATING },
          apple: { value: "yes", source: AP_GUIDE },
        },
      },
      {
        id: "languages",
        label: "Languages",
        cells: {
          hush: { value: "99", note: "99 with Whisper models; 25 European languages with the default Parakeet V3.", source: HUSH },
          wispr: { value: "100+", source: WISPR_PRICING },
          superwhisper: { value: "100+", note: "Depends on the model.", source: SW_INTRO },
          voiceink: { value: "unknown", note: "Multilingual models, but no total is stated." },
          openwhispr: { value: "60", note: "Selectable in the app; their website says 100+.", source: "https://docs.openwhispr.com/help/dictation/languages" },
          spokenly: { value: "100+", source: SP_HOME },
          willow: { value: "100+", source: WI_PLANS },
          apple: { value: "63", note: "48 of them on-device.", source: AP_AVAILABILITY },
        },
      },
    ],
  },
  {
    id: "ai",
    label: "AI clean-up",
    rows: [
      {
        id: "ai-cleanup",
        label: "AI clean-up",
        description: "Fixes punctuation, filler words and formatting",
        cells: {
          hush: { value: "yes", note: "Optional, with your own provider key or Apple Intelligence.", source: HUSH },
          wispr: { value: "yes", note: "Built in, through their cloud.", source: "https://wisprflow.ai" },
          superwhisper: { value: "yes", note: "Pro feature.", source: SW_BUILTIN },
          voiceink: { value: "yes", source: VI_REFINE },
          openwhispr: { value: "yes", source: OW_CLEANUP },
          spokenly: { value: "yes", source: SP_HOME },
          willow: { value: "yes", source: WI_HOME },
          apple: { value: "unknown", note: "Only automatic punctuation is documented for Dictation." },
        },
      },
      {
        id: "byok",
        label: "Bring your own key",
        description: "Use your own AI provider account",
        cells: {
          hush: { value: "yes", note: "Groq, OpenAI, Anthropic, OpenRouter, Cerebras or any OpenAI-compatible endpoint.", source: HUSH },
          wispr: { value: "unknown" },
          superwhisper: { value: "yes", note: "Pro feature.", source: SW_LANGUAGE },
          voiceink: { value: "yes", source: "https://tryvoiceink.com/docs/cloud-providers" },
          openwhispr: { value: "yes", source: OW_CLEANUP },
          spokenly: { value: "yes", source: SP_MODES },
          willow: { value: "unknown" },
          apple: { value: "unknown" },
        },
      },
      {
        id: "on-device-ai",
        label: "On-device AI option",
        description: "Clean-up with a local model or Apple Intelligence",
        cells: {
          hush: { value: "yes", note: "Apple Intelligence on supported Macs.", source: HUSH },
          wispr: { value: "unknown" },
          superwhisper: { value: "yes", note: "Their S1-mini model: English, Message and Mail modes.", source: SW_LANGUAGE },
          voiceink: { value: "yes", note: "VoiceInk Refine or Ollama.", source: VI_LOCAL },
          openwhispr: { value: "yes", note: "Bundled local models, Ollama or LM Studio.", source: OW_CLEANUP },
          spokenly: { value: "yes", note: "Needs Apple Silicon and macOS 26.", source: SP_LOCAL_CLEANUP },
          willow: { value: "unknown" },
          apple: { value: "unknown" },
        },
      },
      {
        id: "self-correction",
        label: "Handles self-corrections",
        description: "“At 4, no, 5” becomes “At 5”",
        cells: {
          hush: { value: "yes", note: "Part of the AI clean-up.", source: HUSH },
          wispr: { value: "yes", source: "https://docs.wisprflow.ai/articles/5373093536-how-do-i-use-smart-formatting-and-backtrack" },
          superwhisper: { value: "unknown" },
          voiceink: { value: "yes", source: VI_REFINE },
          openwhispr: { value: "yes", source: "https://github.com/OpenWhispr/openwhispr/blob/main/src/locales/en/prompts.json" },
          spokenly: { value: "yes", source: SP_LOCAL_CLEANUP },
          willow: { value: "yes", source: "https://help.willowvoice.com/en/articles/13183983-voice-commands-and-automatic-formatting-guide" },
          apple: { value: "unknown" },
        },
      },
      {
        id: "per-app-styles",
        label: "Per-app styles",
        description: "Writes differently in chat, email or code",
        cells: {
          hush: { value: "yes", note: "Default, Message, Email, Code and Raw.", source: HUSH },
          wispr: { value: "yes", note: "By app category, English only.", source: "https://docs.wisprflow.ai/articles/2368263928-how-to-setup-flow-styles" },
          superwhisper: { value: "yes", source: "https://superwhisper.com/docs/modes/modes" },
          voiceink: { value: "yes", source: "https://tryvoiceink.com/docs/mode-triggers" },
          openwhispr: { value: "unknown" },
          spokenly: { value: "yes", source: SP_MODES },
          willow: { value: "yes", source: "https://help.willowvoice.com/en/articles/12864746-personalization-and-style-matching" },
          apple: { value: "unknown" },
        },
      },
      {
        id: "custom-vocabulary",
        label: "Custom vocabulary",
        description: "Names and terms spelled your way",
        cells: {
          hush: { value: "yes", source: HUSH },
          wispr: { value: "yes", source: WISPR_DICTIONARY },
          superwhisper: { value: "yes", source: SW_VOCAB },
          voiceink: { value: "yes", source: "https://github.com/Beingpax/VoiceInk" },
          openwhispr: { value: "yes", source: OW_DICTIONARY },
          spokenly: { value: "yes", source: "https://spokenly.app/docs/custom-dictionary" },
          willow: { value: "yes", source: WI_DICTIONARY },
          apple: { value: "unknown" },
        },
      },
      {
        id: "snippets",
        label: "Voice snippets",
        description: "A short phrase expands into longer text",
        cells: {
          hush: { value: "yes", source: HUSH },
          wispr: { value: "yes", source: WISPR_PRICING },
          superwhisper: { value: "yes", source: SW_VOCAB },
          voiceink: { value: "yes", note: "Through word replacements.", source: "https://tryvoiceink.com/docs/word-replacements" },
          openwhispr: { value: "yes", source: "https://docs.openwhispr.com/help/customise/snippets" },
          spokenly: { value: "partial", note: "No snippet feature, but word replacements can expand text.", source: "https://spokenly.app/docs/word-replacements" },
          willow: { value: "yes", source: WI_DICTIONARY },
          apple: { value: "unknown" },
        },
      },
    ],
  },
  {
    id: "power",
    label: "Power features",
    rows: [
      {
        id: "edit-selection",
        label: "Edit selected text by voice",
        description: "“Make this more formal”",
        cells: {
          hush: { value: "no", planned: "next" },
          wispr: { value: "yes", note: "Command Mode, Pro plan.", source: "https://docs.wisprflow.ai/articles/4816967992-how-to-use-command-mode" },
          superwhisper: { value: "yes", source: SW_BUILTIN },
          voiceink: { value: "yes", source: VI_CONTEXT },
          openwhispr: { value: "yes", note: "Through the voice agent shortcut.", source: OW_AGENT },
          spokenly: { value: "unknown" },
          willow: { value: "yes", source: "https://help.willowvoice.com/en/articles/15043797-introduction-to-scribe-in-willow" },
          apple: { value: "no", note: "Dictation commands cover punctuation and formatting; Apple points to Voice Control.", source: "https://support.apple.com/guide/mac-help/commands-for-dictating-text-on-mac-mh40695/mac" },
        },
      },
      {
        id: "context",
        label: "Context awareness",
        description: "Uses text on screen or around the cursor",
        cells: {
          hush: { value: "no", planned: "next" },
          wispr: { value: "yes", source: "https://docs.wisprflow.ai/articles/4678293671-feature-context-awareness" },
          superwhisper: { value: "yes", note: "Pro feature.", source: "https://superwhisper.com/docs/common-issues/context" },
          voiceink: { value: "yes", note: "Selected text, clipboard and screen text.", source: VI_CONTEXT },
          openwhispr: { value: "yes", note: "In the voice agent, not plain dictation.", source: OW_AGENT },
          spokenly: { value: "yes", source: SP_MODES },
          willow: { value: "yes", source: WI_PRIVACY },
          apple: { value: "unknown" },
        },
      },
      {
        id: "learns",
        label: "Learns from your corrections",
        cells: {
          hush: { value: "no", planned: "next" },
          wispr: { value: "yes", source: WISPR_DICTIONARY },
          superwhisper: { value: "unknown" },
          voiceink: { value: "yes", source: "https://tryvoiceink.com/docs/auto-learn-dictionary" },
          openwhispr: { value: "yes", source: OW_DICTIONARY },
          spokenly: { value: "unknown" },
          willow: { value: "yes", source: WI_CHANGELOG },
          apple: { value: "unknown" },
        },
      },
      {
        id: "pause-media",
        label: "Pauses media while dictating",
        cells: {
          hush: { value: "no", planned: "1.1" },
          wispr: { value: "yes", note: "Mutes music on desktop.", source: "https://docs.wisprflow.ai/articles/7231650589-auto-mute-music-while-dictating-on-macos-how-audio-detection-works" },
          superwhisper: { value: "yes", source: SW_SETTINGS },
          voiceink: { value: "yes", source: "https://tryvoiceink.com/docs/audio-input" },
          openwhispr: { value: "yes", source: "https://github.com/OpenWhispr/openwhispr/blob/main/CHANGELOG.md" },
          spokenly: { value: "yes", source: "https://spokenly.app/releases/macos" },
          willow: { value: "yes", note: "Mutes background audio rather than pausing it.", source: "https://willowvoice.featurebase.app/changelog" },
          apple: { value: "unknown" },
        },
      },
      {
        id: "file-transcription",
        label: "File transcription",
        description: "Turn audio or video files into text",
        cells: {
          hush: { value: "no", planned: "later" },
          wispr: { value: "no", source: "https://docs.wisprflow.ai/articles/7689167034-can-i-upload-audio-files-to-wispr-flow-for-transcription" },
          superwhisper: { value: "yes", note: "Pro feature.", source: "https://superwhisper.com/docs/get-started/transcribe-files" },
          voiceink: { value: "yes", source: VI_INTRO },
          openwhispr: { value: "yes", source: OW_README },
          spokenly: { value: "yes", source: SP_MAC },
          willow: { value: "unknown" },
          apple: { value: "unknown" },
        },
      },
      {
        id: "history",
        label: "History",
        cells: {
          hush: { value: "yes", note: "Stored only on your Mac.", source: HUSH },
          wispr: { value: "yes", source: WISPR_WHAT },
          superwhisper: { value: "yes", source: "https://superwhisper.com/docs/get-started/history" },
          voiceink: { value: "yes", source: VI_INTRO },
          openwhispr: { value: "yes", source: "https://docs.openwhispr.com/help/fix/recover-a-lost-dictation" },
          spokenly: { value: "yes", source: SP_HOME },
          willow: { value: "yes", source: WI_PRIVACY },
          apple: { value: "unknown" },
        },
      },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    rows: [
      {
        id: "mac-arm",
        label: "Mac (Apple Silicon)",
        cells: {
          hush: { value: "yes", source: HUSH },
          wispr: { value: "yes", source: WISPR_DEVICES },
          superwhisper: { value: "yes", source: SW_HOME },
          voiceink: { value: "yes", source: VI_PRICING },
          openwhispr: { value: "yes", source: OW_README },
          spokenly: { value: "yes", source: SP_MAC },
          willow: { value: "yes", source: WI_PLANS },
          apple: { value: "yes", source: AP_GUIDE },
        },
      },
      {
        id: "mac-intel",
        label: "Mac (Intel)",
        cells: {
          hush: { value: "no", planned: "later" },
          wispr: { value: "yes", source: WISPR_DEVICES },
          superwhisper: { value: "yes", note: "Works best with cloud models on Intel.", source: SW_HOME },
          voiceink: { value: "no", source: VI_PRICING },
          openwhispr: { value: "yes", source: OW_README },
          spokenly: { value: "yes", source: SP_MAC },
          willow: { value: "unknown" },
          apple: { value: "yes", note: "Recognition runs on Apple's servers on Intel Macs.", source: AP_PRIVACY },
        },
      },
      {
        id: "windows",
        label: "Windows",
        cells: {
          hush: { value: "no", planned: "later" },
          wispr: { value: "yes", source: WISPR_DEVICES },
          superwhisper: { value: "yes", source: "https://superwhisper.com/docs/get-started/windows" },
          voiceink: { value: "no", source: VI_PRICING },
          openwhispr: { value: "yes", source: OW_README },
          spokenly: { value: "yes", source: SP_DOWNLOAD },
          willow: { value: "yes", source: WI_PLANS },
          apple: { value: "no", source: AP_GUIDE },
        },
      },
      {
        id: "ios",
        label: "iPhone",
        cells: {
          hush: { value: "no", note: "Not on the roadmap yet." },
          wispr: { value: "yes", source: WISPR_DEVICES },
          superwhisper: { value: "yes", source: "https://superwhisper.com/docs/get-started/ios" },
          voiceink: { value: "yes", source: VI_HOME },
          openwhispr: { value: "yes", source: "https://docs.openwhispr.com/platform/mobile" },
          spokenly: { value: "yes", source: SP_DOWNLOAD },
          willow: { value: "yes", source: WI_HOME },
          apple: { value: "yes", source: "https://support.apple.com/guide/iphone/dictate-text-iph2c0651d2/ios" },
        },
      },
    ],
  },
]

const allRows = groups.flatMap((group) => group.rows)

export function getApp(id: AppId): App {
  const app = apps.find((a) => a.id === id)
  if (!app) throw new Error(`Unknown app: ${id}`)
  return app
}

export function getRow(id: string): Row {
  const row = allRows.find((r) => r.id === id)
  if (!row) throw new Error(`Unknown comparison row: ${id}`)
  return row
}

/** Unique source URLs per app, in table order. */
export function getSources(): Record<AppId, string[]> {
  const sources = Object.fromEntries(apps.map((app) => [app.id, [] as string[]])) as Record<AppId, string[]>
  for (const row of allRows) {
    for (const app of apps) {
      const url = row.cells[app.id].source
      if (url && !sources[app.id].includes(url)) sources[app.id].push(url)
    }
  }
  return sources
}

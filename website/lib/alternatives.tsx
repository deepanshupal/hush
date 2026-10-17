/**
 * Copy for the /alternatives/* pages: Hush as an alternative to one specific app.
 *
 * Rules (same as lib/comparison-data.ts, which the tables on these pages read):
 * - Every claim about the other app must match a cell in lib/comparison-data.ts,
 *   which records the official source for it. If the data changes, change the copy.
 * - Say what the other app does better. Readers check, and so do AI answer engines.
 * - No invented quotes, numbers or "users say". Add real switcher quotes only with
 *   the person's permission.
 * - Re-check alongside CHECKED in lib/comparison-data.ts.
 */

import Link from "next/link"
import type { AppId } from "@/lib/comparison-data"
import type { FaqItem } from "@/lib/faq"
import type { PageKey } from "@/lib/pages"

export type AlternativeKey = Extract<PageKey, "altWisprFlow" | "altSuperwhisper" | "altVoiceInk">

type Block = { title: string; body: React.ReactNode }

export interface Alternative {
  key: AlternativeKey
  app: AppId
  /** Competitor name as written in headings. */
  name: string
  title: React.ReactNode
  /** TL;DR: the key differences and who each app suits, in a few sentences. */
  lead: string
  /** Why people look for an alternative to this app. Three items. */
  reasons: Block[]
  /** Rows from lib/comparison-data.ts for the side-by-side table. */
  rows: string[]
  hushAhead: React.ReactNode
  themAhead: React.ReactNode
  chooseHush: string[]
  chooseThem: string[]
  switching: Block[]
  faqs: FaqItem[]
}

const download = (
  <Link href="/download" className="link">
    Download Hush
  </Link>
)

export const ALTERNATIVES: Record<AlternativeKey, Alternative> = {
  altWisprFlow: {
    key: "altWisprFlow",
    app: "wispr",
    name: "Wispr Flow",
    title: (
      <>
        A free Wispr Flow alternative <span className="text-accent">that runs on your Mac.</span>
      </>
    ),
    lead: "Wispr Flow is cloud dictation for Mac, Windows and iPhone, free for 2,000 words a week and $15 a month after that. Hush is free and open source, and recognizes your speech on your Mac, offline. Pick Wispr Flow if you need it on every device. Pick Hush if you'd rather not pay or upload your voice.",
    reasons: [
      {
        title: "The word limit, then the bill",
        body: "Wispr Flow's free plan stops at 2,000 words a week on desktop, and Pro costs $15 a month ($12 billed yearly). Hush has nothing to upgrade to: every feature is in the free download.",
      },
      {
        title: "Your voice goes to the cloud",
        body: "Wispr Flow recognizes speech on its servers and needs an internet connection. Hush runs open speech models on your Mac, so your audio stays there and dictation works on a plane.",
      },
      {
        title: "An account and usage data",
        body: "Wispr Flow needs an account, and its privacy policy says usage data is collected even with “Never store my data” turned on. Hush has no account, no analytics and no telemetry.",
      },
    ],
    rows: [
      "price",
      "free-tier",
      "open-source",
      "account",
      "on-device",
      "offline",
      "audio-leaves",
      "telemetry",
      "live-preview",
      "ai-cleanup",
      "per-app-styles",
      "custom-vocabulary",
      "snippets",
      "pause-media",
      "edit-selection",
      "context",
      "learns",
      "mac-intel",
      "windows",
      "ios",
    ],
    hushAhead: (
      <>
        Hush costs nothing and has no word limit. Speech is recognized on your Mac, so it works
        offline and your audio is never uploaded. With the Live preview model you see words while
        you talk; Wispr Flow inserts text after you stop. AI clean-up is optional and goes through a
        provider you pick, or Apple Intelligence on your Mac. And the code is public.
      </>
    ),
    themAhead: (
      <>
        Wispr Flow does more today. Its Command Mode (Pro) edits selected text by voice, it reads
        context from the app you are in, and its dictionary learns from your corrections. It also
        runs on Windows, iPhone and Intel Macs, and cleans up text without any setup. Voice editing,
        context and a learning dictionary are next on the{" "}
        <Link href="/roadmap" className="link">
          Hush roadmap
        </Link>
        ; Intel and Windows come later, and there is no iPhone app.
      </>
    ),
    chooseHush: [
      "You dictate on a Mac with Apple Silicon",
      "You don't want a subscription or a weekly word limit",
      "You want your speech recognized on your own machine, even offline",
      "You want to read, build or change the code",
    ],
    chooseThem: [
      "You need dictation on Windows, iPhone or an Intel Mac",
      "You want to edit selected text by voice today",
      "You want clean-up that works with no provider or setup",
      "You want a dictionary that learns from your corrections",
    ],
    switching: [
      {
        title: "Install Hush",
        body: (
          <>
            {download}, drag it to Applications and grant Microphone and Accessibility access. It
            takes about two minutes, and there is no account to create.
          </>
        ),
      },
      {
        title: "Sort out the shortcut",
        body: "Hush listens for Fn by default. If Wispr Flow is still running on the same key, quit it or give Hush a different shortcut in Settings.",
      },
      {
        title: "Bring your words across",
        body: "Hush has no importer, so add the names and terms from your Wispr Flow dictionary as custom words, and recreate your snippets in Hush's settings.",
      },
      {
        title: "Turn on AI clean-up, if you want it",
        body: "Wispr Flow cleans up every dictation in its cloud. In Hush clean-up is optional: use Apple Intelligence on supported Macs, or add a key from Groq, OpenAI, Anthropic or another provider, then set a style for each app.",
      },
    ],
    faqs: [
      {
        question: "Is there a free alternative to Wispr Flow?",
        text: "Yes. Hush is a free, open-source dictation app for Apple Silicon Macs that works like Wispr Flow: hold a key, talk, and clean text appears in any app. There is no word limit, account or subscription, and because it recognizes speech on your Mac, it also works offline.",
        answer: (
          <>
            Yes. Hush is a free, open-source dictation app for Apple Silicon Macs that works like
            Wispr Flow: hold a key, talk, and clean text appears in any app. There is no word limit,
            account or subscription, and because it recognizes speech on your Mac, it also works
            offline.
          </>
        ),
      },
      {
        question: "Does Wispr Flow work offline?",
        text: "No. Wispr Flow's documentation says it needs an internet connection, because speech is processed in its cloud. Hush works offline once you've downloaded a speech model; only optional AI clean-up with a cloud provider needs a connection.",
        answer: (
          <>
            No. Wispr Flow&apos;s documentation says it needs an internet connection, because speech
            is processed in its cloud. Hush works offline once you&apos;ve downloaded a speech model;
            only optional AI clean-up with a cloud provider needs a connection.
          </>
        ),
      },
      {
        question: "Can I use Hush and Wispr Flow side by side?",
        text: "Yes, as long as they don't listen for the same shortcut. Give one of them a different key, or quit the one you're not using.",
        answer: (
          <>
            Yes, as long as they don&apos;t listen for the same shortcut. Give one of them a
            different key, or quit the one you&apos;re not using.
          </>
        ),
      },
    ],
  },

  altSuperwhisper: {
    key: "altSuperwhisper",
    app: "superwhisper",
    name: "Superwhisper",
    title: (
      <>
        A free Superwhisper alternative, <span className="text-accent">clean-up included.</span>
      </>
    ),
    lead: "Superwhisper is a capable Mac dictation app: free with local models, and $8.49 a month (or $249.99 for life) for AI clean-up and Pro features. Hush is free and open source, with on-device speech recognition and AI clean-up at no cost. Pick Superwhisper for file transcription and apps on Windows and iPhone. Pick Hush for AI clean-up without a subscription.",
    reasons: [
      {
        title: "AI clean-up is a Pro feature",
        body: "Superwhisper's free version dictates with local models but leaves out AI clean-up, which comes with Pro at $8.49 a month. In Hush clean-up is free: use Apple Intelligence, a local server such as Ollama, or your own key, and pay only your provider, if anything.",
      },
      {
        title: "You want to see the code",
        body: "Superwhisper is closed source, and its terms forbid extracting the app's source code. Hush is MIT licensed, so you can read it, build it and change it.",
      },
      {
        title: "You want no analytics at all",
        body: "Superwhisper's App Store privacy label lists diagnostics and a device identifier, though its privacy policy says it collects no usage data. Hush has no analytics or telemetry of any kind.",
      },
    ],
    rows: [
      "price",
      "free-tier",
      "open-source",
      "account",
      "on-device",
      "offline",
      "audio-leaves",
      "telemetry",
      "live-preview",
      "ai-cleanup",
      "byok",
      "on-device-ai",
      "per-app-styles",
      "custom-vocabulary",
      "snippets",
      "edit-selection",
      "context",
      "file-transcription",
      "mac-intel",
      "windows",
      "ios",
    ],
    hushAhead: (
      <>
        Everything in Hush is free, including AI clean-up and bring-your-own-key, which are Pro
        features in Superwhisper. Live preview works with Hush&apos;s free Live preview model; in
        Superwhisper real-time text is a Pro feature with selected models. Hush never uploads your
        audio, while Superwhisper Pro uses cloud models by default. And the code is public.
      </>
    ),
    themAhead: (
      <>
        Superwhisper does more today. It transcribes audio and video files, edits selected text by
        voice, uses on-screen context (Pro), and runs on Intel Macs, Windows and iPhone. It also
        offers a lifetime license, so you can pay once instead of setting up an AI provider. Voice
        editing and context are next on the{" "}
        <Link href="/roadmap" className="link">
          Hush roadmap
        </Link>
        , and file transcription comes later.
      </>
    ),
    chooseHush: [
      "You want AI clean-up without a subscription",
      "You want open-source code you can check",
      "You want your audio to stay on your Mac, always",
      "You dictate on an Apple Silicon Mac",
    ],
    chooseThem: [
      "You transcribe recordings and videos, not only live dictation",
      "You want to edit selected text by voice today",
      "You use Windows, an iPhone or an Intel Mac",
      "You'd rather pay once than manage an AI provider key",
    ],
    switching: [
      {
        title: "Install Hush",
        body: (
          <>
            {download}, drag it to Applications and grant Microphone and Accessibility access.
            There is no license key or account.
          </>
        ),
      },
      {
        title: "Pick a model",
        body: "Choose Fast (Parakeet V3), Live preview (Nemotron Streaming) or Most accurate (Granite Speech 4.1), or a Whisper model from the full list. Each downloads once and runs on your Mac.",
      },
      {
        title: "Turn your modes into styles",
        body: "Hush has five styles (Default, Message, Email, Code and Raw) that you assign per app, so Slack, Mail and your code editor each get the right one.",
      },
      {
        title: "Bring your words across",
        body: "Hush has no importer, so add your vocabulary as custom words and recreate your snippets in Hush's settings. If both apps use the same shortcut, quit Superwhisper or change one of the keys.",
      },
    ],
    faqs: [
      {
        question: "Is there a free alternative to Superwhisper?",
        text: "Yes. Superwhisper's free version covers local dictation without AI clean-up. Hush is free with everything included, AI clean-up and per-app styles too, and it's open source under the MIT license. It runs on Apple Silicon Macs.",
        answer: (
          <>
            Yes. Superwhisper&apos;s free version covers local dictation without AI clean-up. Hush is
            free with everything included, AI clean-up and per-app styles too, and it&apos;s open
            source under the MIT license. It runs on Apple Silicon Macs.
          </>
        ),
      },
      {
        question: "Does Hush work offline like Superwhisper?",
        text: "Yes. Both can recognize speech on your Mac. Hush works offline once a model is downloaded; only AI clean-up with a cloud provider needs a connection, and Apple Intelligence or a local server such as Ollama keeps clean-up on your Mac too.",
        answer: (
          <>
            Yes. Both can recognize speech on your Mac. Hush works offline once a model is
            downloaded; only AI clean-up with a cloud provider needs a connection, and Apple
            Intelligence or a local server such as Ollama keeps clean-up on your Mac too.
          </>
        ),
      },
      {
        question: "Can Hush transcribe audio files like Superwhisper?",
        text: "Not yet. File transcription is on the Hush roadmap for later. Today Hush is for live dictation into any app.",
        answer: (
          <>
            Not yet. File transcription is on the{" "}
            <Link href="/roadmap" className="link">
              Hush roadmap
            </Link>{" "}
            for later. Today Hush is for live dictation into any app.
          </>
        ),
      },
    ],
  },

  altVoiceInk: {
    key: "altVoiceInk",
    app: "voiceink",
    name: "VoiceInk",
    title: (
      <>
        A VoiceInk alternative <span className="text-accent">that&apos;s free to download.</span>
      </>
    ),
    lead: "VoiceInk and Hush are both open-source, on-device dictation apps for Apple Silicon Macs. VoiceInk's ready-made app costs $25 for one Mac after a 7-day trial, or nothing if you build it yourself from the GPL source. Hush's download is free, MIT licensed and needs no license key. VoiceInk does more today, including file transcription, screen context and an iPhone app.",
    reasons: [
      {
        title: "A license for each Mac",
        body: "VoiceInk costs $25 for one Mac, $39 for two and $49 for three. Hush is free on every Mac you own, with no trial and no license key.",
      },
      {
        title: "MIT instead of GPL",
        body: "Both are open source. Hush's MIT license lets you reuse the code anywhere, including closed-source projects; VoiceInk's GPL-3.0 requires distributed derivative work to stay GPL.",
      },
      {
        title: "Live preview from a local model",
        body: "Hush's Live preview model streams your words into view while you talk, on your Mac. VoiceInk's docs say real-time text needs a streaming model and doesn't work with local Whisper.",
      },
    ],
    rows: [
      "price",
      "free-tier",
      "open-source",
      "account",
      "on-device",
      "offline",
      "telemetry",
      "live-preview",
      "ai-cleanup",
      "byok",
      "on-device-ai",
      "self-correction",
      "per-app-styles",
      "snippets",
      "edit-selection",
      "context",
      "learns",
      "file-transcription",
      "mac-intel",
      "ios",
    ],
    hushAhead: (
      <>
        The ready-to-run app is free on every Mac, with no trial or license key. The MIT license is
        more permissive than the GPL. Live preview works with an on-device model. And the{" "}
        <Link href="/privacy" className="link">
          privacy policy
        </Link>{" "}
        states plainly that there is no telemetry; VoiceInk&apos;s doesn&apos;t say either way.
      </>
    ),
    themAhead: (
      <>
        VoiceInk does more today. It edits selected text, uses your clipboard and on-screen text as
        context, learns new words automatically, transcribes audio files, and has an iPhone app.
        Voice editing, context and a learning dictionary are next on the{" "}
        <Link href="/roadmap" className="link">
          Hush roadmap
        </Link>
        , and file transcription comes later.
      </>
    ),
    chooseHush: [
      "You want a free, ready-to-run download with no license key",
      "You prefer the MIT license",
      "You want live preview from an on-device model",
    ],
    chooseThem: [
      "You want screen and clipboard context or voice editing today",
      "You transcribe audio files as well as live dictation",
      "You want an iPhone app too",
    ],
    switching: [
      {
        title: "Install Hush",
        body: (
          <>
            {download}, drag it to Applications and grant Microphone and Accessibility access. If
            VoiceInk uses the same shortcut, quit it or change one of the keys.
          </>
        ),
      },
      {
        title: "Keep your local AI setup",
        body: "If you use Ollama for clean-up in VoiceInk, point Hush at the same server: AI clean-up works with any OpenAI-compatible endpoint. Apple Intelligence works too, on supported Macs.",
      },
      {
        title: "Bring your words across",
        body: "Hush has no importer. Add your vocabulary as custom words, and turn word replacements that expand text into Hush snippets.",
      },
    ],
    faqs: [
      {
        question: "Is VoiceInk free?",
        text: "VoiceInk's source code is free under the GPL-3.0 license, so you can build it yourself. The ready-made app has a 7-day trial and then costs $25 for one Mac. Hush's ready-made app is free.",
        answer: (
          <>
            VoiceInk&apos;s source code is free under the GPL-3.0 license, so you can build it
            yourself. The ready-made app has a 7-day trial and then costs $25 for one Mac.
            Hush&apos;s ready-made app is free.
          </>
        ),
      },
      {
        question: "Is Hush open source like VoiceInk?",
        text: "Yes. Hush is open source under the MIT license; VoiceInk uses GPL-3.0. Both let you read, build and change the code. MIT also lets you reuse it in closed-source projects.",
        answer: (
          <>
            Yes. Hush is open source under the MIT license; VoiceInk uses GPL-3.0. Both let you read,
            build and change the code. MIT also lets you reuse it in closed-source projects.
          </>
        ),
      },
      {
        question: "Can I use Ollama with Hush, like in VoiceInk?",
        text: "Yes. Hush's AI clean-up works with any OpenAI-compatible endpoint, including a local Ollama server, so clean-up can stay on your Mac.",
        answer: (
          <>
            Yes. Hush&apos;s AI clean-up works with any OpenAI-compatible endpoint, including a local
            Ollama server, so clean-up can stay on your Mac.
          </>
        ),
      },
    ],
  },
}

export const ALTERNATIVE_ORDER: AlternativeKey[] = ["altWisprFlow", "altSuperwhisper", "altVoiceInk"]

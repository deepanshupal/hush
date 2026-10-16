import Link from "next/link"
import { GITHUB_ISSUES_URL, GITHUB_URL } from "@/lib/site"

export type FaqCategory = "basics" | "setup" | "features" | "privacy" | "compare"

/** Headings for the groups on /faq, in display order. */
export const FAQ_CATEGORIES: { id: FaqCategory; title: string }[] = [
  { id: "basics", title: "The basics" },
  { id: "setup", title: "Installing and setting up" },
  { id: "features", title: "Using Hush" },
  { id: "privacy", title: "Privacy and your data" },
  { id: "compare", title: "Hush and other dictation apps" },
]

export interface FaqItem {
  question: string
  answer: React.ReactNode
  /** Plain-text answer for FAQPage structured data and llms-full.txt. Keep it in sync with `answer`. */
  text: string
  category?: FaqCategory
}

export const faqs: FaqItem[] = [
  {
    question: "What is Hush?",
    category: "basics",
    text: "Hush is a free, open-source (MIT) dictation app for Macs with Apple Silicon. Hold a key (Fn by default), speak, and let go: Hush types clean, punctuated text into whatever app your cursor is in. Speech recognition runs on your Mac, so it works offline and your audio is never uploaded.",
    answer: (
      <>
        Hush is a free, open-source (MIT) dictation app for Macs with Apple Silicon. Hold a key (
        <kbd className="kbd">Fn</kbd> by default), speak, and let go: Hush types clean, punctuated
        text into whatever app your cursor is in. Speech recognition runs on your Mac, so it works
        offline and your audio is never uploaded.
      </>
    ),
  },
  {
    question: "Is Hush really free?",
    category: "basics",
    text: "Yes. Hush is free forever and open source under the MIT license. There is no time limit, no paid tier, no account and no payment of any kind.",
    answer: (
      <>
        Yes. Hush is free forever and open source under the MIT license. There is no time limit, no paid
        tier, no account and no payment of any kind.
      </>
    ),
  },
  {
    question: "So what's the catch?",
    category: "basics",
    text: "There isn't one. Hush runs on your own Mac, so there are no servers to pay for and nothing to charge you for. There are no ads and no data to sell, because Hush never sees your data. The code is public, so you can check.",
    answer: (
      <>
        There isn&apos;t one. Hush runs on your own Mac, so there are no servers to pay for and
        nothing to charge you for. There are no ads and no data to sell, because Hush never sees
        your data. The code is public, so you can check.
      </>
    ),
  },
  {
    question: "Which Macs does it run on?",
    category: "basics",
    text: "Macs with Apple Silicon (M1 or later). Intel Macs are not supported.",
    answer: <>Macs with Apple Silicon (M1 or later). Intel Macs are not supported.</>,
  },
  {
    question: "Does it work offline?",
    category: "basics",
    text: "Yes. Once you have downloaded a speech model, dictation works without an internet connection. Only AI clean-up with a cloud provider needs a connection.",
    answer: (
      <>
        Yes. Once you have downloaded a speech model, dictation works without an internet
        connection. Only AI clean-up with a cloud provider needs a connection.
      </>
    ),
  },
  {
    question: "Why does macOS warn me when I first open Hush?",
    category: "setup",
    text: "Hush builds aren't notarized by Apple, which requires a paid Apple account, so macOS asks you to confirm the first time you open the app. Go to System Settings, Privacy & Security, and click Open Anyway (on macOS 14 and earlier you can also Control-click Hush and choose Open). The source code is public, so you can also build it yourself.",
    answer: (
      <>
        Hush builds aren&apos;t notarized by Apple, which requires a paid Apple account, so macOS asks you to confirm the first time you
        open the app. Go to System Settings → Privacy &amp; Security and click{" "}
        <strong>Open Anyway</strong> (on macOS 14 and earlier you can also Control-click Hush and
        choose <strong>Open</strong>). See the{" "}
        <Link href="/download#install" className="link">
          install steps
        </Link>
        . The source code is public, so you can also build it yourself.
      </>
    ),
  },
  {
    question: "What permissions does Hush need?",
    category: "setup",
    text: "Microphone, to hear you, and Accessibility, to listen for your shortcut and paste text into the app you are using.",
    answer: (
      <>
        <strong>Microphone</strong>, to hear you, and <strong>Accessibility</strong>, to listen for
        your shortcut and paste text into the app you are using.
      </>
    ),
  },
  {
    question: "Which speech model should I pick?",
    category: "setup",
    text: "Start with Fast (Parakeet V3). It's quick, accurate in English and 24 other European languages, and about a 480 MB download. Choose Live preview (Nemotron Streaming) to watch your words appear while you talk, or Most accurate (Granite Speech 4.1) when accuracy matters more than speed. Whisper and other open models are in the full model list.",
    answer: (
      <>
        Start with <strong>Fast</strong> (Parakeet V3). It&apos;s quick, accurate in English and 24
        other European languages, and about a 480 MB download. Choose <strong>Live preview</strong>{" "}
        (Nemotron Streaming) to watch your words appear while you talk, or{" "}
        <strong>Most accurate</strong> (Granite Speech 4.1) when accuracy matters more than speed.
        Whisper and other open models are in the full model list.
      </>
    ),
  },
  {
    question: "Can I dictate without holding a key down?",
    category: "features",
    text: "Yes. Tap or double-tap your shortcut and Hush keeps listening hands-free until you tap it again. Holding the key still works as push to talk, and Esc cancels a recording.",
    answer: (
      <>
        Yes. Tap or double-tap your shortcut and Hush keeps listening hands-free until you tap it
        again. Holding the key still works as push to talk, and <kbd className="kbd">Esc</kbd>{" "}
        cancels a recording.
      </>
    ),
  },
  {
    question: "My text landed in the wrong place. Can I paste it again?",
    category: "features",
    text: "Yes. Press Ctrl+Cmd+V to paste your last dictation again, or choose it from the Hush icon in the menu bar. Recent dictations are also in your history.",
    answer: (
      <>
        Yes. Press <kbd className="kbd">Ctrl</kbd>+<kbd className="kbd">Cmd</kbd>+
        <kbd className="kbd">V</kbd> to paste your last dictation again, or choose it from the Hush
        icon in the menu bar. Recent dictations are also in your history.
      </>
    ),
  },
  {
    question: "Does Hush pause my music while I dictate?",
    category: "features",
    text: "Yes. Music and videos pause while Hush is listening and carry on when you stop, and Hush only resumes what it paused. You can choose to lower the volume or mute instead, or leave audio alone.",
    answer: (
      <>
        Yes. Music and videos pause while Hush is listening and carry on when you stop, and Hush
        only resumes what it paused. You can choose to lower the volume or mute instead, or leave
        audio alone.
      </>
    ),
  },
  {
    question: "Which languages can I dictate in?",
    category: "features",
    text: "It depends on the model. Fast (Parakeet V3), the default, covers English and 24 other European languages. Whisper models cover 99 languages, and other models in the list add Chinese, Japanese, Korean and more. The app's interface is available in 26 languages.",
    answer: (
      <>
        It depends on the model. Fast (Parakeet V3), the default, covers English and 24 other
        European languages. Whisper models cover 99 languages, and other models in the list add
        Chinese, Japanese, Korean and more. The app&apos;s interface is available in 26 languages.
      </>
    ),
  },
  {
    question: "What does AI clean-up do, and is it required?",
    category: "features",
    text: "It is optional. When enabled, Hush sends the transcribed text (never audio) to a provider you choose, such as Groq, OpenAI, Anthropic, OpenRouter, Cerebras or any OpenAI-compatible endpoint, or uses Apple Intelligence on supported Macs, to fix punctuation, filler words and tone. Without it, everything stays on your Mac. With Apple Intelligence or a local server such as Ollama, clean-up stays on your Mac too.",
    answer: (
      <>
        It is optional. When enabled, Hush sends the transcribed text (never audio) to a provider
        you choose, such as Groq, OpenAI, Anthropic, OpenRouter, Cerebras or any OpenAI-compatible
        endpoint, or uses Apple Intelligence on supported Macs, to fix punctuation, filler words and
        tone. Without it, everything stays on your Mac. With Apple Intelligence or a local server
        such as Ollama, clean-up stays on your Mac too.
      </>
    ),
  },
  {
    question: "Where are my API keys stored?",
    category: "privacy",
    text: "Locally, in the Hush settings file on your Mac. They are not stored in the macOS Keychain and are never sent anywhere except to the provider they belong to.",
    answer: (
      <>
        Locally, in the Hush settings file on your Mac. They are not stored in the macOS Keychain
        and are never sent anywhere except to the provider they belong to.
      </>
    ),
  },
  {
    question: "How is Hush different from Wispr Flow?",
    category: "compare",
    text: "Hush is free and open source, and recognizes speech on your Mac. Wispr Flow is a paid monthly service that processes speech in the cloud, and it is available on more platforms.",
    answer: (
      <>
        Hush is free and open source, and recognizes speech on your Mac. Wispr Flow is a paid
        monthly service that processes speech in the cloud, and it is available on more
        platforms. See{" "}
        <Link href="/alternatives/wispr-flow" className="link">
          Hush as a Wispr Flow alternative
        </Link>{" "}
        or the{" "}
        <Link href="/compare" className="link">
          full comparison
        </Link>
        .
      </>
    ),
  },
  {
    question: "How is Hush different from Superwhisper?",
    category: "compare",
    text: "Both can recognize speech on your Mac. Hush is free and open source, and its AI clean-up and per-app styles cost nothing beyond your own provider key, or nothing at all with Apple Intelligence. Superwhisper is a paid app whose free version covers local dictation without AI clean-up, and it does more today, such as transcribing files and running on Windows and iPhone.",
    answer: (
      <>
        Both can recognize speech on your Mac. Hush is free and open source, and its AI clean-up
        and per-app styles cost nothing beyond your own provider key, or nothing at all with Apple
        Intelligence. Superwhisper is a paid app whose free version covers local dictation without
        AI clean-up, and it does more today, such as transcribing files and running on Windows and
        iPhone. See{" "}
        <Link href="/alternatives/superwhisper" className="link">
          Hush as a Superwhisper alternative
        </Link>
        .
      </>
    ),
  },
  {
    question: "How do I uninstall Hush and delete my data?",
    category: "privacy",
    text: "Quit Hush, drag it from Applications to the Trash, then delete the folder ~/Library/Application Support/com.hush.software, which holds your settings, history, recordings and models.",
    answer: (
      <>
        Quit Hush, drag it from Applications to the Trash, then delete the folder{" "}
        <code className="rounded bg-surface-muted px-1 text-small text-ink">
          ~/Library/Application Support/com.hush.software
        </code>
        , which holds your settings, history, recordings and models.
      </>
    ),
  },
  {
    question: "I found a bug or want a feature. Where do I go?",
    category: "basics",
    text: "Open an issue on GitHub. Pull requests are welcome too.",
    answer: (
      <>
        Open an issue on{" "}
        <a href={GITHUB_ISSUES_URL} className="link">
          GitHub
        </a>
        . Pull requests are welcome too; the{" "}
        <a href={GITHUB_URL} className="link">
          source code
        </a>{" "}
        is all there.
      </>
    ),
  },
]

import Link from "next/link"
import { GITHUB_ISSUES_URL, GITHUB_URL } from "@/lib/site"

export interface FaqItem {
  question: string
  answer: React.ReactNode
  /** Plain-text answer for FAQPage structured data. */
  text: string
}

export const faqs: FaqItem[] = [
  {
    question: "Is Hush really free?",
    text: "Yes. Hush is free forever and open source under the MIT license. There is no time limit, no paid tier, no account and no payment of any kind.",
    answer: (
      <>
        Yes. Hush is free forever and open source under the MIT license. There is no time limit, no paid
        tier, no account and no payment of any kind.
      </>
    ),
  },
  {
    question: "Which Macs does it run on?",
    text: "Macs with Apple Silicon (M1 or later). Intel Macs are not supported.",
    answer: <>Macs with Apple Silicon (M1 or later). Intel Macs are not supported.</>,
  },
  {
    question: "Does it work offline?",
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
    text: "Hush builds are not notarized by Apple yet, so macOS asks you to confirm the first time you open the app. Right-click Hush and choose Open, or go to System Settings, Privacy & Security, and click Open Anyway. The source code is public, so you can also build it yourself.",
    answer: (
      <>
        Hush builds are not notarized by Apple yet, so macOS asks you to confirm the first time you
        open the app. Right-click Hush and choose <strong>Open</strong>, or go to System Settings
        → Privacy &amp; Security and click <strong>Open Anyway</strong>. See the{" "}
        <Link href="/download#install" className="link">
          install steps
        </Link>
        . The source code is public, so you can also build it yourself.
      </>
    ),
  },
  {
    question: "What permissions does Hush need?",
    text: "Microphone, to hear you, and Accessibility, to listen for your shortcut and paste text into the app you are using.",
    answer: (
      <>
        <strong>Microphone</strong>, to hear you, and <strong>Accessibility</strong>, to listen for
        your shortcut and paste text into the app you are using.
      </>
    ),
  },
  {
    question: "Which languages can I dictate in?",
    text: "It depends on the model. Parakeet V3, the recommended default, covers English and 24 other European languages. Whisper models cover many more. The app interface itself is also available in many languages.",
    answer: (
      <>
        It depends on the model. Parakeet V3, the recommended default, covers English and 24 other
        European languages. Whisper models cover many more. The app interface itself is also
        available in many languages.
      </>
    ),
  },
  {
    question: "What does AI clean-up do, and is it required?",
    text: "It is optional. When enabled, Hush sends the transcribed text (never audio) to a provider you choose, such as Groq, OpenAI, Anthropic, OpenRouter, Cerebras or any OpenAI-compatible endpoint, or uses Apple Intelligence on supported Macs, to fix punctuation, filler words and tone. Without it, everything stays on your Mac.",
    answer: (
      <>
        It is optional. When enabled, Hush sends the transcribed text (never audio) to a provider
        you choose, such as Groq, OpenAI, Anthropic, OpenRouter, Cerebras or any OpenAI-compatible
        endpoint, or uses Apple Intelligence on supported Macs, to fix punctuation, filler words and
        tone. Without it, everything stays on your Mac.
      </>
    ),
  },
  {
    question: "Where are my API keys stored?",
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
    text: "Hush is free and open source, and recognizes speech on your Mac. Wispr Flow is a paid monthly service that processes speech in the cloud, and it is available on more platforms.",
    answer: (
      <>
        Hush is free and open source, and recognizes speech on your Mac. Wispr Flow is a paid
        monthly service that processes speech in the cloud, and it is available on more
        platforms. See the{" "}
        <Link href="/#compare" className="link">
          comparison
        </Link>
        .
      </>
    ),
  },
  {
    question: "How do I uninstall Hush and delete my data?",
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

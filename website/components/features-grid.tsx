import {
  BookIcon,
  ChatIcon,
  CommandIcon,
  CpuIcon,
  InboxIcon,
  SparklesIcon,
  TagIcon,
  WandIcon,
} from "@/components/icons/feature-icons"
import { Section, SectionHeading } from "@/components/section"

const features = [
  {
    title: "Speech recognition on your Mac",
    description:
      "Parakeet V3 by default, or Whisper, Moonshine, Canary, SenseVoice, GigaAM and more. Models download once on first use, then run locally.",
    icon: CpuIcon,
  },
  {
    title: "Push to talk, in any app",
    description:
      "Hold Fn (or a shortcut you choose), speak, release. The text is pasted wherever your cursor is: mail, chat, docs, the terminal.",
    icon: CommandIcon,
  },
  {
    title: "Live preview",
    description: "See your words appear while you are still talking, so you know it heard you right.",
    icon: ChatIcon,
  },
  {
    title: "Per-app styles",
    description:
      "Default, Message, Email, Code or Raw. Hush writes a quick reply in Slack differently from an email in Mail.",
    icon: WandIcon,
  },
  {
    title: "Voice snippets",
    description:
      "Say a short trigger and get a longer block of text back: your address, a sign-off, a meeting link.",
    icon: TagIcon,
  },
  {
    title: "Custom words",
    description: "Teach Hush the names, jargon and product terms it should always spell correctly.",
    icon: BookIcon,
  },
  {
    title: "AI clean-up, if you want it",
    description:
      "Optional. Use Apple Intelligence on supported Macs, or your own key for Groq, OpenAI, Anthropic, OpenRouter, Cerebras or any OpenAI-compatible endpoint.",
    icon: SparklesIcon,
  },
  {
    title: "Local history",
    description:
      "Everything you dictate is kept on your Mac. Optionally keep the recordings too, for as long as you choose.",
    icon: InboxIcon,
  },
]

export function FeaturesGrid() {
  return (
    <Section id="features" aria-labelledby="features-title">
      <SectionHeading
        id="features-title"
        eyebrow="Features"
        title="Everything you need to stop typing"
        lead="The essentials of a paid dictation app, without the price tag. The interface is available in many languages."
      />
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2">
        {features.map(({ title, description, icon: Icon }) => (
          <li key={title} className="flex gap-4 bg-surface p-6">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-panel bg-accent-soft text-accent">
              <Icon className="size-4" />
            </span>
            <div className="flex flex-col gap-1">
              <h3>{title}</h3>
              <p className="text-small text-ink-muted">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

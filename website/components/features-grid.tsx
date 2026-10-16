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
      "Pick Fast (Parakeet V3), Live preview (Nemotron Streaming) or Most accurate (Granite Speech 4.1), or Whisper and other open models. Each downloads once and runs on your Mac's GPU, offline.",
    icon: CpuIcon,
  },
  {
    title: "Hold to talk, or tap and go hands-free",
    description:
      "Hold Fn while you speak, or tap or double-tap it and keep talking until you tap again. Text lands wherever your cursor is: mail, chat, docs, the terminal.",
    icon: CommandIcon,
  },
  {
    title: "Live preview",
    description:
      "With the Live preview model, your words appear while you are still talking, so you know it heard you before you let go.",
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
      "Drops the ums, fixes punctuation, and keeps only what you meant after \"no wait\". Use Apple Intelligence on supported Macs, or your own key for Groq, OpenAI, Anthropic and more.",
    icon: SparklesIcon,
  },
  {
    title: "Your music pauses while you talk",
    description:
      "Music and videos pause while Hush listens and carry on when you stop. Or lower the volume, mute, or leave it alone.",
    icon: ChatIcon,
  },
  {
    title: "Paste it again",
    description:
      "Dictated into the wrong window? Ctrl+Cmd+V pastes your last transcript again, and it's in the menu bar too.",
    icon: CommandIcon,
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
        lead="What other dictation apps charge every month for, free and on your own Mac. Whisper models understand 99 languages, and the app itself comes in 26."
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

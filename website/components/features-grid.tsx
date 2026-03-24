import { FeatureCard } from "@/components/feature-card"
import {
  BoltIcon,
  SparklesIcon,
  LockIcon,
  CommandIcon,
  ChatIcon,
} from "@/components/icons/feature-icons"

const features = [
  {
    title: "Press Fn to record",
    description:
      "Hold the Fn key and speak. Release to transcribe. Text appears wherever your cursor is.",
    icon: <CommandIcon className="size-4" />,
    delay: 0,
  },
  {
    title: "Voice Snippets",
    description:
      "Save frequently used phrases and transcriptions as reusable snippets you can paste anywhere.",
    icon: <BoltIcon className="size-4" />,
    delay: 0.1,
  },
  {
    title: "Transcription History",
    description:
      "Browse and search everything you've ever dictated. Copy, edit, or reuse past transcriptions.",
    icon: <SparklesIcon className="size-4" />,
    delay: 0.2,
  },
  {
    title: "AI Polish (BYOK Groq)",
    description:
      "Clean up grammar, fix punctuation, and polish your transcriptions with AI. Bring your own Groq key.",
    icon: <ChatIcon className="size-4" />,
    delay: 0.3,
  },
  {
    title: "Per-App Tone",
    description:
      "Set different writing tones for different apps. Casual in Slack, formal in Mail — automatically.",
    icon: <LockIcon className="size-4" />,
    delay: 0.4,
  },
]

export function FeaturesGrid() {
  return (
    <div className="w-full mx-auto z-10">
      <div className="w-full z-1 mx-auto animate-fade-in relative">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

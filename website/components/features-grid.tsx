import { FeatureCard } from "@/components/feature-card"
import {
  LockIcon,
  CommandIcon,
  ChatIcon,
} from "@/components/icons/feature-icons"

const features = [
  {
    title: "One key. Literally.",
    description:
      "Hold Fn. Say what you want. Let go. Your words appear exactly where your cursor is. Every app. Every text field. Zero friction.",
    icon: <CommandIcon className="size-4" />,
    delay: 0,
  },
  {
    title: "Nobody gets your audio. Nobody.",
    description:
      "Not a server. Not a company. Not Hush. It stays on your Mac completely. That is not something most tools can say.",
    icon: <LockIcon className="size-4" />,
    delay: 0.1,
  },
  {
    title: "AI that fixes your rambling.",
    description:
      "You talk fast. You repeat yourself. Hush cleans it up automatically using Groq with your own API key. No middlemen. No markups.",
    icon: <ChatIcon className="size-4" />,
    delay: 0.2,
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

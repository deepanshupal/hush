import Link from "next/link"
import { CheckIcon } from "@/components/icons/ui-icons"
import { Section, SectionHeading } from "@/components/section"

const staysOnMac = [
  "Your voice. Audio is recognized on your Mac and never uploaded.",
  "Your transcription history, and recordings if you choose to keep them.",
  "Your settings, custom words, snippets and API keys.",
]

const leavesOnlyIfYouChoose = [
  {
    title: "Text for AI clean-up",
    body: "Only if you turn on AI clean-up with a cloud provider. The transcribed text (never the audio) goes to the provider you picked, under your own API key.",
  },
  {
    title: "Model downloads",
    body: "When you pick a speech model, Hush downloads it once from Hugging Face or GitHub. After that it runs offline.",
  },
]

export function PrivacySection() {
  return (
    <Section id="privacy" aria-labelledby="privacy-title">
      <SectionHeading
        id="privacy-title"
        eyebrow="Privacy"
        title="What leaves your Mac"
        lead="Short answer: nothing you didn't ask for. No account, no analytics, no telemetry. Here is the long answer."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-panel border border-line bg-surface-raised p-6">
          <h3 className="mb-3">Stays on your Mac</h3>
          <ul className="flex flex-col gap-2.5">
            {staysOnMac.map((item) => (
              <li key={item} className="flex gap-2.5 text-small text-ink-muted">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-panel border border-line p-6">
          <h3 className="mb-3">Leaves only if you choose</h3>
          <dl className="flex flex-col gap-3">
            {leavesOnlyIfYouChoose.map((item) => (
              <div key={item.title}>
                <dt className="text-small font-semibold text-ink">{item.title}</dt>
                <dd className="text-small text-ink-muted">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className="mt-6 text-small text-ink-muted">
        The code is public, so you don&apos;t have to take our word for it.{" "}
        <Link href="/privacy" className="link">
          Read the privacy policy
        </Link>
        .
      </p>
    </Section>
  )
}

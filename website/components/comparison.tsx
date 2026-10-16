import Link from "next/link"
import { Section, SectionHeading } from "@/components/section"
import { VersusTable } from "@/components/versus-table"
import { CHECKED, type AppId } from "@/lib/comparison-data"

// A subset of the full comparison on /compare. All values live in lib/comparison-data.ts;
// details show as tooltips on the cells.
const HOME_APPS: AppId[] = ["hush", "wispr", "superwhisper"]
const HOME_ROWS = ["price", "on-device", "open-source", "ai-cleanup"]

export function Comparison() {
  return (
    <Section id="compare" aria-labelledby="compare-title">
      <SectionHeading
        id="compare-title"
        eyebrow="Compare"
        title="A free, open-source alternative to Wispr Flow"
        lead="Wispr Flow and Superwhisper are good products. If you would rather not pay every month, or you want your speech recognized on your own machine, Hush is for you."
      />
      <VersusTable appIds={HOME_APPS} rowIds={HOME_ROWS} />
      <p className="mt-4 text-caption text-ink-subtle">
        Based on each product&apos;s website, {CHECKED}. They also offer things Hush doesn&apos;t,
        such as iPhone apps.
      </p>
      <p className="mt-4 text-small">
        <Link href="/compare" className="link font-medium">
          See the full comparison
        </Link>{" "}
        <span className="text-ink-muted">with VoiceInk, OpenWhispr, Spokenly, Willow and Apple Dictation.</span>
      </p>
      <p className="mt-2 text-small text-ink-muted">
        Switching from a paid app? Read about Hush as a{" "}
        <Link href="/alternatives/wispr-flow" className="link">
          Wispr Flow alternative
        </Link>{" "}
        or a{" "}
        <Link href="/alternatives/superwhisper" className="link">
          Superwhisper alternative
        </Link>
        .
      </p>
    </Section>
  )
}

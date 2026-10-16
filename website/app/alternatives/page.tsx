import type { Metadata } from "next"
import Link from "next/link"
import { CTASection } from "@/components/cta-section"
import { JsonLd } from "@/components/json-ld"
import { MainContainer } from "@/components/main-container"
import { PageHeader, Section, SectionHeading } from "@/components/section"
import { ALTERNATIVE_ORDER, ALTERNATIVES } from "@/lib/alternatives"
import { getRow } from "@/lib/comparison-data"
import { getLatestDownload } from "@/lib/github"
import { pageMetadata } from "@/lib/metadata"
import { PAGES } from "@/lib/pages"
import { breadcrumbJsonLd } from "@/lib/structured-data"

export const revalidate = 3600

export const metadata: Metadata = pageMetadata("alternatives")

export default async function AlternativesPage() {
  const download = await getLatestDownload()
  const price = getRow("price")

  return (
    <MainContainer>
      <JsonLd data={breadcrumbJsonLd("alternatives")} />
      <PageHeader
        eyebrow="Alternatives"
        title={
          <>
            Switching dictation apps? <span className="text-accent">Start here.</span>
          </>
        }
        lead="Honest comparisons between Hush, the free and open-source dictation app for Mac, and the apps people most often switch from. Each one says what Hush does better and what it doesn't do yet."
      />

      <Section aria-labelledby="apps-title">
        <SectionHeading id="apps-title" eyebrow="Pick your app" title="Which app are you using now?" />
        <ul className="grid gap-4 sm:grid-cols-3">
          {ALTERNATIVE_ORDER.map((key) => {
            const alt = ALTERNATIVES[key]
            const page = PAGES[key]
            return (
              <li key={key} className="flex flex-col gap-2 rounded-panel border border-line p-5">
                <h3>{alt.name}</h3>
                <p className="text-caption text-ink-subtle">
                  {price.cells[alt.app].value} · Hush is free
                </p>
                <p className="flex-1 text-small text-ink-muted">{alt.reasons[0].body}</p>
                <Link href={page.path} className="link text-small font-medium">
                  Hush vs {alt.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section aria-labelledby="more-title">
        <SectionHeading
          id="more-title"
          eyebrow="Everything else"
          title="Comparing more apps?"
          lead="OpenWhispr, Spokenly, Willow and Apple Dictation are in the full comparison table, side by side with Hush, Wispr Flow, Superwhisper and VoiceInk."
        />
        <p className="text-small">
          <Link href="/compare" className="link font-medium">
            See the full comparison
          </Link>
        </p>
      </Section>

      <CTASection download={download} />
    </MainContainer>
  )
}

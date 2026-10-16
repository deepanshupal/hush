import Link from "next/link"
import { CTASection } from "@/components/cta-section"
import { FaqList } from "@/components/faq"
import { AppleIcon } from "@/components/icons/apple-icon"
import { CheckIcon } from "@/components/icons/ui-icons"
import { JsonLd } from "@/components/json-ld"
import { MainContainer } from "@/components/main-container"
import { PageHeader, Section, SectionHeading } from "@/components/section"
import { Button } from "@/components/ui/button"
import { VersusTable } from "@/components/versus-table"
import { ALTERNATIVE_ORDER, ALTERNATIVES, type AlternativeKey } from "@/lib/alternatives"
import { CHECKED } from "@/lib/comparison-data"
import { getLatestDownload } from "@/lib/github"
import { PAGES } from "@/lib/pages"
import { GITHUB_ISSUES_URL } from "@/lib/site"
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data"

/**
 * "Hush as an alternative to X" page, built from lib/alternatives.tsx and the
 * comparison data. Sections follow the competitor-page pattern: TL;DR, why people
 * look, side by side, where each is ahead, who should pick which, switching, FAQ.
 */
export async function AlternativePage({ id }: { id: AlternativeKey }) {
  const alt = ALTERNATIVES[id]
  const download = await getLatestDownload()
  const others = ALTERNATIVE_ORDER.filter((k) => k !== id)

  return (
    <MainContainer>
      <JsonLd data={[breadcrumbJsonLd(id), faqJsonLd(alt.faqs)]} />
      <PageHeader eyebrow={`${alt.name} alternative`} title={alt.title} lead={alt.lead}>
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Button href={download.url} size="lg">
            <AppleIcon />
            Download for Mac
          </Button>
          <Button href="#side-by-side" variant="ghost" size="lg">
            See the differences
          </Button>
        </div>
        <p className="text-caption text-ink-subtle">Free and open source · Apple Silicon Macs · No account</p>
      </PageHeader>

      <Section aria-labelledby="reasons-title">
        <SectionHeading id="reasons-title" eyebrow="Why switch" title={`Why people look for a ${alt.name} alternative`} />
        <ol className="grid gap-8 sm:grid-cols-3">
          {alt.reasons.map((reason, i) => (
            <li key={reason.title} className="flex flex-col gap-2">
              <span className="font-serif text-h2 leading-none text-accent">{i + 1}</span>
              <h3>{reason.title}</h3>
              <p className="text-small text-ink-muted">{reason.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="side-by-side" aria-labelledby="side-by-side-title" className="scroll-mt-4">
        <SectionHeading
          id="side-by-side-title"
          eyebrow="Side by side"
          title={`Hush vs ${alt.name}`}
          lead="Feature by feature, including what Hush doesn't do yet. Hover or tap a cell for details."
        />
        <VersusTable appIds={["hush", alt.app]} rowIds={alt.rows} showDescriptions />
        <p className="mt-4 text-caption text-ink-subtle">
          {alt.name} details come from its own website, docs and terms, checked {CHECKED}. Spotted
          something wrong?{" "}
          <a href={GITHUB_ISSUES_URL} className="link">
            Open an issue
          </a>
          .
        </p>
      </Section>

      <Section aria-labelledby="ahead-title">
        <SectionHeading id="ahead-title" eyebrow="Honestly" title="Where each one is ahead" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-panel border border-line bg-surface-raised p-6">
            <h3 className="mb-2">Where Hush is ahead</h3>
            <p className="text-small text-ink-muted">{alt.hushAhead}</p>
          </div>
          <div className="rounded-panel border border-line p-6">
            <h3 className="mb-2">Where {alt.name} is ahead</h3>
            <p className="text-small text-ink-muted">{alt.themAhead}</p>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="fit-title">
        <SectionHeading id="fit-title" eyebrow="Fit" title="Which one is right for you?" />
        <div className="grid gap-4 sm:grid-cols-2">
          <FitList title="Choose Hush if" items={alt.chooseHush} highlight />
          <FitList title={`Stay with ${alt.name} if`} items={alt.chooseThem} />
        </div>
      </Section>

      <Section aria-labelledby="switching-title">
        <SectionHeading id="switching-title" eyebrow="Switching" title={`Switching from ${alt.name}`} />
        <ol className="flex flex-col gap-6">
          {alt.switching.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-control bg-accent text-small font-semibold text-accent-ink"
              >
                {i + 1}
              </span>
              <div className="flex flex-col gap-1 pt-1">
                <h3>{step.title}</h3>
                <p className="text-small text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section aria-labelledby="alt-faq-title">
        <SectionHeading id="alt-faq-title" eyebrow="FAQ" title={`Hush and ${alt.name}: questions`} />
        <FaqList items={alt.faqs} />
        <p className="mt-6 text-small text-ink-muted">
          Comparing more apps? See the{" "}
          <Link href="/compare" className="link">
            full comparison
          </Link>{" "}
          with OpenWhispr, Spokenly, Willow and Apple Dictation, or read Hush as a{" "}
          {others.map((k, i) => (
            <span key={k}>
              {i > 0 && " or a "}
              <Link href={PAGES[k].path} className="link">
                {PAGES[k].name}
              </Link>
            </span>
          ))}
          .
        </p>
      </Section>

      <CTASection download={download} />
    </MainContainer>
  )
}

function FitList({ title, items, highlight = false }: { title: string; items: string[]; highlight?: boolean }) {
  return (
    <div className={`rounded-panel border border-line p-6${highlight ? " bg-surface-raised" : ""}`}>
      <h3 className="mb-3">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-small text-ink-muted">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

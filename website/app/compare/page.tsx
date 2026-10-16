import type { Metadata } from "next"
import Link from "next/link"
import { ComparisonTable } from "@/components/comparison-table"
import { CTASection } from "@/components/cta-section"
import { FaqList } from "@/components/faq"
import { CpuIcon, SparklesIcon, TagIcon } from "@/components/icons/feature-icons"
import { MainContainer } from "@/components/main-container"
import { PageHeader, Section, SectionHeading } from "@/components/section"
import { Button } from "@/components/ui/button"
import { AppleIcon } from "@/components/icons/apple-icon"
import { CHECKED } from "@/lib/comparison-data"
import { faqs } from "@/lib/faq"
import { getLatestDownload } from "@/lib/github"
import { pageMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import { GITHUB_ISSUES_URL } from "@/lib/site"

export const revalidate = 3600

export const metadata: Metadata = pageMetadata("compare")

const pillars = [
  {
    title: "Free",
    icon: TagIcon,
    body: "No subscription, no word limit, no trial. Every feature is in the free download.",
  },
  {
    title: "Private",
    icon: CpuIcon,
    body: "Speech is recognized on your Mac. Your audio is never uploaded, and there is no telemetry.",
  },
  {
    title: "Open",
    icon: SparklesIcon,
    body: "MIT licensed. Read the code, build it yourself, or help improve it.",
  },
]

const reasons = [
  {
    title: "The subscription adds up",
    body: "Paid dictation apps cost up to $180 a year. Hush has no paid tier, so there is nothing to upgrade to and no word limit to run into.",
  },
  {
    title: "You'd rather your voice stayed home",
    body: "Hush recognizes speech on your Mac and works offline. AI clean-up is optional, and when it's on, only the text goes to the provider you picked.",
  },
  {
    title: "You want to see how it works",
    body: "Every line that touches your voice is on GitHub. To be fair, some paid apps do more today, such as iPhone apps and editing text by voice. Editing by voice is on our roadmap.",
  },
]

const FAQ_QUESTIONS = [
  "How is Hush different from Wispr Flow?",
  "So what's the catch?",
  "Does it work offline?",
]

export default async function ComparePage() {
  const download = await getLatestDownload()
  const compareFaqs = FAQ_QUESTIONS.map((q) => faqs.find((f) => f.question === q)).filter(
    (f): f is (typeof faqs)[number] => Boolean(f),
  )

  return (
    <MainContainer>
      <JsonLd data={breadcrumbJsonLd("compare")} />
      <PageHeader
        eyebrow="Compare"
        title={
          <>
            Everything you want from Wispr Flow. <span className="text-accent">Free.</span>
          </>
        }
        lead="Hush is free, recognizes your speech on your own Mac and is open source. Here is how it stacks up against Wispr Flow, Superwhisper and the rest, including what it doesn't do yet."
      >
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Button href={download.url} size="lg">
            <AppleIcon />
            Download for Mac
          </Button>
          <Button href="#table" variant="ghost" size="lg">
            See the comparison
          </Button>
        </div>
      </PageHeader>

      <Section aria-label="Why Hush" className="border-t-0 pt-0">
        <ul className="grid gap-4 sm:grid-cols-3">
          {pillars.map(({ title, icon: Icon, body }) => (
            <li key={title} className="rounded-panel border border-line bg-surface-raised p-5">
              <span className="mb-3 inline-flex size-9 items-center justify-center rounded-panel bg-accent-soft text-accent">
                <Icon className="size-5" />
              </span>
              <h3>{title}</h3>
              <p className="mt-1 text-small text-ink-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="table" aria-labelledby="table-title" className="scroll-mt-4">
        <SectionHeading
          id="table-title"
          eyebrow="Side by side"
          title="How Hush compares"
          lead="Feature by feature, with the gaps left in."
        />
        <ComparisonTable />
        <p className="mt-6 text-caption text-ink-subtle">
          Based on each product&apos;s website, {CHECKED}. Spotted something wrong?{" "}
          <a href={GITHUB_ISSUES_URL} className="link">
            Open an issue
          </a>
          .
        </p>
      </Section>

      <Section aria-labelledby="switch-title">
        <SectionHeading id="switch-title" eyebrow="Switching" title="Why people switch to Hush" />
        <ol className="grid gap-8 sm:grid-cols-3">
          {reasons.map((reason, i) => (
            <li key={reason.title} className="flex flex-col gap-2">
              <span className="font-serif text-h2 leading-none text-accent">{i + 1}</span>
              <h3>{reason.title}</h3>
              <p className="text-small text-ink-muted">{reason.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-small text-ink-muted">
          See what&apos;s coming on the{" "}
          <Link href="/roadmap" className="link">
            public roadmap
          </Link>
          .
        </p>
      </Section>

      <Section aria-labelledby="compare-faq-title">
        <SectionHeading id="compare-faq-title" eyebrow="FAQ" title="Good questions" />
        <FaqList items={compareFaqs} />
        <p className="mt-6 text-small">
          <Link href="/faq" className="link">
            See all questions
          </Link>
        </p>
      </Section>

      <CTASection download={download} />
    </MainContainer>
  )
}

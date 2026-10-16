import type { Metadata } from "next"
import Link from "next/link"
import { ComparisonNotes, ComparisonTable } from "@/components/comparison-table"
import { GitHubIcon } from "@/components/icons/ui-icons"
import { AppleIcon } from "@/components/icons/apple-icon"
import { MainContainer } from "@/components/main-container"
import { PageHeader, Section, SectionHeading } from "@/components/section"
import { Button } from "@/components/ui/button"
import { CHECKED, apps, getSources } from "@/lib/comparison-data"
import { pageMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import { GITHUB_NEW_ISSUE_URL, GITHUB_URL } from "@/lib/site"

const TITLE = "Hush vs Wispr Flow, Superwhisper and more"

export const metadata: Metadata = pageMetadata("compare")

export default function ComparePage() {
  const sources = getSources()

  return (
    <MainContainer>
      <JsonLd data={breadcrumbJsonLd("compare")} />
      <PageHeader
        eyebrow="Compare"
        title={TITLE}
        lead="Hush is free, recognizes your speech on your own Mac and is open source under the MIT license. Here is how it stacks up, feature by feature, including what it doesn't do yet."
      />

      <Section aria-labelledby="table-title" className="pt-10">
        <h2 id="table-title" className="sr-only">
          Feature comparison
        </h2>
        <ul className="mb-10 grid gap-4 sm:grid-cols-3">
          <li className="rounded-panel border border-line p-5">
            <h3>Free</h3>
            <p className="mt-1 text-small text-ink-muted">
              No subscription, no word limit, no trial. Every feature is in the free download.
            </p>
          </li>
          <li className="rounded-panel border border-line p-5">
            <h3>Private</h3>
            <p className="mt-1 text-small text-ink-muted">
              Speech is recognized on your Mac. Your audio is never uploaded, and there is no
              telemetry.
            </p>
          </li>
          <li className="rounded-panel border border-line p-5">
            <h3>Open</h3>
            <p className="mt-1 text-small text-ink-muted">
              MIT licensed. Read the code, build it yourself, or{" "}
              <Link href="/open-source" className="link">
                help improve it
              </Link>
              .
            </p>
          </li>
        </ul>
        <ComparisonTable />
        <p className="mt-4 text-caption text-ink-subtle">
          &ldquo;Coming soon&rdquo; marks features on the Hush roadmap that aren&apos;t in v1.0.
          Other apps were checked against their own websites, docs and repositories in {CHECKED}; a
          &ldquo;?&rdquo; means we couldn&apos;t confirm it there. Spotted a mistake?{" "}
          <a href={GITHUB_NEW_ISSUE_URL} className="link">
            Open an issue on GitHub
          </a>
          .
        </p>
      </Section>

      <Section aria-labelledby="notes-title">
        <SectionHeading id="notes-title" eyebrow="Details" title="Notes" />
        <ComparisonNotes />
      </Section>

      <Section aria-labelledby="sources-title">
        <SectionHeading
          id="sources-title"
          eyebrow="Sources"
          title={`Sources & last checked: ${CHECKED}`}
          lead="Every competitor cell comes from the product's own website, documentation, pricing page or source repository."
        />
        <details className="group rounded-panel border border-line bg-surface-raised">
          <summary className="cursor-pointer list-none px-5 py-4 text-small font-medium text-ink marker:hidden">
            Show all sources <span aria-hidden className="text-ink-subtle group-open:hidden">+</span>
          </summary>
        <div className="grid gap-6 border-t border-line px-5 py-5 sm:grid-cols-2">
          {apps.map((app) => (
            <div key={app.id}>
              <h3>{app.name}</h3>
              <ul className="mt-2 flex flex-col gap-1 text-small">
                {sources[app.id].map((url) => (
                  <li key={url} className="break-all">
                    <a href={url} className="link" rel="noopener">
                      {url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </details>
      </Section>

      <Section className="flex flex-col items-center gap-5 bg-surface-raised py-20 text-center">
        <h2>
          Try it. <span className="text-accent">It&apos;s free.</span>
        </h2>
        <p className="max-w-md text-body text-ink-muted">
          No account, no subscription, no audio leaving your Mac. If it isn&apos;t for you, you have
          lost nothing.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button href="/download" size="lg">
            <AppleIcon />
            Download for Mac
          </Button>
          <Button href={GITHUB_URL} variant="secondary" size="lg">
            <GitHubIcon />
            View on GitHub
          </Button>
        </div>
        <p className="text-caption text-ink-subtle">Apple Silicon Macs · Free and open source</p>
        <p className="max-w-md text-small text-ink-muted">
          Still have questions? Read the{" "}
          <Link href="/faq" className="link">
            Hush FAQ
          </Link>{" "}
          or see{" "}
          <Link href="/privacy" className="link">
            exactly what stays on your Mac
          </Link>
          .
        </p>
      </Section>
    </MainContainer>
  )
}

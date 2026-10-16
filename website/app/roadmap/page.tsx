import type { Metadata } from "next"
import Link from "next/link"
import { GitHubIcon } from "@/components/icons/ui-icons"
import { JsonLd } from "@/components/json-ld"
import { MainContainer } from "@/components/main-container"
import { PageHeader, Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/metadata"
import { ROADMAP_ORDER, ROADMAP_STAGES, type RoadmapStage } from "@/lib/roadmap"
import { GITHUB_ISSUES_URL } from "@/lib/site"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMetadata("roadmap")

const DOT: Record<RoadmapStage, string> = {
  "1.1": "bg-accent",
  next: "bg-ink-muted",
  later: "bg-ink-subtle/50",
}

export default function RoadmapPage() {
  return (
    <MainContainer>
      <JsonLd data={breadcrumbJsonLd("roadmap")} />
      <PageHeader
        eyebrow="Roadmap"
        title={
          <>
            What&apos;s next <span className="text-accent">for Hush.</span>
          </>
        }
        lead="Hush is built in the open, and so is the plan. Here's what is shipping soon, what comes after, and what's further out. Everything stays free."
      >
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Button href={GITHUB_ISSUES_URL} size="lg">
            <GitHubIcon />
            Suggest a feature
          </Button>
          <Button href="/changelog" variant="ghost" size="lg">
            See what&apos;s shipped
          </Button>
        </div>
      </PageHeader>

      {ROADMAP_ORDER.map((key) => {
        const stage = ROADMAP_STAGES[key]
        return (
          <Section key={key} aria-labelledby={`stage-${key}`}>
            <div className="grid gap-8 md:grid-cols-[14rem_1fr] md:gap-10">
              <div className="flex flex-col gap-3">
                <h2 id={`stage-${key}`}>{stage.title}</h2>
                <p className="text-small text-ink-muted">{stage.lead}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {stage.items.map((item) => (
                  <li
                    key={item.title}
                    className="flex gap-3 rounded-panel border border-line bg-surface-raised p-4"
                  >
                    <span aria-hidden className={cn("mt-[0.45rem] size-2 shrink-0 rounded-full", DOT[key])} />
                    <div>
                      <h3>{item.title}</h3>
                      <p className="mt-1 text-small text-ink-muted">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )
      })}

      <Section className="flex flex-col items-center gap-5 bg-surface-raised py-20 text-center">
        <h2>
          Missing something? <span className="text-accent">Tell us.</span>
        </h2>
        <p className="max-w-md text-body text-ink-muted">
          The roadmap is shaped by the people who use Hush. Open an issue on GitHub with the feature
          you want, or upvote one that&apos;s already there.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button href={GITHUB_ISSUES_URL} size="lg">
            <GitHubIcon />
            Suggest a feature
          </Button>
          <Button href="/download" variant="secondary" size="lg">
            Download Hush
          </Button>
        </div>
        <p className="max-w-md text-small text-ink-muted">
          Want to build one of these?{" "}
          <Link href="/open-source" className="link">
            Here&apos;s how to contribute
          </Link>
          .
        </p>
      </Section>
    </MainContainer>
  )
}

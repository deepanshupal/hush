import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { MainContainer } from "@/components/main-container"
import { PageHeader, Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { getReleases } from "@/lib/github"
import { RELEASES_URL } from "@/lib/site"
import { formatBytes, formatDate } from "@/lib/utils"

// Release notes come from GitHub Releases and refresh every hour.
export const revalidate = 3600

export const metadata: Metadata = pageMetadata({
  title: "Changelog",
  description:
    "Every Hush release and what changed, straight from GitHub Releases.",
  path: "/changelog",
})

export default async function ChangelogPage() {
  const releases = await getReleases()

  return (
    <MainContainer>
      <PageHeader
        eyebrow="What's new"
        title="Changelog"
        lead="What changed in each release of Hush. Pulled straight from GitHub Releases."
      />

      {releases.length === 0 ? (
        <Section className="text-center">
          <p className="text-body text-ink-muted">
            Release notes couldn&apos;t be loaded right now. They are always available on GitHub.
          </p>
          <div className="mt-6">
            <Button href={RELEASES_URL} variant="secondary">
              View releases on GitHub
            </Button>
          </div>
        </Section>
      ) : (
        releases.map((release, i) => (
          <Section key={release.tag} id={release.tag} aria-labelledby={`${release.tag}-title`}>
            <article className="flex flex-col gap-4">
              <header className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2 text-caption">
                  <span className="rounded-control bg-surface-muted px-2.5 py-0.5 font-semibold text-ink">
                    v{release.version}
                  </span>
                  {i === 0 && (
                    <span className="rounded-control bg-accent px-2.5 py-0.5 font-semibold text-accent-ink">
                      Latest
                    </span>
                  )}
                  <time dateTime={release.publishedAt} className="text-ink-subtle">
                    {formatDate(release.publishedAt)}
                  </time>
                </div>
                <h2 id={`${release.tag}-title`} className="text-h2">
                  {release.name}
                </h2>
              </header>

              {release.bodyHtml ? (
                <div
                  className="prose"
                  // Rendered and sanitized by GitHub's API (body_html).
                  dangerouslySetInnerHTML={{ __html: release.bodyHtml }}
                />
              ) : (
                <p className="text-small text-ink-muted">No release notes for this version.</p>
              )}

              <p className="flex flex-wrap gap-x-4 gap-y-1 text-small">
                <a href={release.dmg.url} className="link">
                  Download {release.dmg.name} ({formatBytes(release.dmg.size)})
                </a>
                <a href={release.url} className="link">
                  View on GitHub
                </a>
              </p>
            </article>
          </Section>
        ))
      )}
    </MainContainer>
  )
}

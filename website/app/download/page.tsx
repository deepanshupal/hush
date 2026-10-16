import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, softwareApplicationJsonLd } from "@/lib/structured-data"
import Link from "next/link"
import { AppleIcon } from "@/components/icons/apple-icon"
import { GitHubIcon } from "@/components/icons/ui-icons"
import { MainContainer } from "@/components/main-container"
import { PageHeader, Section, SectionHeading } from "@/components/section"
import { Button } from "@/components/ui/button"
import { getLatestDownload } from "@/lib/github"
import { GITHUB_URL, RELEASES_URL, SYSTEM_REQUIREMENTS } from "@/lib/site"
import { formatBytes, formatDate } from "@/lib/utils"

export const revalidate = 3600

export const metadata: Metadata = pageMetadata("download")

const steps: { title: string; body: React.ReactNode }[] = [
  {
    title: "Open the DMG and drag Hush to Applications",
    body: <>Then eject the disk image. You can delete the DMG afterwards.</>,
  },
  {
    title: "Open Hush for the first time",
    body: (
      <>
        Hush is open source but not yet notarized by Apple, so macOS asks you to confirm once. In
        Applications, <strong>right-click</strong> (or Control-click) Hush and choose{" "}
        <strong>Open</strong>, then <strong>Open</strong> again. If macOS only offers{" "}
        <em>Done</em> or <em>Move to Trash</em>, close the dialog, go to{" "}
        <strong>System Settings → Privacy &amp; Security</strong>, scroll down and click{" "}
        <strong>Open Anyway</strong>. You only need to do this once.
      </>
    ),
  },
  {
    title: "Grant two permissions",
    body: (
      <>
        <strong>Microphone</strong>, so Hush can hear you, and <strong>Accessibility</strong>, so it
        can listen for your shortcut and paste text into other apps. Hush walks you through both.
      </>
    ),
  },
  {
    title: "Pick a speech model",
    body: (
      <>
        <strong>Parakeet V3</strong> is recommended: fast and accurate in English and 24 other
        European languages. It downloads once (about 480 MB) and then runs on your Mac.
      </>
    ),
  },
  {
    title: "Hold Fn and talk",
    body: (
      <>
        Put your cursor in any text field, hold <kbd className="kbd">Fn</kbd>, speak, and let go.
        You can change the shortcut in settings.
      </>
    ),
  },
]

export default async function DownloadPage() {
  const download = await getLatestDownload()

  const meta = [
    download.version && `Version ${download.version}`,
    download.publishedAt && `Released ${formatDate(download.publishedAt)}`,
    download.size && formatBytes(download.size),
  ].filter(Boolean)

  return (
    <MainContainer>
      <JsonLd data={[softwareApplicationJsonLd(download), breadcrumbJsonLd("download")]} />
      <PageHeader
        eyebrow="Free forever · MIT license"
        title="Download Hush"
        lead="Dictation for Mac that runs on your Mac. No account, no sign-up, no payment. Just download and start talking."
      >
        <div className="mt-2 flex flex-col items-center gap-3">
          <Button href={download.url} size="lg">
            <AppleIcon />
            Download for Mac
          </Button>
          <p className="text-caption text-ink-subtle">
            {SYSTEM_REQUIREMENTS}
            {meta.length > 0 && ` · ${meta.join(" · ")}`}
          </p>
        </div>
      </PageHeader>

      <Section id="install" aria-labelledby="install-title">
        <SectionHeading id="install-title" eyebrow="Install" title="Up and running in two minutes" />
        <ol className="flex flex-col gap-6">
          {steps.map((step, i) => (
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

        <div className="mt-10 rounded-panel border border-line bg-surface-raised p-5">
          <h3>Why the extra step on first launch?</h3>
          <p className="mt-1 text-small text-ink-muted">
            Apple only skips the warning for apps signed with a paid Apple Developer certificate and
            notarized by Apple. Hush builds are signed locally (&ldquo;ad-hoc&rdquo;) instead. The
            app is the same either way, and its source code is public, so you can check exactly
            what it does or{" "}
            <Link href="/open-source#build" className="link">
              build it yourself
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section aria-labelledby="more-title">
        <SectionHeading id="more-title" eyebrow="More" title="Other ways to get Hush" />
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="flex flex-col gap-2 rounded-panel border border-line p-5">
            <h3>All releases</h3>
            <p className="flex-1 text-small text-ink-muted">
              Every version, with release notes{download.sha256 ? " and SHA-256 checksums" : ""}, on
              GitHub.
            </p>
            <a href={RELEASES_URL} className="link text-small font-medium">
              View releases
            </a>
          </li>
          <li className="flex flex-col gap-2 rounded-panel border border-line p-5">
            <h3>Build from source</h3>
            <p className="flex-1 text-small text-ink-muted">
              Clone the repository and build Hush on your own Mac.
            </p>
            <a href={GITHUB_URL} className="link text-small font-medium">
              <GitHubIcon className="mr-1 inline size-3.5 align-[-2px]" />
              DeepanshuPal/hush
            </a>
          </li>
        </ul>
        {download.sha256 && (
          <p className="mt-6 break-all text-caption text-ink-subtle">
            SHA-256 of {download.fileName}: <code className="text-ink-muted">{download.sha256}</code>
          </p>
        )}
        <p className="mt-6 text-small text-ink-muted">
          Still deciding? See{" "}
          <Link href="/compare" className="link">
            how Hush compares with Wispr Flow and Superwhisper
          </Link>
          , read the{" "}
          <Link href="/faq" className="link">
            FAQ
          </Link>
          , or check{" "}
          <Link href="/privacy" className="link">
            what Hush does with your data
          </Link>
          .
        </p>
      </Section>
    </MainContainer>
  )
}

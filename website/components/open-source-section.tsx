import Link from "next/link"
import { GitHubIcon } from "@/components/icons/ui-icons"
import { Section, SectionHeading } from "@/components/section"
import { Button } from "@/components/ui/button"
import { GITHUB_ISSUES_URL, GITHUB_URL } from "@/lib/site"

const items = [
  {
    title: "Read the code",
    body: "Every line that touches your voice is public. Audit it, fork it, learn from it.",
    href: GITHUB_URL,
    cta: "Browse the source",
  },
  {
    title: "Report an issue",
    body: "Found a bug or missing a feature? Tell us on GitHub, where everyone can follow along.",
    href: GITHUB_ISSUES_URL,
    cta: "Open an issue",
  },
  {
    title: "Contribute",
    body: "Fix a bug, add a language, improve a model integration. Pull requests are welcome.",
    href: "/open-source",
    cta: "How to contribute",
  },
]

export function OpenSourceSection() {
  return (
    <Section id="open-source" aria-labelledby="open-source-title">
      <SectionHeading
        id="open-source-title"
        eyebrow="Open source"
        title="Built in the open, MIT licensed"
        lead="No black box. Hush is a community project you can inspect, change and build yourself."
      />
      <ul className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="flex flex-col gap-2 rounded-panel border border-line p-5">
            <h3>{item.title}</h3>
            <p className="flex-1 text-small text-ink-muted">{item.body}</p>
            {item.href.startsWith("/") ? (
              <Link href={item.href} className="link text-small font-medium">
                {item.cta}
              </Link>
            ) : (
              <a href={item.href} className="link text-small font-medium">
                {item.cta}
              </a>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button href={GITHUB_URL} variant="secondary">
          <GitHubIcon />
          Star Hush on GitHub
        </Button>
      </div>
    </Section>
  )
}

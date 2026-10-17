import type { Metadata } from "next"
import Link from "next/link"
import { pageMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data"
import { FaqList } from "@/components/faq"
import { MainContainer } from "@/components/main-container"
import { PageHeader, Section, SectionHeading } from "@/components/section"
import { FAQ_CATEGORIES, faqs } from "@/lib/faq"
import { GITHUB_ISSUES_URL } from "@/lib/site"

export const metadata: Metadata = pageMetadata("faq")

export default function FaqPage() {
  return (
    <MainContainer>
      <JsonLd data={[faqJsonLd(faqs), breadcrumbJsonLd("faq")]} />
      <PageHeader
        eyebrow="Help"
        title="Questions about Hush, answered"
        lead="Everything people usually ask before and after installing Hush, the free, open-source dictation app for Mac."
      />
      {FAQ_CATEGORIES.map((category) => {
        const items = faqs.filter((f) => f.category === category.id)
        if (items.length === 0) return null
        return (
          <Section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`}>
            <SectionHeading id={`${category.id}-title`} title={category.title} />
            <FaqList items={items} />
          </Section>
        )
      })}
      <Section>
        <p className="text-small text-ink-muted">
          Ready to try it?{" "}
          <Link href="/download" className="link">
            Download Hush for Mac
          </Link>
          . Weighing your options? See{" "}
          <Link href="/compare" className="link">
            how Hush compares with Wispr Flow and Superwhisper
          </Link>{" "}
          or read the full{" "}
          <Link href="/privacy" className="link">
            privacy policy
          </Link>
          .
        </p>
        <p className="mt-2 text-small text-ink-muted">
          Something else?{" "}
          <a href={GITHUB_ISSUES_URL} className="link">
            Ask on GitHub
          </a>
          .
        </p>
      </Section>
    </MainContainer>
  )
}

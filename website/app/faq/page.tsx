import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { FaqList } from "@/components/faq"
import { MainContainer } from "@/components/main-container"
import { PageHeader, Section } from "@/components/section"
import { faqs } from "@/lib/faq"
import { GITHUB_ISSUES_URL } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about Hush: price, supported Macs, offline use, permissions, languages, AI clean-up, privacy and uninstalling.",
  path: "/faq",
})

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.text },
  })),
}

export default function FaqPage() {
  return (
    <MainContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        eyebrow="Help"
        title="Frequently asked questions"
        lead="Everything people usually ask before and after installing Hush."
      />
      <Section>
        <FaqList items={faqs} />
        <p className="mt-6 text-small text-ink-muted">
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

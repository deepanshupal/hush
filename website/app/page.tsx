import { Comparison } from "@/components/comparison"
import { CTASection } from "@/components/cta-section"
import { DictationDemo } from "@/components/dictation-demo"
import { FaqList } from "@/components/faq"
import { FeaturesGrid } from "@/components/features-grid"
import { Hero } from "@/components/hero"
import { MainContainer } from "@/components/main-container"
import { OpenSourceSection } from "@/components/open-source-section"
import { PrivacySection } from "@/components/privacy-section"
import { UseCases } from "@/components/use-cases"
import { Section, SectionHeading } from "@/components/section"
import { faqs } from "@/lib/faq"
import { getLatestDownload, getStarCount } from "@/lib/github"
import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { pageMetadata } from "@/lib/metadata"
import { faqJsonLd, softwareApplicationJsonLd } from "@/lib/structured-data"

// Refresh the download link and star count from GitHub every hour.
export const revalidate = 3600

export const metadata: Metadata = pageMetadata("home")

const HOME_FAQ_COUNT = 6

export default async function Home() {
  const [download, stars] = await Promise.all([getLatestDownload(), getStarCount()])

  const homeFaqs = faqs.slice(0, HOME_FAQ_COUNT)

  return (
    <MainContainer>
      <JsonLd data={[softwareApplicationJsonLd(download), faqJsonLd(homeFaqs)]} />
      <Hero download={download} stars={stars} />
      <DictationDemo />
      <div className="mt-14">
        <UseCases />
      </div>
      <FeaturesGrid />
      <Comparison />
      <PrivacySection />
      <Section id="faq" aria-labelledby="faq-title">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered" />
        <FaqList items={homeFaqs} />
        <p className="mt-6 text-small text-ink-muted">
          <Link href="/faq" className="link">
            See all questions
          </Link>
        </p>
      </Section>
      <OpenSourceSection />
      <CTASection download={download} />
    </MainContainer>
  )
}

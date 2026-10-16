// schema.org JSON-LD builders. Only facts that are visible on the site;
// no ratings or reviews.

import type { FaqItem } from "@/lib/faq"
import type { Download } from "@/lib/github"
import { PAGES, type PageKey } from "@/lib/pages"
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  FALLBACK_APP_VERSION,
  GITHUB_LICENSE_URL,
  GITHUB_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SYSTEM_REQUIREMENTS,
} from "@/lib/site"

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const APP_ID = `${SITE_URL}/#software`

const absolute = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`)

/** Organization + WebSite, rendered on every page from the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icons/icon-512.png`,
          width: 512,
          height: 512,
        },
        sameAs: [GITHUB_URL],
        founder: { "@type": "Person", name: AUTHOR_NAME, url: AUTHOR_URL },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: { "@id": ORG_ID },
      },
    ],
  }
}

/** The app itself, on the home and download pages. */
export function softwareApplicationJsonLd(download: Download) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Dictation",
    operatingSystem: "macOS",
    processorRequirements: "Apple Silicon (arm64)",
    softwareRequirements: SYSTEM_REQUIREMENTS,
    softwareVersion: download.version ?? FALLBACK_APP_VERSION,
    ...(download.publishedAt && { datePublished: download.publishedAt }),
    downloadUrl: download.url,
    installUrl: `${SITE_URL}/download`,
    ...(download.size && { fileSize: `${Math.round(download.size / 1e6)} MB` }),
    license: GITHUB_LICENSE_URL,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    screenshot: `${SITE_URL}/opengraph-image`,
    image: `${SITE_URL}/icons/icon-512.png`,
    author: { "@type": "Person", name: AUTHOR_NAME, url: AUTHOR_URL },
    publisher: { "@id": ORG_ID },
    codeRepository: GITHUB_URL,
  }
}

/** FAQPage for a list of questions that are visible on the page. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.text },
    })),
  }
}

/** Home > Page breadcrumb for inner pages. */
export function breadcrumbJsonLd(key: PageKey) {
  const page = PAGES[key]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absolute("/") },
      { "@type": "ListItem", position: 2, name: page.name, item: absolute(page.path) },
    ],
  }
}

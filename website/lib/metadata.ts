import type { Metadata } from "next"
import { PAGES, type PageKey } from "@/lib/pages"
import { SITE_NAME } from "@/lib/site"

/**
 * Per-page metadata: absolute title, description, canonical URL and matching
 * Open Graph / Twitter tags. (A page's openGraph object replaces the root one
 * entirely, so it is built in full here.) The og:image and twitter:image tags
 * come from each route's opengraph-image.tsx / twitter-image.tsx.
 */
export function pageMetadata(key: PageKey): Metadata {
  const { title, description, path, keywords } = PAGES[key]
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

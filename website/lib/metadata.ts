import type { Metadata } from "next"
import { SITE_NAME } from "@/lib/site"

/**
 * Per-page metadata with canonical URL and matching Open Graph / Twitter tags.
 * (A page's openGraph object replaces the root one entirely, so it is built in full here.)
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  }
}

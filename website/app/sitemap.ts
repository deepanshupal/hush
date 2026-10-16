import type { MetadataRoute } from "next"
import { getReleases } from "@/lib/github"
import { PAGES } from "@/lib/pages"
import { SITE_URL } from "@/lib/site"

// Picks up new releases (for /download and /changelog) within the hour.
export const revalidate = 3600

// Only real pages: redirects (/license, /payment, /feedback, /changelogs) are left out.
// <lastmod> is the release date for release-driven pages and the content date
// from lib/pages.ts for the rest, so it only moves when a page really changes.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [latest] = await getReleases()

  return Object.values(PAGES)
    .sort((a, b) => b.sitemap.priority - a.sitemap.priority)
    .map(({ path, sitemap: { priority, changeFrequency, lastModified } }) => ({
      url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
      lastModified:
        lastModified === "release" ? (latest ? new Date(latest.publishedAt) : undefined) : new Date(lastModified),
      changeFrequency,
      priority,
    }))
}

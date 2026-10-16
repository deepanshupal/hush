import type { MetadataRoute } from "next"
import { getReleases } from "@/lib/github"
import { LEGAL_UPDATED, PAGES } from "@/lib/pages"
import { SITE_URL } from "@/lib/site"

// Picks up new releases (for /download and /changelog) within the hour.
export const revalidate = 3600

// Only real pages: redirects (/license, /payment, /feedback, /changelogs) are left out.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [latest] = await getReleases()
  const now = new Date()
  const released = latest ? new Date(latest.publishedAt) : now

  return Object.values(PAGES)
    .sort((a, b) => b.sitemap.priority - a.sitemap.priority)
    .map(({ path, sitemap: { priority, changeFrequency, lastModified } }) => ({
      url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
      lastModified:
        lastModified === "release" ? released : lastModified === "content" ? new Date(LEGAL_UPDATED) : now,
      changeFrequency,
      priority,
    }))
}

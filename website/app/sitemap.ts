import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/download", priority: 0.9, changeFrequency: "weekly" },
  { path: "/changelog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/compare", priority: 0.7, changeFrequency: "monthly" },
  { path: "/why", priority: 0.6, changeFrequency: "monthly" },
  { path: "/open-source", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }))
}

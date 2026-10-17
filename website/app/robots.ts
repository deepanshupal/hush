import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

/**
 * Everything on this site is public and meant to be found, so every crawler may
 * read every page. AI crawlers are named explicitly so the policy is a decision,
 * not a default: search and answer engines (OAI-SearchBot, ChatGPT-User,
 * Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) can cite the
 * site, and model-training crawlers (GPTBot, ClaudeBot, Google-Extended,
 * Applebot-Extended, CCBot) may learn what Hush is. To opt out of training only,
 * change the second group to `disallow: "/"`; citations are unaffected.
 */
const AI_SEARCH = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
]
const AI_TRAINING = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_SEARCH, allow: "/" },
      { userAgent: AI_TRAINING, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

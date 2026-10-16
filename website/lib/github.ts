// Build-time data from the GitHub API, cached with ISR.
// Every function degrades gracefully: if GitHub is unreachable or rate
// limited, pages still render with fallbacks instead of failing the build.

import { DOWNLOADS_REPO, RELEASES_URL, SOURCE_REPO } from "@/lib/site"

/** How often (seconds) GitHub data is refreshed on the live site. */
export const GITHUB_REVALIDATE = 3600

const API = "https://api.github.com"

export interface ReleaseAsset {
  name: string
  url: string
  size: number
  sha256: string | null
}

export interface Release {
  version: string
  tag: string
  name: string
  url: string
  publishedAt: string
  /** Release notes rendered (and sanitized) by GitHub. */
  bodyHtml: string
  dmg: ReleaseAsset
}

export interface Download {
  /** Direct link to the DMG, or the releases page if GitHub was unreachable. */
  url: string
  version: string | null
  publishedAt: string | null
  size: number | null
  sha256: string | null
  fileName: string | null
}

/** Used when the GitHub API can't be reached at build time. */
export const FALLBACK_DOWNLOAD: Download = {
  url: `${RELEASES_URL}/latest`,
  version: null,
  publishedAt: null,
  size: null,
  sha256: null,
  fileName: null,
}

interface GitHubAsset {
  name: string
  size: number
  browser_download_url: string
  digest?: string | null
}

interface GitHubRelease {
  tag_name: string
  name: string | null
  html_url: string
  draft: boolean
  prerelease: boolean
  published_at: string | null
  body_html?: string | null
  assets: GitHubAsset[]
}

async function github<T>(path: string, accept = "application/vnd.github+json"): Promise<T | null> {
  const headers: Record<string, string> = {
    Accept: accept,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "hush-website",
  }
  // Optional: set GITHUB_TOKEN in Vercel to avoid the 60 requests/hour anonymous limit.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  try {
    const res = await fetch(`${API}${path}`, {
      headers,
      next: { revalidate: GITHUB_REVALIDATE },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

/**
 * App releases from the downloads repo, newest first.
 * The repo also hosts model mirrors (e.g. "models-v1"), so only releases that
 * ship a .dmg count as app releases.
 */
export async function getReleases(): Promise<Release[]> {
  const data = await github<GitHubRelease[]>(
    `/repos/${DOWNLOADS_REPO}/releases?per_page=100`,
    "application/vnd.github.html+json",
  )
  if (!Array.isArray(data)) return []

  return data
    .filter((r) => !r.draft && !r.prerelease && r.published_at)
    .map((r): Release | null => {
      const dmg = r.assets.find((a) => a.name.toLowerCase().endsWith(".dmg"))
      if (!dmg) return null
      return {
        version: r.tag_name.replace(/^v/, ""),
        tag: r.tag_name,
        name: r.name || r.tag_name,
        url: r.html_url,
        publishedAt: r.published_at as string,
        bodyHtml: r.body_html ?? "",
        dmg: {
          name: dmg.name,
          url: dmg.browser_download_url,
          size: dmg.size,
          sha256: dmg.digest?.startsWith("sha256:") ? dmg.digest.slice(7) : null,
        },
      }
    })
    .filter((r): r is Release => r !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

/** The latest DMG. This is the only place the download URL is decided. */
export async function getLatestDownload(): Promise<Download> {
  const [latest] = await getReleases()
  if (!latest) return FALLBACK_DOWNLOAD
  return {
    url: latest.dmg.url,
    version: latest.version,
    publishedAt: latest.publishedAt,
    size: latest.dmg.size,
    sha256: latest.dmg.sha256,
    fileName: latest.dmg.name,
  }
}

/** Star count of the source repo, or null if unavailable (e.g. repo still private). */
export async function getStarCount(): Promise<number | null> {
  const repo = await github<{ stargazers_count?: number }>(`/repos/${SOURCE_REPO}`)
  return typeof repo?.stargazers_count === "number" ? repo.stargazers_count : null
}

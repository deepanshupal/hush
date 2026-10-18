// Single source of truth for site-wide constants and links.

export const SITE_URL = "https://www.hush.software"
export const SITE_NAME = "Hush"
export const SITE_TAGLINE = "Free, private dictation for Mac"
export const SITE_POSITIONING = "The free, open-source Wispr Flow alternative"
export const SITE_DESCRIPTION =
  "Hush is a free, open-source (MIT) push-to-talk dictation app for Apple Silicon Macs, and an alternative to Wispr Flow. Hold Fn, talk, and clean, punctuated text appears in any app. Speech recognition runs on your Mac, so your voice never leaves it."

export const SOURCE_REPO = "DeepanshuPal/hush"
/** One public downloads repository for all of the owner's apps; Hush releases are tagged `hush-vX.Y.Z`. */
export const DOWNLOADS_REPO = "DeepanshuPal/downloads"
export const HUSH_TAG_PREFIX = "hush-v"

export const GITHUB_URL = `https://github.com/${SOURCE_REPO}`
export const GITHUB_ISSUES_URL = `${GITHUB_URL}/issues`
export const GITHUB_NEW_ISSUE_URL = `${GITHUB_URL}/issues/new`
export const GITHUB_LICENSE_URL = `${GITHUB_URL}/blob/main/LICENSE`
/** Hush's releases only (the repository also holds other apps). */
export const RELEASES_URL = `https://github.com/${DOWNLOADS_REPO}/releases?q=${HUSH_TAG_PREFIX}&expanded=true`

export const AUTHOR_NAME = "Deepanshu Pal"
export const AUTHOR_URL = "https://x.com/deepanshuxpal"

export const SYSTEM_REQUIREMENTS = "Mac with Apple Silicon (M1 or later)"

/** Shown when GitHub can't be reached at build time; otherwise the latest release wins. */
export const FALLBACK_APP_VERSION = "1.0.0"

/**
 * Brand colors for places that can't read CSS variables (manifest, theme-color, OG images).
 * Keep in sync with app/globals.css; scripts/check-design-tokens.mjs checks the shared ones.
 */
export const BRAND = {
  page: "#e9e2d0",
  pageDot: "#c4b9a0",
  surface: "#f1ecdf",
  surfaceMuted: "#e4dcc8",
  line: "#cfc5ae",
  ink: "#1a1410",
  inkMuted: "#5a5040",
  accent: "#8b3030",
  accentSoft: "#f0e0dc",
} as const

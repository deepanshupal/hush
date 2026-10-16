// Every indexable page in one place: search intent, title, description,
// social image copy and sitemap settings. The search intents are documented
// in docs/seo.md; keep the two in sync.
//
// Limits: title <= 60 characters, description <= 155 characters.

export type PageKey =
  | "home"
  | "compare"
  | "download"
  | "faq"
  | "why"
  | "openSource"
  | "changelog"
  | "roadmap"
  | "privacy"
  | "terms"

export interface PageSeo {
  path: string
  /** Full <title>, used as is (no template suffix). */
  title: string
  description: string
  /** Short name for breadcrumbs. */
  name: string
  keywords: string[]
  og: {
    eyebrow: string
    headline: string
    /** Rendered in the accent color after the headline. */
    accent?: string
    sub: string
    alt: string
  }
  sitemap: {
    priority: number
    changeFrequency: "weekly" | "monthly" | "yearly"
    /** "release": last modified = latest release date. "content": a fixed content date. */
    lastModified: "build" | "release" | "content"
  }
}

/** When the legal pages' text last changed (they say "Last updated: October 2026"). */
export const LEGAL_UPDATED = "2026-10-16"

export const PAGES: Record<PageKey, PageSeo> = {
  home: {
    path: "/",
    title: "Hush · Free, open-source Wispr Flow alternative for Mac",
    description:
      "Hush is a free, open-source dictation app for Mac. Hold Fn, talk, and clean text appears in any app. Speech to text runs offline, on your Mac.",
    name: "Home",
    keywords: [
      "free Wispr Flow alternative",
      "dictation app for Mac",
      "speech to text Mac offline",
      "voice typing Mac",
      "open-source dictation",
      "push to talk dictation",
      "on-device speech recognition",
    ],
    og: {
      eyebrow: "The free, open-source Wispr Flow alternative",
      headline: "Dictation that stays",
      accent: "on your Mac.",
      sub: "Free forever · Open source (MIT) · Apple Silicon",
      alt: "Hush: dictation that stays on your Mac. Free, open source, for Apple Silicon Macs.",
    },
    sitemap: { priority: 1, changeFrequency: "weekly", lastModified: "build" },
  },
  compare: {
    path: "/compare",
    title: "Wispr Flow vs Superwhisper vs Hush: Mac dictation compared",
    description:
      "Wispr Flow, Superwhisper, VoiceInk, Apple Dictation and Hush, the free open-source alternative, compared on price, privacy, offline use and AI clean-up.",
    name: "Compare",
    keywords: [
      "Wispr Flow vs Superwhisper",
      "Wispr Flow alternative",
      "Superwhisper alternative",
      "best dictation app for Mac",
      "VoiceInk alternative",
    ],
    og: {
      eyebrow: "Compare",
      headline: "Hush vs Wispr Flow, Superwhisper",
      accent: "and more",
      sub: "Price, privacy, offline use and AI clean-up, side by side",
      alt: "Hush vs Wispr Flow, Superwhisper and more: a feature-by-feature comparison of Mac dictation apps.",
    },
    sitemap: { priority: 0.8, changeFrequency: "monthly", lastModified: "build" },
  },
  download: {
    path: "/download",
    title: "Download Hush · Free dictation app for Mac",
    description:
      "Download Hush, the free, open-source dictation app for Apple Silicon Macs (M1 or later). No account, no sign-up, no payment. Up and running in two minutes.",
    name: "Download",
    keywords: ["download Hush dictation", "free dictation app download Mac", "Hush DMG"],
    og: {
      eyebrow: "Download",
      headline: "Download Hush",
      accent: "for Mac",
      sub: "Free · No account · Apple Silicon (M1 or later)",
      alt: "Download Hush for Mac: free, no account, for Apple Silicon Macs.",
    },
    sitemap: { priority: 0.9, changeFrequency: "weekly", lastModified: "release" },
  },
  faq: {
    path: "/faq",
    title: "Hush FAQ · Mac dictation questions, answered",
    description:
      "Is Hush really free? Does it work offline? Which Macs and languages? Answers about the open-source Mac dictation app, privacy, permissions and AI clean-up.",
    name: "FAQ",
    keywords: ["Hush dictation FAQ", "offline dictation Mac", "is Hush free"],
    og: {
      eyebrow: "FAQ",
      headline: "Questions about Hush,",
      accent: "answered.",
      sub: "Price, supported Macs, offline use, languages and privacy",
      alt: "Hush FAQ: questions about the free Mac dictation app, answered.",
    },
    sitemap: { priority: 0.7, changeFrequency: "monthly", lastModified: "build" },
  },
  why: {
    path: "/why",
    title: "Why Hush · Free, private, open-source dictation",
    description:
      "Why Hush is free, private and open source: your voice is personal, and dictation should run on your own Mac, not in someone else's cloud.",
    name: "Why Hush",
    keywords: ["private dictation", "on-device dictation", "dictation without the cloud"],
    og: {
      eyebrow: "Why Hush",
      headline: "Free. Private.",
      accent: "Open.",
      sub: "Your voice is personal. Dictation should run on your Mac.",
      alt: "Why Hush: free, private and open-source dictation for Mac.",
    },
    sitemap: { priority: 0.6, changeFrequency: "monthly", lastModified: "build" },
  },
  openSource: {
    path: "/open-source",
    title: "Open-source dictation app for Mac · Hush on GitHub",
    description:
      "Hush is MIT-licensed, open-source dictation for Mac. Read the code on GitHub, build it from source, report issues and contribute.",
    name: "Open source",
    keywords: ["open-source dictation app Mac", "open-source Wispr Flow alternative", "MIT dictation"],
    og: {
      eyebrow: "MIT license",
      headline: "Hush is",
      accent: "open source.",
      sub: "Read it, build it, change it, share it",
      alt: "Hush is open source under the MIT license.",
    },
    sitemap: { priority: 0.6, changeFrequency: "monthly", lastModified: "build" },
  },
  changelog: {
    path: "/changelog",
    title: "Hush changelog · Release notes and new versions",
    description:
      "Every Hush release and what changed, from GitHub Releases. See what's new in the free, open-source dictation app for Mac.",
    name: "Changelog",
    keywords: ["Hush changelog", "Hush release notes", "Hush latest version"],
    og: {
      eyebrow: "Changelog",
      headline: "What's new",
      accent: "in Hush",
      sub: "Release notes for every version",
      alt: "Hush changelog: what's new in each release.",
    },
    sitemap: { priority: 0.6, changeFrequency: "weekly", lastModified: "release" },
  },
  roadmap: {
    path: "/roadmap",
    title: "Hush roadmap · What's next for the free Mac dictation app",
    description:
      "What's shipping in Hush 1.1, what's next and what's planned later for the free, open-source dictation app for Mac. Suggest a feature on GitHub.",
    name: "Roadmap",
    keywords: ["Hush roadmap", "Hush upcoming features", "Mac dictation app roadmap"],
    og: {
      eyebrow: "Roadmap",
      headline: "What's next",
      accent: "for Hush",
      sub: "Shipping in 1.1 · Next · Later",
      alt: "The Hush roadmap: what's shipping in 1.1, what's next and what's planned later.",
    },
    sitemap: { priority: 0.6, changeFrequency: "monthly", lastModified: "build" },
  },
  privacy: {
    path: "/privacy",
    title: "Privacy policy · Hush, private dictation for Mac",
    description:
      "How Hush handles your data: speech is recognized on your Mac, there is no telemetry or account, and text leaves only if you turn on AI clean-up.",
    name: "Privacy policy",
    keywords: ["private dictation app", "dictation without telemetry", "offline speech to text privacy"],
    og: {
      eyebrow: "Privacy policy",
      headline: "Your voice never",
      accent: "leaves your Mac.",
      sub: "No telemetry · No account · No audio uploads",
      alt: "Hush privacy policy: your voice never leaves your Mac.",
    },
    sitemap: { priority: 0.5, changeFrequency: "yearly", lastModified: "content" },
  },
  terms: {
    path: "/terms",
    title: "Terms · Hush",
    description:
      "Hush is free, open-source software under the MIT license, provided as is. The short terms for using the Mac dictation app.",
    name: "Terms",
    keywords: ["Hush terms", "Hush MIT license"],
    og: {
      eyebrow: "Terms",
      headline: "Short, because Hush",
      accent: "is free software.",
      sub: "MIT license · Provided as is",
      alt: "Hush terms: free software under the MIT license.",
    },
    sitemap: { priority: 0.3, changeFrequency: "yearly", lastModified: "content" },
  },
}

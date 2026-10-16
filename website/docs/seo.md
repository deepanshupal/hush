# SEO plan

Positioning: **the free, open-source Wispr Flow alternative**, a push-to-talk dictation app for Apple Silicon Macs.
Canonical origin: `https://www.hush.software`. American English.

Titles, descriptions, keywords and social image copy live in `lib/pages.ts` (one entry per page). Keep this table in sync with it.
Limits: title ≤ 60 characters, description ≤ 155. Each page targets its own intent, so pages don't compete with each other.

| Page | Primary intent | Secondary intents | Title |
| --- | --- | --- | --- |
| `/` | free dictation app for Mac | open-source dictation app, speech to text Mac offline, voice typing Mac, free Wispr Flow alternative (eyebrow + description) | Free dictation app for Mac, open source and offline · Hush |
| `/compare` | Wispr Flow vs Superwhisper | best dictation app for Mac, Mac dictation apps compared | Wispr Flow vs Superwhisper vs Hush: Mac dictation compared |
| `/alternatives` | Wispr Flow / Superwhisper alternatives (hub) | dictation app alternatives Mac | Alternatives to Wispr Flow, Superwhisper and VoiceInk · Hush |
| `/alternatives/wispr-flow` | Wispr Flow alternative | free Wispr Flow alternative, Hush vs Wispr Flow | Free Wispr Flow alternative for Mac, open source · Hush |
| `/alternatives/superwhisper` | Superwhisper alternative | free Superwhisper alternative, Hush vs Superwhisper | Free Superwhisper alternative for Mac, open source · Hush |
| `/alternatives/voiceink` | VoiceInk alternative | Hush vs VoiceInk | Free VoiceInk alternative for Mac, MIT licensed · Hush |
| `/download` | download Hush dictation | free dictation app download Mac | Download Hush · Free dictation app for Mac |
| `/faq` | Hush dictation questions | offline dictation Mac, is Hush free | Hush FAQ · Mac dictation questions, answered |
| `/why` | private, on-device dictation | dictation without the cloud | Why Hush · Private, on-device dictation that stays free |
| `/open-source` | open-source dictation app Mac | open-source Wispr Flow alternative | Open-source dictation app for Mac · Hush on GitHub |
| `/changelog` | Hush release notes | Hush latest version | Hush changelog · Release notes and new versions |
| `/roadmap` | Hush roadmap | Hush upcoming features | Hush roadmap · What's next for the free Mac dictation app |
| `/privacy` | private dictation app | dictation without telemetry | Privacy policy · Hush, private dictation for Mac |
| `/terms` | (navigational) | | Terms of use · Hush, the free Mac dictation app |

## What each page ships

- Canonical URL, Open Graph (`website`, `en_US`) and Twitter `summary_large_image` tags, from `pageMetadata(key)` in `lib/metadata.ts`.
- A 1200×630 social image per page (`opengraph-image.tsx` + `twitter-image.tsx` in each route, drawn by `lib/og.tsx` with fonts bundled in `assets/fonts`).
- JSON-LD (`lib/structured-data.ts`): Organization + WebSite on every page; SoftwareApplication on `/` and `/download`; HowTo (install steps) on `/download`; FAQPage on `/` (the questions shown there), `/faq` and each `/alternatives/*` page; BreadcrumbList on inner pages, following `parent` in `lib/pages.ts`. No ratings or reviews. (Google no longer shows FAQ or HowTo rich results; the markup is kept for other search and AI engines.)
- Sitemap (`app/sitemap.ts`) lists the pages above only; redirects (`/license`, `/payment`, `/feedback`, `/changelogs`) stay out. `/download` and `/changelog` use the latest release date as `lastModified`; every other page uses the content date in `lib/pages.ts`. **Bump it when you change a page's content.**
- `robots.txt` (`app/robots.ts`) allows everything and names AI search and training crawlers explicitly.
- `/llms.txt` and `/llms-full.txt` (`lib/llms.ts`) summarize the site for AI assistants, generated from `lib/pages.ts`, `lib/faq.tsx`, `lib/comparison-data.ts`, `lib/alternatives.tsx` and `lib/roadmap.ts`.

## Alternative pages

`/alternatives/*` use `components/alternative-page.tsx` with copy in `lib/alternatives.tsx` and tables from `lib/comparison-data.ts`. Every claim about another app must match a sourced cell in the comparison data. To add one: add a `PageKey` and entry in `lib/pages.ts` (with `parent: "alternatives"`), an entry in `ALTERNATIVES` and `ALTERNATIVE_ORDER`, and a route folder with `page.tsx`, `opengraph-image.tsx` and `twitter-image.tsx` (copy `app/alternatives/voiceink`).

See `docs/seo-audit-2026-10.md` for the latest audit and `docs/launch-checklist.md` for directories and launch blurbs.

## Adding a page

1. Add an entry to `PAGES` in `lib/pages.ts` and a row here.
2. In the page: `export const metadata = pageMetadata("key")` and `<JsonLd data={breadcrumbJsonLd("key")} />`. The sitemap picks it up automatically; list it in `lib/llms.ts` too.
3. Copy `opengraph-image.tsx` and `twitter-image.tsx` from another route and change the key.

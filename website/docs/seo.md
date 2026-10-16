# SEO plan

Positioning: **the free, open-source Wispr Flow alternative**, a push-to-talk dictation app for Apple Silicon Macs.
Canonical origin: `https://www.hush.software`. American English.

Titles, descriptions, keywords and social image copy live in `lib/pages.ts` (one entry per page). Keep this table in sync with it.
Limits: title ≤ 60 characters, description ≤ 155. Each page targets its own intent, so pages don't compete with each other.

| Page | Primary intent | Secondary intents | Title |
| --- | --- | --- | --- |
| `/` | free Wispr Flow alternative | dictation app for Mac, speech to text Mac offline, voice typing Mac, open-source dictation | Hush · Free, open-source Wispr Flow alternative for Mac |
| `/compare` | Wispr Flow vs Superwhisper | Wispr Flow alternative, Superwhisper alternative, best dictation app for Mac | Wispr Flow vs Superwhisper vs Hush: Mac dictation compared |
| `/download` | download Hush dictation | free dictation app download Mac | Download Hush · Free dictation app for Mac |
| `/faq` | Hush dictation questions | offline dictation Mac, is Hush free | Hush FAQ · Mac dictation questions, answered |
| `/why` | private, on-device dictation | dictation without the cloud | Why Hush · Free, private, open-source dictation |
| `/open-source` | open-source dictation app Mac | open-source Wispr Flow alternative | Open-source dictation app for Mac · Hush on GitHub |
| `/changelog` | Hush release notes | Hush latest version | Hush changelog · Release notes and new versions |
| `/privacy` | private dictation app | dictation without telemetry | Privacy policy · Hush, private dictation for Mac |
| `/terms` | (navigational) | | Terms · Hush |

## What each page ships

- Canonical URL, Open Graph (`website`, `en_US`) and Twitter `summary_large_image` tags, from `pageMetadata(key)` in `lib/metadata.ts`.
- A 1200×630 social image per page (`opengraph-image.tsx` + `twitter-image.tsx` in each route, drawn by `lib/og.tsx` with fonts bundled in `assets/fonts`).
- JSON-LD (`lib/structured-data.ts`): Organization + WebSite on every page; SoftwareApplication on `/` and `/download`; FAQPage on `/` (the questions shown there) and `/faq`; BreadcrumbList on inner pages. No ratings or reviews.
- Sitemap (`app/sitemap.ts`) lists the pages above only; redirects (`/license`, `/payment`, `/feedback`, `/changelogs`) stay out. `/download` and `/changelog` use the latest release date as `lastModified`.

## Adding a page

1. Add an entry to `PAGES` in `lib/pages.ts` and a row here.
2. In the page: `export const metadata = pageMetadata("key")` and `<JsonLd data={breadcrumbJsonLd("key")} />`.
3. Copy `opengraph-image.tsx` and `twitter-image.tsx` from another route and change the key.

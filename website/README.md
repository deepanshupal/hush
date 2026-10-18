# Hush website

The marketing and download site for **Hush**, free and open-source push-to-talk dictation for Mac.

**Live:** https://www.hush.software (the apex `hush.software` redirects to `www`, which is canonical)

The app lives in the same repository, one folder up (`src/` and `src-tauri/`). Release builds are published to [`DeepanshuPal/downloads`](https://github.com/DeepanshuPal/downloads), the one public downloads repository for all of Deepanshu's apps, which this site reads at build time. Hush releases there are tagged `hush-vX.Y.Z`.

## Pages

| Route | What it is |
|---|---|
| `/` | Hero, animated dictation demo, use cases, features, comparison, privacy, FAQ, open source, CTA |
| `/compare` | Hush vs Wispr Flow, Superwhisper, VoiceInk and OpenWhispr (plus Spokenly, Willow and Apple Dictation behind "Show more apps"; a pick-one view on phones) |
| `/alternatives` | Hub for the alternative pages: `/alternatives/wispr-flow`, `/alternatives/superwhisper`, `/alternatives/voiceink` (copy in `lib/alternatives.tsx`) |
| `/download` | Latest DMG, install steps, Gatekeeper note, permissions |
| `/changelog` | Release notes, generated from GitHub Releases |
| `/roadmap` | Public roadmap: shipped in 1.1, next, later (`lib/roadmap.ts`) |
| `/faq` | All FAQs, grouped by topic (with FAQPage structured data) |
| `/llms.txt`, `/llms-full.txt` | Plain-text summaries for AI assistants (`lib/llms.ts`) |
| `/why` | Manifesto: free, private, open |
| `/open-source` | Contribute, build from source, report issues, license |
| `/privacy`, `/terms` | Privacy policy and MIT "as is" terms |

Old routes redirect (see `next.config.ts`): `/license` → `/faq`, `/payment*` → `/download`, `/feedback` → GitHub issues, `/changelogs` → `/changelog`.

## Releases and the download link

Nothing needs editing when a new version ships. `lib/github.ts` is the single source of truth:

- `getReleases()` lists the `hush-vX.Y.Z` releases of `DeepanshuPal/downloads` that have a `.dmg` asset, highest version first. Everything else in that repository (Doja, Clippy, the `hush-models-v1` model mirror) is skipped, and nothing reads the repository's "latest" release, because it can belong to another app.
- `getLatestDownload()` returns the DMG of the highest version. Every download button uses it.
- Hush 1.1.0 and older were copied from the old `hush-downloads` repository on 18 Oct 2026, which reset their GitHub dates, so `ORIGINAL_RELEASE_DATES` in `lib/github.ts` keeps their real release dates.
- `getStarCount()` returns the star count of `DeepanshuPal/hush` for the GitHub button (hidden if unavailable).

Pages that use this data revalidate every hour (ISR). If GitHub can't be reached, buttons fall back to the releases page and the changelog links to GitHub. Optionally set `GITHUB_TOKEN` in Vercel to avoid the anonymous API rate limit.

Release notes are rendered from GitHub's own sanitized HTML (`body_html`), so write them in Markdown on GitHub.

## Design system

All tokens live in `app/globals.css` (`@theme`): colors (`page`, `surface`, `surface-muted`, `surface-raised`, `line`, `ink`, `ink-muted`, `ink-subtle`, `accent`, ...), fonts, the type scale (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-small`, `text-caption`), radii (`rounded-control`, `rounded-panel`, `rounded-card`) and shadows. Don't hard-code hex values in components.

### Shared with the app

The site and the app (`src/styles/theme.css`, light scheme) use the same palette. These tokens must match; `scripts/check-design-tokens.mjs` (run from the repo root, and in the Website CI workflow) fails if they drift. `BRAND` in `lib/site.ts` is checked too.

| Shared token | Site (`app/globals.css`) | App (`src/styles/theme.css`) | Value |
|---|---|---|---|
| Page / background | `--color-page` | `--hush-light-bg` | `#e9e2d0` |
| Surface | `--color-surface` | `--hush-light-surface` | `#f1ecdf` |
| Raised surface | `--color-surface-raised` | `--hush-light-surface-raised` | `#f8f5ee` |
| Border | `--color-line` | `--hush-light-border` | `#cfc5ae` |
| Text | `--color-ink` | `--hush-light-text` | `#1a1410` |
| Muted text | `--color-ink-muted` | `--hush-light-text-muted` | `#5a5040` |
| Accent | `--color-accent` | `--hush-light-accent` | `#8b3030` |
| Text on accent | `--color-accent-ink` | `--hush-light-accent-contrast` | `#fdf8f1` |

To change one, edit both files and run `node scripts/check-design-tokens.mjs`. Site-only tokens (`page-dot`, `surface-muted`, `ink-subtle`, `accent-soft`, `accent-hover`) have no app equivalent.

### Scaling

The root font size is 16px up to a 1440px-wide window and grows linearly to 22px at 2560px (`html` in `app/globals.css`), so the site looks the same on a 13" laptop and a 27" monitor, like zooming. Size things in rem (Tailwind's spacing and type utilities already are); avoid px for widths, heights and gaps.

### Conventions

- `h1`, `h2`, `h3` are styled globally, so headings look the same on every page.
- `components/ui/button.tsx` is the only button (`primary`, `secondary`, `ghost`). Pass `href` to render a link.
- `components/section.tsx` has `Section`, `SectionHeading`, `PageHeader` and `Eyebrow`.
- Text colors meet WCAG AA contrast; animations are disabled under `prefers-reduced-motion`.
- The OG image is generated by `app/opengraph-image.tsx`.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- Canela (serif headings, self-hosted from `assets/fonts` via `next/font/local`) and Inter (body, via `next/font`)
- SEO: titles, descriptions and social image copy per page in `lib/pages.ts`; see `docs/seo.md`
- No backend, database, cookies or analytics

## Running locally

```bash
npm ci
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Deployment

Hosted on Vercel (project `hush-website`, Root Directory `website`). Pushes to `main` that change `website/` deploy to production; other branches get preview deployments. Changes outside `website/` are skipped (Ignored Build Step: `git diff --quiet HEAD^ HEAD -- .`).

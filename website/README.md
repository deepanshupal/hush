# Hush website

The marketing and download site for **Hush**, a Mac app that turns your voice into text in any app, on-device, with no cloud and no subscription.

**Live:** https://hush-website-one.vercel.app (canonical domain: hush.software)

The app itself lives in the [`hush`](https://github.com/DeepanshuPal/hush) repo. Release builds are published to the public [`hush-downloads`](https://github.com/DeepanshuPal/hush-downloads) repo, which this site links to.

## Pages

| Route | What it is |
|---|---|
| `/` | Landing page: hero with a macOS-style dock, app screenshot, features grid, call to action |
| `/download` | Direct download of the current macOS build (Apple Silicon `.dmg`), with first-launch Gatekeeper instructions |
| `/why` | Why Hush exists |
| `/license` | Pricing: free 14-day trial, then a $19 lifetime license |
| `/payment`, `/payment/success` | Checkout placeholder ("coming soon") and its success page |
| `/changelogs` | Release notes |
| `/feedback` | Placeholder ("coming soon") |
| `/privacy`, `/terms` | Legal pages |

`public/appcast.xml` is a Sparkle-style update feed for Hush releases. It points at the same `hush-downloads` release as the download buttons.

## Updating the download version

The release URL is hard-coded in four places. Update all of them together when shipping a new build:

- `app/download/download-client.tsx`
- `components/hero.tsx`
- `components/cta-section.tsx`
- `public/appcast.xml` (also bump the version fields and `length`)

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4 with a few shadcn/ui-style components (`components/ui`)
- Canela (serif, self-hosted from `public/fonts`), plus Inter and Fraunces via `next/font`
- No backend, database or environment variables: every page is static

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deployment

Hosted on Vercel. Every push to `main` deploys to production.

## Status

Live. Checkout and feedback pages are placeholders until payments are wired up.

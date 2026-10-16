# SEO and AI-search audit, October 2026

Audit of www.hush.software (live site and the `website/` source), run on 17 Oct 2026 with Corey Haines' marketing skills as the playbook: seo-audit, ai-seo, schema, site-architecture, competitors, copywriting, copy-editing, cro, product-marketing, launch and directory-submissions.

No Search Console, analytics or rank data was available (the site has no analytics by design), so findings come from the HTML, the source and the live HTTP behavior. Everything marked **Fixed** ships in the `seo` branch; everything else is a recommendation.

## Executive summary

The foundations were already good: one canonical host, per-page titles and descriptions within limits, self-referencing canonicals, a clean sitemap, server-rendered content, per-page social images, and JSON-LD that only describes visible facts. The site's comparison data is unusually well sourced.

The gaps were mostly about coverage and AI readability, not breakage:

1. **No alternative pages.** "Wispr Flow alternative" and "Superwhisper alternative" were served only by the homepage and `/compare`, so one page had to rank for two different intents. **Fixed:** `/alternatives`, `/alternatives/wispr-flow`, `/alternatives/superwhisper`, `/alternatives/voiceink`.
2. **No machine-readable summary for AI engines** (`/llms.txt` returned 404) and no explicit AI-crawler policy. **Fixed:** `/llms.txt`, `/llms-full.txt`, named AI crawlers in `robots.txt`.
3. **Stale 1.1 content.** The features grid, FAQ and download steps didn't mention the 1.1 features (double-tap hands-free, paste last transcript, pausing media, Fast / Live preview / Most accurate models). **Fixed.**
4. **No plain "what is Hush" sentence** in the first 100 words of the homepage, the FAQ or the structured data. **Fixed** (hero lead, new first FAQ, sharper `SITE_DESCRIPTION`).
5. **Sitemap `<lastmod>` was the build time** for most pages, so it changed on every deploy and search engines learn to ignore it. **Fixed:** real content dates.
6. **The apex domain redirects with a 307 (temporary).** Not fixed: it's a Vercel domain setting (see the action plan).

## Technical SEO

| Issue | Impact | Evidence | Fix | Status |
| --- | --- | --- | --- | --- |
| `hush.software` → `www` uses **307 Temporary Redirect** | Medium | `curl -I https://hush.software` returns 307; `http://www` correctly returns 308 | In Vercel → Project → Domains, set the apex to redirect to `www` with **308 Permanent** | Recommended |
| Sitemap `<lastmod>` = build time for 8 of 10 pages | Medium | Live sitemap showed the deploy timestamp on every page | `lastModified` in `lib/pages.ts` is now a content date (or the release date for `/download` and `/changelog`) | Fixed |
| No `llms.txt` | Medium (non-Google AI engines) | `/llms.txt` returned 404 | Generated route handlers `app/llms.txt` and `app/llms-full.txt` from the same data as the pages | Fixed |
| robots.txt has no stated AI-crawler policy | Low | Only `User-Agent: *` | Named search crawlers (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) and training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot), all allowed; the comment in `app/robots.ts` says how to opt out of training only | Fixed |
| `Host:` line in robots.txt | None | Nonstandard (Yandex only), ignored by Google | Left as is | n/a |
| Canonicals | OK | Every indexable page self-canonicals to `https://www.hush.software/...`; 404 has `noindex` | None | OK |
| Trailing slashes | OK | `/compare/` 308s to `/compare` | None | OK |
| HTTPS, HSTS | OK | `strict-transport-security: max-age=63072000` | Optional: add `includeSubDomains; preload` once every subdomain is HTTPS | OK |
| Rendering | OK | All copy, FAQ answers (in `<details>`) and JSON-LD are in the initial HTML; no client-only content | None | OK |
| hreflang | n/a | English-only site, `<html lang="en">`, `og:locale en_US` | Don't add hreflang until there are translated pages | OK |
| Redirects | OK | `/license`, `/payment`, `/feedback`, `/changelogs` are permanent and out of the sitemap | None | OK |
| Core Web Vitals | Not measured | No field data; the site is static, uses `next/font` with size-adjusted fallbacks and almost no images | Check PageSpeed Insights after deploy, especially LCP on the home hero | Recommended |

## On-page SEO

### Titles and descriptions

Titles follow the "query first, brand last" pattern for an unknown brand; every one is 42 to 60 characters and every description 121 to 155.

| Page | Before | After | Reason |
| --- | --- | --- | --- |
| `/` | Hush · Free, open-source Wispr Flow alternative for Mac | Free dictation app for Mac, open source and offline · Hush | The home page now owns the category query ("free dictation app for Mac"); "Wispr Flow alternative" moves to its own page so the two don't compete. The hero eyebrow still says "The free, open-source Wispr Flow alternative", and the description keeps the phrase |
| `/why` | Why Hush · Free, private, open-source dictation | Why Hush · Private, on-device dictation that stays free | Matches the page's intent (private, on-device dictation) |
| `/terms` | Terms · Hush | Terms of use · Hush, the free Mac dictation app | Was too short to say anything |
| `/download`, `/faq`, `/roadmap` | | Descriptions updated | Remove the negation list, add models and checksums, fix "shipping in 1.1" (it shipped) |
| New pages | | See `lib/pages.ts` | One intent each: alternatives hub, Wispr Flow, Superwhisper, VoiceInk |

If Search Console later shows the home page losing clicks for "free Wispr Flow alternative" before `/alternatives/wispr-flow` picks them up, swapping the home title back is a one-line change.

### Headings

One H1 per page everywhere, H2/H3 in order. Changes:

- `/download`: "Download Hush" → "Download Hush for Mac".
- `/faq`: "Frequently asked questions" → "Questions about Hush, answered", and the 18 questions are now grouped under five H2s (basics, setup, using Hush, privacy, other apps), so the page has a real outline.
- `/changelog`: "Changelog" → "Hush changelog".
- `/compare`: H1 kept (it's the voice of the page); the eyebrow now says "Mac dictation apps compared" to tie it to the title.
- Left alone: the home H1 ("Dictation that stays on your Mac.") and `/why` ("Free. Private. Open."). Both are brand lines; the first-100-words fix below carries the keywords instead.

### Content

| Issue | Impact | Fix | Status |
| --- | --- | --- | --- |
| The homepage never says "Hush is a dictation app for Mac" in plain words | High for AI engines | Hero lead now opens "Hush is a free, open-source dictation app for Mac." | Fixed |
| 1.1 features missing from features grid and FAQ | High | Features: model tiers, double-tap, paste last transcript, pausing media. FAQ: new questions for model choice, hands-free, paste again, music | Fixed |
| "The app speaks 26 languages" was ambiguous (UI vs dictation) | Medium | "Whisper models understand 99 languages, and the app itself comes in 26." | Fixed |
| "Speech is three times faster" had no source | Low | `/why` now cites the Stanford study (speech vs phone-keyboard typing) | Fixed |
| Dates rendered in British format ("16 October 2026") | Low | `formatDate` uses `en-US` ("October 16, 2026"); "afterwards" → "afterward", "any more" → "anymore" | Fixed |
| No social proof anywhere | Medium (conversion and AI recommendations) | `[NEED: real user quotes, with permission]`, or GitHub stars once they are meaningful (the star count already shows on the hero button at 10+) | Recommended |
| No dated, authored content (blog, guides) | Medium | See long-term recommendations | Recommended |

### Images

The only content images are the logo (`alt="Hush"`) and a decorative dock icon (`alt=""`). Social images have per-page alt text in `lib/pages.ts`. No issues.

### Internal linking and architecture

```
Home (/)
├── Download (/download)            header CTA, every CTA
├── Compare (/compare)              header nav
├── Alternatives (/alternatives)    footer, /compare, home comparison   NEW
│   ├── Wispr Flow (/alternatives/wispr-flow)                            NEW
│   ├── Superwhisper (/alternatives/superwhisper)                        NEW
│   └── VoiceInk (/alternatives/voiceink)                                NEW
├── FAQ (/faq)
├── Why (/why)                      header nav
├── Roadmap (/roadmap)              header nav
├── Changelog (/changelog)
├── Open source (/open-source)
├── Privacy (/privacy), Terms (/terms)
├── /llms.txt, /llms-full.txt                                            NEW
```

- Every page is within two clicks of home; no orphans (checked by crawling every internal `href` on the built site: all 200).
- The new pages are linked from the footer, a "Switching from one app in particular?" section on `/compare`, a line under the home comparison table, each other (hub and spokes), and the Wispr Flow and Superwhisper FAQ answers.
- Breadcrumb JSON-LD now follows the hierarchy (`Hush > Alternatives > Wispr Flow alternative`) through a `parent` field in `lib/pages.ts`.
- Header nav unchanged (4 items + Download CTA) to keep the layout as is.

## Structured data

All JSON-LD is server-rendered and was parsed on every page of the built site.

| Page | Types |
| --- | --- |
| Every page | Organization + WebSite (`@graph`) |
| `/` | SoftwareApplication, FAQPage (the 6 questions shown) |
| `/download` | SoftwareApplication, BreadcrumbList, **HowTo** (new, mirrors the 5 install steps) |
| `/faq` | FAQPage (all 18), BreadcrumbList |
| `/alternatives/*` | BreadcrumbList (3 levels), FAQPage (the page's questions), new |
| Other inner pages | BreadcrumbList |

Changes and caveats, per the schema skill:

- **SoftwareApplication** now has a `featureList`, and the shared `SITE_DESCRIPTION` defines the entity plainly ("free, open-source (MIT) push-to-talk dictation app for Apple Silicon Macs"). `offers` is `price: "0"`. Google only shows software rich results with `aggregateRating` or `review`; Hush has no genuine ratings, so none are added. Don't add them until there are real, on-page reviews.
- **FAQPage**: Google stopped showing FAQ rich results in 2026. The markup stays because it describes visible content and other answer engines read it. Don't expect a SERP change from it.
- **HowTo**: Google retired HowTo rich results in 2023. Added as plain semantic markup for other engines; no Google appearance expected.
- **Organization** `sameAs` lists only GitHub. Add profiles as they exist (X account for Hush, Product Hunt, AlternativeTo, a Wikidata item); consistent profiles help engines recognize the entity.

Validate after deploy with the Schema.org validator and Google's Rich Results Test.

## AI-search readiness

| Check | Before | After |
| --- | --- | --- |
| Clear definition in the first paragraph | No | Yes (home hero, first FAQ, llms.txt) |
| Self-contained answers (40 to 80 words) | Mostly | Yes; new FAQs and alternative-page answers lead with the answer |
| Comparison tables for "X vs Y" | `/compare` only | Plus one Hush-vs-X table per alternative page, all from sourced data |
| Sources and dates on claims | Data file only | Pages show "checked October 2026" and link issues for corrections; `/why` cites its statistic |
| FAQ section with natural questions | Yes | 18 questions, grouped |
| Structured data | Good | Plus HowTo, featureList, 3-level breadcrumbs |
| Author / maker attribution | Footer and `/why` | Unchanged (fine for a one-person project) |
| Freshness | Undated | Sitemap dates are real; comparison pages show their check date |
| AI crawler policy | Implicit | Explicit, all allowed |
| `llms.txt` / `llms-full.txt` | Missing | Both, generated from page data, release version included |
| Content in initial HTML | Yes | Yes |

Not done (see recommendations): a Markdown version of pages via `Accept: text/markdown`, a `/pricing.md` (the product is free, so `llms.txt` says so in its first fact), and OKF.

**Prompts to track monthly** (run each 3 to 5 times in ChatGPT, Perplexity, Claude and Google AI Mode, and log whether Hush is mentioned, cited or recommended):

1. free alternative to Wispr Flow
2. best free dictation app for Mac
3. offline speech to text for Mac
4. open source dictation app macOS
5. Superwhisper alternative
6. Wispr Flow vs Superwhisper
7. private dictation app that doesn't upload audio
8. is Hush dictation app safe
9. dictation app for coding / for Cursor on Mac
10. VoiceInk vs Superwhisper

## Competitor pages

Built per the competitors skill (singular "alternative" format plus a small hub):

- TL;DR lead, three reasons people look, side-by-side table, "where each one is ahead", "choose Hush if / stay with X if", switching steps, FAQ, CTA.
- Every competitor claim maps to a row in `lib/comparison-data.ts`, which records the official source URL. Unknowns render as "Not stated on their site" rather than ✗. Hush's planned features render as "Coming next/later", not ✓.
- Each page says what the competitor does better (iPhone, Windows, voice editing, file transcription, context).
- No switcher testimonials: there are none on record, so none were written. Add real ones with permission.
- Copy lives in `lib/alternatives.tsx`; re-verify with the comparison data whenever `CHECKED` changes (quarterly).

Candidates for later pages, in priority order: Apple Dictation ("better than Mac dictation"), OpenWhispr, Willow, Spokenly, and a "Wispr Flow vs Superwhisper" page (competitor vs competitor) if `/compare` doesn't rank for it.

## Copy and conversion (cro, copywriting, copy-editing)

Diagnosis: situation B (a real voice: plain, specific, honest about gaps). Edits were point edits, keeping the voice.

- Hero: the lead now defines the product, and "no account" moved next to the CTA as a risk reducer.
- Download: lead rewritten from a negation list into what happens ("Download it, drag it to Applications and start talking"); model step names the Fast / Live preview / Most accurate choice.
- Features: 1.1 features added as two more cards in the existing grid; model card names the three tiers.
- CTAs: "Download for Mac" already passes the action + object test; kept.
- AI-tell sweep on changed copy: no contrast reveals, negation lists or em dashes in headings.

Test ideas (no analytics today, so these need a privacy-respecting counter such as Vercel Web Analytics or download counts from GitHub release assets): hero lead A/B, "Download free for Mac" vs "Download for Mac", moving the comparison table above the features grid.

## Prioritized action plan

**Critical:** none. Nothing blocks indexing.

**High impact (this PR):** alternative pages and hub; llms.txt and llms-full.txt; 1.1 content in features and FAQ; first-100-words definition; honest sitemap dates; FAQ structure.

**Quick wins (owner, minutes each):**

1. Vercel: change the apex redirect to 308.
2. Submit the sitemap in Google Search Console and Bing Webmaster Tools (Bing feeds Copilot and ChatGPT search), then request indexing for the four new URLs.
3. Validate JSON-LD in the Rich Results Test and the Schema.org validator.
4. Set the GitHub repo "Website" field and topics (`dictation`, `speech-to-text`, `macos`, `whisper`, `wispr-flow-alternative`).

**Long term:**

1. Third-party presence: AlternativeTo listing as an alternative to Wispr Flow, Superwhisper and VoiceInk; Product Hunt; Show HN; Mac awesome-lists. AI engines recommend from consensus, not from our own pages. See `docs/launch-checklist.md`.
2. Real social proof: user quotes (with permission), press, a "used by" line once true.
3. Use-case pages that the product genuinely supports (dictation for coding and AI prompts, for writers, for RSI/accessibility), each with specific workflows rather than templated copy.
4. A short, dated guide or two ("How to dictate on a Mac without sending audio to the cloud", "Choosing a local speech model") with the maker named, for the informational queries the product pages can't own.
5. A Markdown representation of key pages (content negotiation or a `Link` header) once the Next.js setup makes it cheap.
6. Notarized builds: removing the Gatekeeper step is the biggest conversion fix available, and it also removes a trust objection AI answers may repeat.
7. Re-check competitor facts quarterly and update `CHECKED`.

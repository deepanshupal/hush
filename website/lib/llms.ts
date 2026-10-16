// Plain-text summaries of the site for AI assistants and agents (llmstxt.org):
// /llms.txt is the short index, /llms-full.txt has the facts in one file.
// Both are generated from the same data as the pages, so they can't drift.

import { ALTERNATIVE_ORDER, ALTERNATIVES } from "@/lib/alternatives"
import { CHECKED, apps, groups, type AppId, type Cell } from "@/lib/comparison-data"
import { faqs } from "@/lib/faq"
import type { Download } from "@/lib/github"
import { PAGES, type PageKey } from "@/lib/pages"
import { ROADMAP_ORDER, ROADMAP_STAGES } from "@/lib/roadmap"
import {
  GITHUB_URL,
  RELEASES_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SYSTEM_REQUIREMENTS,
} from "@/lib/site"

const url = (key: PageKey) => (PAGES[key].path === "/" ? `${SITE_URL}/` : `${SITE_URL}${PAGES[key].path}`)
const link = (key: PageKey, label?: string) =>
  `- [${label ?? PAGES[key].name}](${url(key)}): ${PAGES[key].description}`

function keyFacts(download: Download) {
  return [
    `- Price: free. No paid tier, trial, word limit or account.`,
    `- License: MIT (open source). Source code: ${GITHUB_URL}`,
    `- Platform: macOS, ${SYSTEM_REQUIREMENTS}. Intel Macs and Windows are planned; there is no iPhone app.`,
    `- Latest version: ${download.version ?? "see releases"}${download.publishedAt ? ` (released ${download.publishedAt.slice(0, 10)})` : ""}. Download: ${SITE_URL}/download`,
    `- Privacy: speech is recognized on the Mac and audio is never uploaded. No telemetry, analytics or account. Optional AI clean-up sends transcript text (never audio) to a provider the user picks, or stays on the Mac with Apple Intelligence or a local server such as Ollama.`,
    `- Works offline once a speech model is downloaded.`,
    `- Maker: Deepanshu Pal.`,
  ].join("\n")
}

export function llmsTxt(download: Download) {
  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Key facts:
${keyFacts(download)}

## Pages
${link("home")}
${link("download")}
${link("faq")}
${link("why")}
${link("privacy")}
${link("changelog")}
${link("roadmap")}
${link("openSource")}

## Comparisons
${link("compare")}
${ALTERNATIVE_ORDER.map((key) => link(key)).join("\n")}

## Optional
- [Full facts in one file](${SITE_URL}/llms-full.txt): features, install steps, every FAQ answer and the comparison data
- [Source code on GitHub](${GITHUB_URL})
- [All releases and checksums](${RELEASES_URL})
- [Terms](${url("terms")})
`
}

function cellText(cell: Cell) {
  const base =
    cell.value === "yes"
      ? "Yes"
      : cell.value === "no"
        ? cell.planned
          ? `Not yet (${ROADMAP_STAGES[cell.planned].pill.toLowerCase()})`
          : "No"
        : cell.value === "partial"
          ? "Partly"
          : cell.value === "unknown"
            ? "Not stated on their site"
            : cell.value
  return cell.note ? `${base} (${cell.note})` : base
}

function comparisonTable(ids: AppId[]) {
  const cols = ids.map((id) => apps.find((a) => a.id === id)!.name)
  const lines = [`| Feature | ${cols.join(" | ")} |`, `|---|${cols.map(() => "---").join("|")}|`]
  for (const group of groups) {
    for (const row of group.rows) {
      lines.push(`| ${row.label} | ${ids.map((id) => cellText(row.cells[id]).replace(/\|/g, "/")).join(" | ")} |`)
    }
  }
  return lines.join("\n")
}

export function llmsFullTxt(download: Download) {
  const features = [
    "Push to talk in any app: hold Fn (or any shortcut), speak, release; the text is pasted where the cursor is.",
    "Hands-free: tap or double-tap the shortcut to keep recording until the next tap. Esc cancels.",
    "On-device speech recognition with open models: Fast (Parakeet V3, the default), Live preview (Nemotron Streaming), Most accurate (Granite Speech 4.1), plus Whisper and others. Metal-accelerated, offline after a one-time download.",
    "Live preview: with a streaming model, words appear while you talk.",
    "Optional AI clean-up: removes filler words and self-corrections and fixes punctuation, using Apple Intelligence, a local OpenAI-compatible server such as Ollama, or the user's own key for Groq, OpenAI, Anthropic, OpenRouter, Cerebras and others.",
    "Per-app styles: Default, Message, Email, Code and Raw.",
    "Voice snippets (a short phrase expands into longer text) and custom vocabulary.",
    "Pauses music and video while dictating, then resumes only what it paused (or lowers the volume, mutes, or leaves audio alone).",
    "Paste last transcript: Ctrl+Cmd+V pastes the most recent dictation again; also in the menu bar.",
    "Local history of recent dictations, optionally with recordings.",
    "Menu bar app with light and dark mode; interface in 26 languages. Whisper models recognize 99 languages; Parakeet V3 covers English and 24 other European languages.",
  ]

  const roadmap = ROADMAP_ORDER.map((stage) => {
    const s = ROADMAP_STAGES[stage]
    return `### ${s.title}\n${s.items.map((i) => `- ${i.title}: ${i.description}`).join("\n")}`
  }).join("\n\n")

  const alternatives = ALTERNATIVE_ORDER.map((key) => {
    const alt = ALTERNATIVES[key]
    return `### Hush vs ${alt.name}
Page: ${url(key)}

${alt.lead}

Why people look for an alternative to ${alt.name}:
${alt.reasons.map((r) => `- ${r.title}: ${r.body}`).join("\n")}

Choose Hush if:
${alt.chooseHush.map((i) => `- ${i}`).join("\n")}

Choose ${alt.name} if:
${alt.chooseThem.map((i) => `- ${i}`).join("\n")}`
  }).join("\n\n")

  return `# ${SITE_NAME}: full facts

> ${SITE_DESCRIPTION}

Website: ${SITE_URL}/ · Source: ${GITHUB_URL} · Short index: ${SITE_URL}/llms.txt

## Key facts
${keyFacts(download)}

## Features (current release)
${features.map((f) => `- ${f}`).join("\n")}

## Install
1. Download the DMG from ${SITE_URL}/download, open it and drag Hush to Applications.
2. Open Hush. Builds aren't notarized by Apple, so the first time macOS blocks it: open System Settings, Privacy & Security, and click Open Anyway (once).
3. Grant Microphone and Accessibility access.
4. Pick a speech model. Fast (Parakeet V3) is recommended, about 480 MB, downloaded once.
5. Put the cursor in any text field, hold Fn, speak and let go.

## Frequently asked questions
${faqs.map((f) => `### ${f.question}\n${f.text}`).join("\n\n")}

## Comparison with other Mac dictation apps
Competitor details come from each product's own website, docs, pricing page or terms, checked ${CHECKED}. Full table: ${url("compare")}

${comparisonTable(apps.map((a) => a.id))}

${alternatives}

## Roadmap
${roadmap}
`
}

#!/usr/bin/env node
// Fails if the brand tokens shared by the app and the website drift apart.
//
//   app:     src/styles/theme.css     (--hush-light-* tokens, light scheme)
//   website: website/app/globals.css  (--color-* tokens in @theme)
//            website/lib/site.ts      (BRAND, for OG images and theme-color)
//
// Run from the repo root: node scripts/check-design-tokens.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");

// [shared name, app token, website token, BRAND key (optional)]
const SHARED = [
  ["page / bg", "--hush-light-bg", "--color-page", "page"],
  ["surface", "--hush-light-surface", "--color-surface", "surface"],
  ["surface-raised", "--hush-light-surface-raised", "--color-surface-raised"],
  ["border", "--hush-light-border", "--color-line", "line"],
  ["text", "--hush-light-text", "--color-ink", "ink"],
  ["text-muted", "--hush-light-text-muted", "--color-ink-muted", "inkMuted"],
  ["accent", "--hush-light-accent", "--color-accent", "accent"],
  ["accent-contrast", "--hush-light-accent-contrast", "--color-accent-ink"],
];

function cssTokens(css) {
  const tokens = new Map();
  for (const [, name, value] of css.matchAll(
    /(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\b/g,
  )) {
    if (!tokens.has(name)) tokens.set(name, value.toLowerCase());
  }
  return tokens;
}

function brandTokens(ts) {
  const block = ts.match(/export const BRAND = \{([\s\S]*?)\}/)?.[1] ?? "";
  return new Map(
    [...block.matchAll(/(\w+)\s*:\s*"(#[0-9a-fA-F]{3,8})"/g)].map(
      ([, k, v]) => [k, v.toLowerCase()],
    ),
  );
}

const app = cssTokens(read("src/styles/theme.css"));
const site = cssTokens(read("website/app/globals.css"));
const brand = brandTokens(read("website/lib/site.ts"));

const problems = [];
for (const [label, appName, siteName, brandKey] of SHARED) {
  const a = app.get(appName);
  const s = site.get(siteName);
  if (!a)
    problems.push(`${label}: ${appName} not found in src/styles/theme.css`);
  if (!s)
    problems.push(`${label}: ${siteName} not found in website/app/globals.css`);
  if (a && s && a !== s)
    problems.push(`${label}: app ${appName} ${a} != website ${siteName} ${s}`);
  if (brandKey) {
    const b = brand.get(brandKey);
    if (!b)
      problems.push(
        `${label}: BRAND.${brandKey} not found in website/lib/site.ts`,
      );
    else if (s && b !== s)
      problems.push(
        `${label}: BRAND.${brandKey} ${b} != website ${siteName} ${s}`,
      );
  }
}

if (problems.length) {
  console.error("Design tokens drifted between the app and the website:\n");
  for (const p of problems) console.error(`  - ${p}`);
  console.error(
    "\nUpdate both files so the shared tokens match (see website/README.md).",
  );
  process.exit(1);
}
console.log(`Design tokens in sync (${SHARED.length} shared tokens).`);

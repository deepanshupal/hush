// Shared generator for the per-page Open Graph and Twitter images (1200x630).
// Each route's opengraph-image.tsx and twitter-image.tsx call ogImage() with its
// page key. Fonts are bundled under assets/fonts so the build never needs the network.

import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"
import { PAGES, type PageKey } from "@/lib/pages"
import { BRAND } from "@/lib/site"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

export function ogAlt(key: PageKey) {
  return PAGES[key].og.alt
}

const fontsDir = path.join(process.cwd(), "assets/fonts")

let assets: Promise<{ canela: Buffer; interMedium: Buffer; interSemiBold: Buffer; wordmark: string }> | null = null

function loadAssets() {
  assets ??= Promise.all([
    readFile(path.join(fontsDir, "Canela-Light-Trial.otf")),
    readFile(path.join(fontsDir, "Inter-Medium.ttf")),
    readFile(path.join(fontsDir, "Inter-SemiBold.ttf")),
    readFile(path.join(process.cwd(), "public/hush-wordmark.png")),
  ]).then(([canela, interMedium, interSemiBold, wordmark]) => ({
    canela,
    interMedium,
    interSemiBold,
    wordmark: `data:image/png;base64,${wordmark.toString("base64")}`,
  }))
  return assets
}

export async function ogImage(key: PageKey) {
  const { og } = PAGES[key]
  const { canela, interMedium, interSemiBold, wordmark } = await loadAssets()

  // Headline words wrap one by one; the accent phrase stays together on one line.
  // Words are separate flex items (with a column gap) because Satori collapses spaces.
  const long = og.headline.length + (og.accent?.length ?? 0) > 34
  const gap = long ? 18 : 22

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BRAND.page,
          backgroundImage: `radial-gradient(circle, ${BRAND.pageDot} 2px, transparent 2px)`,
          backgroundSize: "32px 32px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            width: 1080,
            height: 510,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 64px",
            background: BRAND.surface,
            border: `2px solid ${BRAND.line}`,
            borderRadius: 32,
            boxShadow: "0 16px 40px rgba(26,20,16,0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
            <img src={wordmark} width={202} height={72} alt="" />
            <div
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 999,
                background: BRAND.surfaceMuted,
                color: BRAND.inkMuted,
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {og.eyebrow}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: gap,
              fontFamily: "Canela",
              fontSize: long ? 76 : 92,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: BRAND.ink,
            }}
          >
            {og.headline.split(" ").map((w, i) => (
              <span key={i}>{w}</span>
            ))}
            {og.accent && (
              <span style={{ display: "flex", columnGap: gap, color: BRAND.accent }}>
                {og.accent.split(" ").map((w, i) => (
                  <span key={i}>{w}</span>
                ))}
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: BRAND.inkMuted }}>
              {og.sub}
            </div>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: BRAND.accent }}>
              hush.software
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Canela", data: canela, style: "normal", weight: 300 },
        { name: "Inter", data: interMedium, style: "normal", weight: 500 },
        { name: "Inter", data: interSemiBold, style: "normal", weight: 600 },
      ],
    },
  )
}

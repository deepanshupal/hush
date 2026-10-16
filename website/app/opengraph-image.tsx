import { readFile } from "node:fs/promises"
import path from "node:path"
import { ImageResponse } from "next/og"

export const alt = "Hush: free, open-source dictation for Mac"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Colours mirror the tokens in app/globals.css (ImageResponse can't read CSS variables).
const PAGE = "#d4ccb8"
const DOT = "#b0a890"
const SURFACE = "#f0ebe0"
const LINE = "#c4bca8"
const INK = "#1a1410"
const INK_MUTED = "#5a5040"
const ACCENT = "#8b3030"

export default async function OpengraphImage() {
  const publicDir = path.join(process.cwd(), "public")
  const [canela, wordmark] = await Promise.all([
    readFile(path.join(publicDir, "fonts/Canela-Light-Trial.otf")),
    readFile(path.join(publicDir, "hush-wordmark.png")),
  ])
  const wordmarkSrc = `data:image/png;base64,${wordmark.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: PAGE,
          backgroundImage: `radial-gradient(circle, ${DOT} 2px, transparent 2px)`,
          backgroundSize: "32px 32px",
        }}
      >
        <div
          style={{
            width: 1060,
            height: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            background: SURFACE,
            border: `2px solid ${LINE}`,
            borderRadius: 32,
            boxShadow: "0 16px 40px rgba(26,20,16,0.15)",
          }}
        >
          <img src={wordmarkSrc} width={300} height={107} alt="" />
          <div
            style={{
              display: "flex",
              fontFamily: "Canela",
              fontSize: 76,
              color: INK,
              letterSpacing: -1,
            }}
          >
            Dictation that stays&nbsp;<span style={{ color: ACCENT }}>on your Mac.</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: INK_MUTED }}>
            Free forever · Open source (MIT) · Apple Silicon
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Canela", data: canela, style: "normal", weight: 300 }],
    },
  )
}

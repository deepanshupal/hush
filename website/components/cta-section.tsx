"use client"

import { AppleIcon } from "@/components/icons/apple-icon"

const DOWNLOAD_URL = "https://github.com/DeepanshuPal/hush-downloads/releases/download/v0.7.9/Hush_0.7.9_aarch64.dmg"

export function CTASection() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 px-6 md:px-8 py-20 rounded-b-2xl"
      style={{ background: "#F0EBE0", borderTop: "1px solid #C4BCA8" }}
    >
      <h2
        style={{ animationDelay: "0.1s", fontWeight: 300 }}
        className="text-3xl md:text-4xl text-balance text-center leading-tight tracking-tight opacity-0 animate-blur-fade-slide-in font-serif"
      >
        <span style={{ color: "#1A1410" }}>You talk faster</span>{" "}
        <span style={{ color: "#8B3030" }}>than you type.</span>
      </h2>
      <p
        style={{ animationDelay: "0.2s", color: "#5A5040" }}
        className="text-center max-w-[440px] text-sm leading-relaxed opacity-0 animate-blur-fade-slide-in"
      >
        Way faster. Hush makes that actually useful.
      </p>
      <div
        style={{ animationDelay: "0.3s" }}
        className="flex flex-col gap-3 items-center opacity-0 animate-blur-fade-slide-in"
      >
        <a href={DOWNLOAD_URL}>
          <button
            className="btn-primary inline-flex items-center cursor-pointer justify-center whitespace-nowrap outline-none rounded-[22px] gap-2"
            style={{
              padding: "10px 22px",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            <AppleIcon className="size-4" />
            Download Hush
          </button>
        </a>
        <span style={{ color: "#8B7860" }} className="text-sm">
          macOS 14+ · Apple Silicon
        </span>
      </div>
    </div>
  )
}

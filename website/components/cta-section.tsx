"use client"

import { AppleIcon } from "@/components/icons/apple-icon"

const DOWNLOAD_URL = "https://github.com/DeepanshuPal/flowy/releases/download/v0.7.9/Flowy_0.7.9_aarch64.dmg"

export function CTASection() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6 md:px-8 py-20">
      <h2
        style={{ animationDelay: "0.1s" }}
        className="text-3xl md:text-4xl text-balance text-center leading-tight tracking-tight opacity-0 animate-blur-fade-slide-in font-serif"
      >
        <span className="gradient-text">Your voice, your Mac,</span>
        <br />
        <span className="text-foreground">nobody else.</span>
      </h2>
      <p
        style={{ animationDelay: "0.2s" }}
        className="text-center max-w-[440px] text-sm text-foreground/50 leading-relaxed opacity-0 animate-blur-fade-slide-in"
      >
        Every other voice app sends your audio to a server. Hush never does.
        Everything runs on your machine using on-device AI.
      </p>
      <div
        style={{ animationDelay: "0.3s" }}
        className="flex flex-col gap-3 items-center opacity-0 animate-blur-fade-slide-in"
      >
        <a href={DOWNLOAD_URL}>
          <button className="gradient-bg inline-flex items-center cursor-pointer justify-center whitespace-nowrap font-medium transition-transform outline-none text-white h-9 px-5 text-sm rounded-full gap-2 hover:opacity-90">
            <AppleIcon className="size-4" />
            Download for Mac — free
          </button>
        </a>
        <span className="text-foreground/30 text-sm">
          macOS 14+ · Apple Silicon
        </span>
      </div>
    </div>
  )
}

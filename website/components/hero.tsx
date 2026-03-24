"use client"

import { AppleIcon } from "@/components/icons/apple-icon"

const DOWNLOAD_URL = "https://github.com/DeepanshuPal/flowy/releases/download/v0.7.9/Flowy_0.7.9_aarch64.dmg"

export function Hero() {
  return (
    <div className="w-full relative overflow-hidden p-0">
      <div className="w-full mx-auto">
        <div className="w-full z-1 mx-auto animate-fade-in">
          <div className="h-[500px] px-6 md:px-8 relative flex w-full flex-col gap-8 items-center justify-center">
            <div className="flex flex-col gap-4 items-center justify-center">
              <h1
                style={{ animationDelay: "0.1s" }}
                className="text-[2.75rem] md:text-[3.5rem] text-balance text-center leading-[1.1] tracking-tight font-medium max-w-[700px] opacity-0 animate-blur-fade-slide-in font-serif"
              >
                <span className="gradient-text">speak.</span>{" "}
                <span className="text-foreground">it appears.</span>
              </h1>

              <p
                style={{ animationDelay: "0.2s" }}
                className="text-center leading-6.5 max-w-[420px] !text-base opacity-0 text-foreground/55 animate-blur-fade-slide-in"
              >
                Hush turns your voice into text, instantly, in any app.
                No cloud. No subscription. No one listening.
              </p>
            </div>

            <div
              style={{ animationDelay: "0.3s" }}
              className="flex flex-col gap-4 items-center justify-center opacity-0 animate-blur-fade-slide-in"
            >
              <div className="flex flex-row items-start justify-start gap-2">
                <a href={DOWNLOAD_URL}>
                  <button className="gradient-bg inline-flex items-center cursor-pointer justify-center whitespace-nowrap font-medium transition-transform outline-none text-white h-9 px-5 text-sm rounded-full gap-2 hover:opacity-90">
                    <AppleIcon className="size-4" />
                    Download for Mac — free
                  </button>
                </a>
              </div>
              <span className="text-foreground/35 text-sm">
                macOS 14+ · Apple Silicon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

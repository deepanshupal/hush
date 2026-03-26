"use client"

import Link from "next/link"
import { AppleIcon } from "@/components/icons/apple-icon"
import { Dock } from "@/components/dock"

const DOWNLOAD_URL = "https://github.com/DeepanshuPal/hush/releases/download/v0.7.9/Hush_0.7.9_aarch64.dmg"

export function Hero() {
  return (
    <div className="w-full relative overflow-hidden p-0">
      <div className="w-full mx-auto">
        <div className="w-full z-1 mx-auto animate-fade-in">
          <div className="min-h-[500px] px-6 md:px-8 py-16 relative flex w-full flex-col gap-8 items-center justify-center">
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="opacity-0 animate-blur-fade-slide-in" style={{ animationDelay: "0.08s" }}>
                <div
                  className="flex items-center gap-1"
                  style={{
                    background: "#F0E0DC",
                    color: "#8B3030",
                    border: "1px solid #D4A8A0",
                    borderRadius: "20px",
                    padding: "4px 14px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  Currently in Beta
                </div>
              </div>

              <h1
                style={{
                  animationDelay: "0.1s",
                  fontSize: "clamp(40px, 5vw, 64px)",
                  fontWeight: 300,
                  lineHeight: 1.08,
                  color: "#1A1410",
                }}
                className="text-balance text-center tracking-tight max-w-[700px] opacity-0 animate-blur-fade-slide-in font-serif"
              >
                <span style={{ color: "#8B3030" }}>Press a key.</span>{" "}
                Speak. It types.
              </h1>

              <p
                style={{ animationDelay: "0.2s", color: "#5A5040" }}
                className="text-center leading-6.5 max-w-[420px] !text-base opacity-0 animate-blur-fade-slide-in"
              >
                Hush turns your voice into text instantly — in any app on your Mac.
                No cloud. No subscription.
              </p>

              <div
                style={{ animationDelay: "0.25s" }}
                className="opacity-0 animate-blur-fade-slide-in mt-2"
              >
                <Dock />
              </div>
            </div>

            <div
              style={{ animationDelay: "0.3s" }}
              className="flex flex-col gap-4 items-center justify-center opacity-0 animate-blur-fade-slide-in"
            >
              <div className="flex flex-row items-start justify-start gap-3">
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
                    Download for Mac
                  </button>
                </a>
                <Link href="/license">
                  <button
                    className="btn-secondary-skeu shimmer-btn inline-flex items-center cursor-pointer justify-center whitespace-nowrap outline-none rounded-[22px] gap-2"
                    style={{
                      padding: "10px 22px",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    See License
                  </button>
                </Link>
              </div>
              <span style={{ color: "#8B7860" }} className="text-sm">
                macOS 14+ · Apple Silicon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppleIcon } from "@/components/icons/apple-icon"
import {
  XIcon,
  ChevronRightIcon,
} from "@/components/icons/social-icons"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MainContainer } from "@/components/main-container"

const DOWNLOAD_URL = "https://github.com/DeepanshuPal/hush-downloads/releases/download/v0.8.0/Hush_0.8.0_aarch64.dmg"

export default function DownloadClient() {
  const handleDownload = () => {
    window.open(DOWNLOAD_URL, "_blank")
  }

  return (
    <>
      <MainContainer>
        <Header />
        <div className="relative flex flex-col min-h-[80dvh]">
          {/* Header */}
          <div className="flex flex-col gap-4 p-8 pt-12 pb-10 items-center text-center animate-blur-fade-slide-in">
            <h1 className="text-2xl font-medium tracking-tight" style={{ color: "#1A1410" }}>
              Download Hush
            </h1>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: "#5A5040" }}>
              Local voice-to-text for Mac.
              No account. No cloud. No subscription.
              Just download and start talking.
            </p>
          </div>

          {/* Download Section */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 [animation-delay:100ms] animate-blur-fade-slide-in"
            style={{ border: "1px solid #C4BCA8" }}
          >
            {/* Left - Download Form */}
            <div className="p-8 flex flex-col gap-6" style={{ borderRight: "1px solid #C4BCA8" }}>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium flex items-center gap-2" style={{ color: "#1A1410" }}>
                  <AppleIcon className="size-5 text-[#5A5040]" />
                  Download for Mac
                </h2>
                <p className="text-sm" style={{ color: "#5A5040" }}>
                  Version 0.8.0 · macOS 14.0+ · Apple Silicon
                </p>
                <p className="text-sm" style={{ color: "#5A5040" }}>
                  Free for 14 days. $19 once after that, lifetime updates.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  className="inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap transition-colors outline-none w-full"
                  onClick={handleDownload}
                  style={{
                    borderRadius: "10px",
                    padding: "14px 28px",
                    background: "#8B3030",
                    color: "#F7F2EA",
                    fontWeight: 600,
                    fontSize: "15px",
                    border: "none",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset, 0 -1px 0 rgba(0,0,0,0.20) inset, 0 2px 8px rgba(139,48,48,0.25)",
                  }}
                >
                  <AppleIcon className="size-4" />
                  Download for Mac
                </button>
                <p className="text-xs leading-relaxed" style={{ color: "#8A8070" }}>
                  First launch: right-click Hush and choose Open.
                  <br />
                  macOS asks once because the app is not notarized. You can also use System Settings &gt; Privacy &amp; Security &gt; Open Anyway.
                </p>
              </div>
            </div>

            {/* Right - Coming Soon */}
            <div className="p-8 flex flex-col gap-4 border-t border-[#C4BCA8] sm:border-t-0">
              <div
                className="font-[380] py-1 transition-colors px-2 h-5 text-xs rounded-full flex items-center gap-1 w-fit"
                style={{ background: "#D4CCB8", color: "#5A5040" }}
              >
                Coming Soon
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center size-8 rounded-lg"
                    style={{ background: "#E4DCC8" }}
                  >
                    <svg className="size-4" style={{ color: "#8B7860" }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 12v-8.646l10-1.355v10.001h-10zm11 0h13v-12l-13 1.807v10.193zm-1 1h-10v8.646l10 1.355v-10.001zm1 0v10.193l13 1.807v-12h-13z"/>
                    </svg>
                  </div>
                  <span className="text-sm" style={{ color: "#5A5040" }}>Windows</span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center size-8 rounded-lg"
                    style={{ background: "#E4DCC8" }}
                  >
                    <svg className="size-4" style={{ color: "#8B7860" }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/>
                    </svg>
                  </div>
                  <span className="text-sm" style={{ color: "#5A5040" }}>Linux</span>
                </div>
              </div>

              <p className="text-xs pt-2" style={{ color: "#8B7860" }}>
                We&apos;re working on Windows and Linux versions.
                We&apos;ll let you know when they&apos;re ready.
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 gap-0">
            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/deepanshupal/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex items-center gap-6 transition-colors [animation-delay:200ms] animate-blur-fade-slide-in hover:bg-[#E4DCC8]/50"
              style={{ borderTop: "1px solid #C4BCA8" }}
            >
              <div
                className="flex items-center justify-center size-12 rounded-xl shrink-0"
                style={{ background: "#E4DCC8" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#5A5040">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium" style={{ color: "#1A1410" }}>
                    Follow on LinkedIn
                  </span>
                </div>
                <span className="text-sm max-w-[500px]" style={{ color: "#5A5040" }}>
                  Development updates and occasional thoughts on building software.
                </span>
              </div>
              <ChevronRightIcon className="size-4 shrink-0 text-[#C4BCA8]" />
            </a>

            {/* Twitter Link */}
            <a
              href="https://x.com/deepanshuxpal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 flex items-center gap-6 transition-colors [animation-delay:200ms] animate-blur-fade-slide-in hover:bg-[#E4DCC8]/50"
              style={{ borderTop: "1px solid #C4BCA8" }}
            >
              <div
                className="flex items-center justify-center size-12 rounded-xl shrink-0"
                style={{ background: "#E4DCC8" }}
              >
                <XIcon className="size-5 text-[#5A5040]" />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium" style={{ color: "#1A1410" }}>Follow on X</span>
                </div>
                <span className="text-sm max-w-[500px]" style={{ color: "#5A5040" }}>
                  Shorter updates. More frequently.
                </span>
              </div>
              <ChevronRightIcon className="size-4 shrink-0 text-[#C4BCA8]" />
            </a>
          </div>

          {/* Support Email */}
          <div
            className="p-8 text-sm leading-6 [animation-delay:400ms] animate-blur-fade-slide-in"
            style={{ borderTop: "1px solid #C4BCA8", color: "#5A5040" }}
          >
            Questions or issues? Email{" "}
            <a
              className="hover:underline"
              style={{ color: "#8B3030" }}
              href="mailto:hi@hush.software"
            >
              hi@hush.software
            </a>
            {" "}- We read every email.
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}

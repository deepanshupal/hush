"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppleIcon } from "@/components/icons/apple-icon"
import {
  XIcon,
  GitHubIcon,
  ChevronRightIcon,
} from "@/components/icons/social-icons"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MainContainer } from "@/components/main-container"

const DOWNLOAD_URL = "https://github.com/DeepanshuPal/flowy/releases/download/v0.7.9/Flowy_0.7.9_aarch64.dmg"

export default function DownloadPage() {
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
            <div className="opacity-90 hover:opacity-100 py-1 transition-colors bg-[#FF8C00]/20 text-[#FFD700] px-2 h-5 rounded-md flex items-center gap-1 font-medium text-[11px]">
              Free Download
            </div>
            <h1 className="text-2xl font-medium tracking-tight text-foreground">
              Download Hush
            </h1>
            <p className="text-foreground/50 text-sm max-w-md leading-relaxed">
              Local voice-to-text for Mac. No account needed, no cloud, no subscription.
              Just download and start speaking.
            </p>
          </div>

          {/* Download Section */}
          <div className="ring ring-white/[0.06] grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06] [animation-delay:100ms] animate-blur-fade-slide-in">
            {/* Left - Download Form */}
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <AppleIcon className="size-5 text-foreground/60" />
                  Download for Mac
                </h2>
                <p className="text-sm text-foreground/50">
                  Version 0.7.9 · macOS 14.0+ · Apple Silicon
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  className="gradient-bg inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap font-medium transition-transform outline-none text-white h-9 px-4 text-sm rounded-full w-full hover:opacity-90"
                  onClick={handleDownload}
                >
                  <AppleIcon className="size-4" />
                  Download for Mac — free
                </button>
              </div>
            </div>

            {/* Right - Coming Soon */}
            <div className="p-8 flex flex-col gap-4">
              <div className="font-[380] opacity-90 hover:opacity-100 py-1 transition-colors bg-white/[0.08] text-foreground/70 px-2 h-5 text-xs rounded-full flex items-center gap-1 w-fit">
                Coming Soon
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-white/[0.04]">
                    <svg className="size-4 text-foreground/40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 12v-8.646l10-1.355v10.001h-10zm11 0h13v-12l-13 1.807v10.193zm-1 1h-10v8.646l10 1.355v-10.001zm1 0v10.193l13 1.807v-12h-13z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-foreground/50">Windows</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-8 rounded-lg bg-white/[0.04]">
                    <svg className="size-4 text-foreground/40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/>
                    </svg>
                  </div>
                  <span className="text-sm text-foreground/50">Linux</span>
                </div>
              </div>

              <p className="text-xs text-foreground/35 pt-2">
                We&apos;re working on bringing Hush to more platforms. Stay tuned!
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 gap-0 divide-x divide-white/[0.06]">
            {/* GitHub Link */}
            <a
              href="https://github.com/DeepanshuPal/flowy"
              target="_blank"
              rel="noopener noreferrer"
              className="border-none border-t border-white/[0.06] p-6 flex items-center gap-6 hover:bg-white/[0.02] transition-colors [animation-delay:200ms] animate-blur-fade-slide-in"
            >
              <div className="flex items-center justify-center size-12 rounded-xl bg-white/[0.04] shrink-0">
                <GitHubIcon className="size-5 text-foreground/60" />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-foreground">
                    View on GitHub
                  </span>
                </div>
                <span className="text-sm text-foreground/45 max-w-[500px]">
                  Star the repo, report issues, or follow development.
                </span>
              </div>
              <ChevronRightIcon className="size-4 text-foreground/30 shrink-0" />
            </a>

            {/* Twitter Link */}
            <a
              href="https://x.com/user"
              target="_blank"
              rel="noopener noreferrer"
              className="border-t border-white/[0.06] p-6 flex items-center gap-6 hover:bg-white/[0.02] transition-colors [animation-delay:200ms] animate-blur-fade-slide-in"
            >
              <div className="flex items-center justify-center size-12 rounded-xl bg-white/[0.04] shrink-0">
                <XIcon className="size-5 text-foreground/60" />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-foreground">Follow on X</span>
                </div>
                <span className="text-sm text-foreground/45 max-w-[500px]">
                  Stay updated with new features and development progress.
                </span>
              </div>
              <ChevronRightIcon className="size-4 text-foreground/30 shrink-0" />
            </a>
          </div>

          {/* Support Email */}
          <div className="p-8 text-sm text-foreground/50 leading-6 [animation-delay:400ms] border-t border-white/[0.06] animate-blur-fade-slide-in">
            Questions or issues? Email{" "}
            <a
              className="text-foreground/70 hover:underline"
              href="mailto:hi@hush.software"
            >
              hi@hush.software
            </a>
            . We read every email.
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  )
}

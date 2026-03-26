"use client"

import { useEffect, useState, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/icons/logo"
import { ArrowLeftIcon } from "@/components/icons/arrow-icons"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

function CheckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )
}

function XMarkIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )
}

function LoadingSpinner({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={`animate-spin ${className}`} style={style} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

type AuthState = "loading" | "success" | "error"

function AuthCallbackContent() {
  const searchParams = useSearchParams()
  const [authState, setAuthState] = useState<AuthState>("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [hoverStyle, setHoverStyle] = useState<{
    opacity: number
    left: number
    width: number
    scale: number
  }>({ opacity: 0, left: 0, width: 0, scale: 0.8 })

  const code = searchParams.get("code")
  const error = searchParams.get("error")

  useEffect(() => {
    if (error) {
      setAuthState("error")
      setErrorMessage("There was an error signing in. Please try again.")
    } else if (code) {
      setAuthState("success")
      const appUrl = `hush://auth/callback?code=${encodeURIComponent(code)}`
      setTimeout(() => {
        window.location.href = appUrl
      }, 500)
    } else {
      setAuthState("error")
      setErrorMessage("No authorization code received. Please try signing in again.")
    }
  }, [code, error])

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget
    const container = navContainerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()

    setHoverStyle({
      opacity: 1,
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      scale: 1,
    })
  }

  const handleMouseLeave = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0, scale: 0.8 }))
  }

  const handleOpenApp = () => {
    if (code) {
      const appUrl = `hush://auth/callback?code=${encodeURIComponent(code)}`
      window.location.href = appUrl
    }
  }

  return (
    <>
      {/* Sticky Header with Back Button */}
      <div
        style={{
          animationDelay: "0.05s",
          background: "rgba(228, 220, 200, 0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #C4BCA8",
        }}
        className="w-full z-20 sticky top-0 left-0 right-0 flex flex-row items-center justify-center"
      >
        <div className="w-full mx-auto px-4">
          <div className="max-w-[52rem] w-full z-1 mx-auto animate-fade-in origin-center relative flex flex-row items-center justify-center p-1">
            <div
              className="flex flex-row w-full z-300 items-center justify-between p-1 rounded-lg max-w-4xl shrink-0 gap-1"
              style={{ width: "100%" }}
            >
              <div className="grid grid-cols-3 items-center w-full">
                {/* Left - Back button */}
                <div className="flex items-center justify-start gap-2 px-0 animate-blue-fade-in min-w-0">
                  <div ref={navContainerRef} className="nav-container relative">
                    <div
                      className="absolute rounded-md pointer-events-none"
                      style={{
                        opacity: hoverStyle.opacity,
                        height: "100%",
                        background: "rgba(26,20,16,0.06)",
                        left: hoverStyle.left,
                        width: hoverStyle.width,
                        top: 0,
                        transform: `scale(${hoverStyle.scale})`,
                        transformOrigin: "center center",
                        transition: "opacity 150ms ease-out, transform 150ms ease-out, left 200ms ease-out, width 200ms ease-out",
                      }}
                    />
                    <ul className="relative z-10 flex items-center gap-1">
                      <li>
                        <Link
                          href="/"
                          className="rounded-full flex items-center gap-1.5 px-3 h-7 font-medium transition-colors duration-200 text-xs"
                          style={{ color: "#5A5040" }}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <ArrowLeftIcon className="size-3.5" />
                          Back
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Center logo */}
                <div className="flex items-center justify-center animate-blue-fade-in">
                  <Link className="inline-flex" href="/" aria-label="Home">
                    <Logo className="h-5 w-auto shrink-0" />
                  </Link>
                </div>

                {/* Right - Empty */}
                <div className="flex items-center justify-end px-0 animate-blue-fade-in">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4">
        <div className="max-w-[52rem] w-full mx-auto" style={{ borderLeft: "1px solid #C4BCA8", borderRight: "1px solid #C4BCA8" }}>
          <div className="relative flex flex-col min-h-[80dvh]" style={{ background: "#F0EBE0" }}>
            {/* Content */}
            <div className="flex flex-col items-center justify-center flex-1 p-8 py-16">
              <div className="flex flex-col items-center gap-6 max-w-md text-center animate-blur-fade-slide-in">
                {/* Status Icon */}
                <div
                  className={`flex items-center justify-center size-16 rounded-full ${
                    authState === "loading"
                      ? ""
                      : authState === "success"
                      ? ""
                      : ""
                  }`}
                  style={{
                    background: authState === "loading"
                      ? "#DCE8F0"
                      : authState === "success"
                      ? "#DCF0E0"
                      : "#F0E0DC",
                  }}
                >
                  {authState === "loading" && (
                    <LoadingSpinner className="size-8" style={{ color: "#305080" }} />
                  )}
                  {authState === "success" && (
                    <CheckIcon className="size-8" style={{ color: "#308030" }} />
                  )}
                  {authState === "error" && (
                    <XMarkIcon className="size-8" style={{ color: "#8B3030" }} />
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-medium tracking-tight" style={{ color: "#1A1410" }}>
                  {authState === "loading" && "Signing In..."}
                  {authState === "success" && "Login Successful!"}
                  {authState === "error" && "Login Failed"}
                </h1>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                  {authState === "loading" && "Please wait while we complete your sign in."}
                  {authState === "success" && "You've successfully signed in. Click below to open Hush."}
                  {authState === "error" && errorMessage}
                </p>

                {/* Action Button */}
                {authState === "success" && (
                  <div className="flex flex-col gap-3 w-full max-w-xs [animation-delay:100ms] animate-blur-fade-slide-in">
                    <Button className="w-full rounded-lg" onClick={handleOpenApp}>
                      Open Hush
                    </Button>
                    <p className="text-xs" style={{ color: "#8B7860" }}>
                      You can close this tab after opening the app.
                    </p>
                  </div>
                )}

                {authState === "error" && (
                  <div className="flex flex-col gap-3 w-full max-w-xs [animation-delay:100ms] animate-blur-fade-slide-in">
                    <Link href="/">
                      <Button variant="secondary" className="w-full rounded-lg">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Support Email */}
            <div
              className="p-8 text-sm leading-6 [animation-delay:400ms] animate-blur-fade-slide-in text-center"
              style={{ borderTop: "1px solid #C4BCA8", color: "#5A5040" }}
            >
              Having trouble?{" "}
              <a
                className="hover:underline"
                style={{ color: "#8B3030" }}
                href="mailto:hi@hush.software"
              >
                Contact support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#E4DCC8" }}>
        <LoadingSpinner className="size-8" style={{ color: "#8B7860" }} />
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}

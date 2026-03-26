"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/icons/logo"
import { ArrowLeftIcon } from "@/components/icons/arrow-icons"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}

export default function PaymentSuccessPage() {
  const navContainerRef = useRef<HTMLDivElement>(null)
  const [hoverStyle, setHoverStyle] = useState<{
    opacity: number
    left: number
    width: number
    scale: number
  }>({ opacity: 0, left: 0, width: 0, scale: 0.8 })

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "hush://payment/success"
    }, 500)

    return () => clearTimeout(timer)
  }, [])

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
    window.location.href = "hush://payment/success"
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
                {/* Logo */}
                <img
                  src="/hush-icon.png"
                  alt="Hush"
                  className="h-16 w-auto object-contain"
                />

                {/* Badge */}
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm"
                  style={{ background: "#F0E0DC", color: "#8B3030" }}
                >
                  <SparkleIcon className="size-4" />
                  Thank You!
                </div>

                {/* Title */}
                <h1 className="text-2xl font-medium tracking-tight" style={{ color: "#1A1410" }}>
                  Payment Successful
                </h1>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: "#5A5040" }}>
                  Thank you for your support. Click below to open Hush.
                </p>

                {/* Action Button */}
                <div className="flex flex-col gap-3 w-full max-w-xs [animation-delay:200ms] animate-blur-fade-slide-in">
                  <Button className="w-full rounded-lg" onClick={handleOpenApp}>
                    Open Hush
                  </Button>
                  <p className="text-xs" style={{ color: "#8B7860" }}>
                    You can close this tab after opening the app.
                  </p>
                </div>
              </div>
            </div>

            {/* Support Email */}
            <div
              className="p-8 text-sm leading-6 [animation-delay:400ms] animate-blur-fade-slide-in text-center"
              style={{ borderTop: "1px solid #C4BCA8", color: "#5A5040" }}
            >
              Questions?{" "}
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

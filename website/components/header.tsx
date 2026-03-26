"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Logo } from "@/components/icons/logo"
import { AppleIcon } from "@/components/icons/apple-icon"

export function Header() {
  const [hoverStyle, setHoverStyle] = useState<{
    opacity: number
    left: number
    width: number
    scale: number
  }>({ opacity: 0, left: 0, width: 0, scale: 0.8 })
  const navContainerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div
      style={{ animationDelay: "0.05s" }}
      className="w-full z-20 flex flex-row items-center justify-center"
    >
      <div className="w-full mx-auto">
        <div className="w-full z-1 mx-auto animate-fade-in relative flex flex-row items-center justify-center p-2">
          <div
            className="flex flex-row w-full z-300 items-center justify-between p-1 rounded-lg max-w-4xl shrink-0 gap-1"
            style={{ width: "100%" }}
          >
            <div className="grid grid-cols-3 items-center w-full">
              {/* Left navigation */}
              <div className="flex items-center justify-start gap-2 px-0 animate-blue-fade-in min-w-0">
                <div className="min-w-0">
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
                          href="/why"
                          className="rounded-full flex items-center gap-2 px-3 h-7 font-medium transition-colors duration-200 text-xs"
                          style={{ color: "#1A1410" }}
                          onMouseEnter={(e) => { handleMouseEnter(e); e.currentTarget.style.color = "#8B3030"; }}
                          onMouseLeave={(e) => { handleMouseLeave(); e.currentTarget.style.color = "#1A1410"; }}
                        >
                          Why
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/changelogs"
                          className="rounded-full flex items-center gap-2 px-3 h-7 font-medium transition-colors duration-200 text-xs"
                          style={{ color: "#1A1410" }}
                          onMouseEnter={(e) => { handleMouseEnter(e); e.currentTarget.style.color = "#8B3030"; }}
                          onMouseLeave={(e) => { handleMouseLeave(); e.currentTarget.style.color = "#1A1410"; }}
                        >
                          Updates
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Center logo */}
              <div className="flex items-center justify-center animate-blue-fade-in">
                <Link className="inline-flex" href="/" aria-label="Home">
                  <Logo />
                </Link>
              </div>

              {/* Right - Download button */}
              <div className="flex items-center justify-end gap-2 px-0 animate-blue-fade-in">
                <Link href="/download">
                  <button
                    className="inline-flex items-center cursor-pointer justify-center whitespace-nowrap outline-none gap-1.5 h-7 text-xs rounded-lg transition-colors"
                    style={{
                      padding: "7px 14px",
                      marginRight: "8px",
                      background: "rgba(26, 20, 16, 0.06)",
                      border: "1px solid rgba(26, 20, 16, 0.10)",
                      boxShadow: "0 0 0 1px rgba(26, 20, 16, 0.04)",
                      color: "rgba(26, 20, 16, 0.85)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(26, 20, 16, 0.10)";
                      e.currentTarget.style.color = "#1A1410";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(26, 20, 16, 0.06)";
                      e.currentTarget.style.color = "rgba(26, 20, 16, 0.85)";
                    }}
                  >
                    <AppleIcon className="size-4" />
                    Download
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

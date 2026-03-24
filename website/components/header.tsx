"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
                    {/* Hover indicator with blur effect */}
                    <div
                      className="absolute bg-foreground/8 rounded-md pointer-events-none"
                      style={{
                        opacity: hoverStyle.opacity,
                        height: "100%",
                        filter: "blur(1px)",
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
                          className="rounded-full flex items-center gap-2 px-3 h-7 text-foreground/70 font-medium transition-colors duration-200 hover:text-foreground text-xs"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          Why
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/changelogs"
                          className="rounded-full flex items-center gap-2 px-3 h-7 text-foreground/70 font-medium transition-colors duration-200 hover:text-foreground text-xs"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
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
                  <Logo className="size-5 shrink-0 text-foreground/70" />
                </Link>
              </div>

              {/* Right - Download button */}
              <div className="flex items-center justify-end gap-2 px-0 animate-blue-fade-in">
                <Link href="/download">
                  <Button variant="secondary" size="sm">
                    <AppleIcon className="size-4" />
                    Download
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

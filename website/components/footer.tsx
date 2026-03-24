"use client"

import { useState, useRef } from "react"
import Link from "next/link"

const footerLinks = [
  { label: "Updates", href: "/changelogs" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
]

export function Footer() {
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
    <div className="w-full flex flex-col items-center gap-4 py-8 px-4">
      {/* Navigation links */}
      <div
        ref={navContainerRef}
        className="flex flex-row flex-wrap justify-center items-center gap-1 relative"
      >
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
            transition:
              "opacity 150ms ease-out, transform 150ms ease-out, left 200ms ease-out, width 200ms ease-out",
          }}
        />
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-full flex items-center gap-2 px-3 h-7 text-foreground/50 font-medium transition-colors duration-200 hover:text-foreground text-xs"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Copyright */}
      <div className="flex flex-row items-center gap-1.5">
        <span className="text-foreground/35 text-xs">
          Made by Deepanshu ·{" "}
          <a href="mailto:hi@hush.software" className="hover:text-foreground/60 transition-colors">
            hi@hush.software
          </a>
        </span>
      </div>
    </div>
  )
}

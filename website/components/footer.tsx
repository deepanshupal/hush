"use client"

import Link from "next/link"

const footerLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
]

export function Footer() {
  return (
    <div
      className="w-full flex flex-col items-center gap-4 py-8 px-4"
    >
      {/* Navigation links */}
      <div className="flex flex-row flex-wrap justify-center items-center gap-1">
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-full flex items-center gap-2 px-3 h-7 font-medium transition-colors duration-200 text-xs"
            style={{ color: "#8B7860" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#8B3030")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8B7860")}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Copyright */}
      <div className="flex flex-row items-center gap-2">
        <span className="text-xs" style={{ color: "#8B7860" }}>
          Hush © 2026 ·{" "}
          <a
            href="mailto:hi@hush.software"
            className="transition-colors"
            style={{ color: "#8B7860" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#8B3030")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8B7860")}
          >
            hi@hush.software
          </a>
        </span>
      </div>
    </div>
  )
}

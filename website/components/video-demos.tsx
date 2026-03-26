"use client"

import { useEffect, useRef, useState } from "react"

function VideoSection({
  label,
  title,
  src,
  showBorder = false
}: {
  label: string
  title: string
  src: string
  showBorder?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            video.play()
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-6 px-6 md:px-10 py-10 ${showBorder ? "" : ""} ${
        isVisible ? "animate-blur-fade-slide-in" : "opacity-0"
      }`}
      style={showBorder ? { borderTop: "1px solid #C4BCA8" } : undefined}
    >
      <div className="flex flex-col gap-1">
        <span
          className="text-xs font-medium tracking-wide uppercase"
          style={{ color: "#8B7860", letterSpacing: "0.1em", fontSize: "12px" }}
        >
          {label}
        </span>
        <h3
          className="text-2xl tracking-tight md:text-2xl font-serif"
          style={{ color: "#1A1410", fontWeight: 700 }}
        >
          {title}
        </h3>
      </div>
      <div
        className="w-full relative rounded-xl overflow-hidden transition-opacity duration-500 opacity-100"
        style={{
          background: "#F0EBE0",
          border: "1px solid #C4BCA8",
          boxShadow: "0 2px 8px rgba(26,20,16,0.08), 0 1px 0 rgba(255,255,255,0.7) inset",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          playsInline
          loop
          muted
          preload="auto"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  )
}

export function VideoDemos() {
  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1">
        <VideoSection
          label="Record"
          title="Press Fn. Speak. Text appears."
          src="/videos/capture.mp4"
        />
        <VideoSection
          label="Snippets"
          title="Save phrases you use often."
          src="/videos/quick-search.mp4"
          showBorder
        />
        <VideoSection
          label="History"
          title="Browse everything you've ever dictated."
          src="/videos/inbox.mp4"
          showBorder
        />
        <VideoSection
          label="AI Polish"
          title="Clean up grammar and punctuation with AI."
          src="/videos/search-filters.mp4"
          showBorder
        />
        <VideoSection
          label="Per-App Tone"
          title="Casual in Slack. Formal in Mail."
          src="/videos/web-view.mp4"
          showBorder
        />
      </div>
    </div>
  )
}

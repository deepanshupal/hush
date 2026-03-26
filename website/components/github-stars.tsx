"use client"

import { useEffect, useState } from "react"
import { GitHubIcon, StarIcon } from "@/components/icons/social-icons"

interface GitHubStarsProps {
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onMouseLeave?: () => void
}

export function GitHubStars({ onMouseEnter, onMouseLeave }: GitHubStarsProps) {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/DeepanshuPal/hush"
        )
        if (response.ok) {
          const data = await response.json()
          setStars(data.stargazers_count)
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error)
      }
    }

    fetchStars()
  }, [])

  return (
    <a
      href="https://github.com/DeepanshuPal/hush"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full text-xs font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <GitHubIcon className="size-3.5" />
      {stars !== null && (
        <span className="flex items-center gap-1">
          <StarIcon className="size-3" />
          {stars}
        </span>
      )}
    </a>
  )
}

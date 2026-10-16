import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * A small, original macOS-style dock under the dictation demo. The icons are
 * our own simple glyphs on brand colors (no Apple or third-party artwork).
 * The app the demo is typing into gets a bright running dot and bounces when
 * the demo switches to it. Purely decorative, so it's hidden from assistive tech.
 */

export type DockApp = "chat" | "mail" | "ai" | "notes" | "terminal"

type Tile = { id: DockApp; label: string; tile: string; glyph: React.ReactNode; mobile?: boolean }

const TILES: Tile[] = [
  {
    id: "chat",
    label: "Chat",
    tile: "bg-accent-soft text-accent",
    mobile: true,
    glyph: (
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H11l-3.6 3.2c-.5.4-1.2.1-1.2-.5V15h0A2.5 2.5 0 0 1 5 12.5z"
        fill="currentColor"
      />
    ),
  },
  {
    id: "mail",
    label: "Mail",
    tile: "bg-surface-raised text-accent",
    mobile: true,
    glyph: (
      <>
        <rect x="4" y="6" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="m4.8 7 7.2 5.6L19.2 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: "ai",
    label: "AI chat",
    tile: "bg-ink text-accent-soft",
    mobile: true,
    glyph: (
      <>
        <path d="M11 4.5c.5 3.6 1.9 5 5.5 5.5-3.6.5-5 1.9-5.5 5.5-.5-3.6-1.9-5-5.5-5.5 3.6-.5 5-1.9 5.5-5.5z" fill="currentColor" />
        <path d="M17 13.5c.3 1.8 1 2.5 2.8 2.8-1.8.3-2.5 1-2.8 2.8-.3-1.8-1-2.5-2.8-2.8 1.8-.3 2.5-1 2.8-2.8z" fill="currentColor" />
      </>
    ),
  },
  {
    id: "notes",
    label: "Notes",
    tile: "bg-surface text-ink-muted",
    glyph: (
      <>
        <path d="M7 4h7.5L18 7.5V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 11h6M9 14h6M9 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "terminal",
    label: "Terminal",
    tile: "bg-ink text-surface",
    glyph: (
      <path d="m6.5 8 4 4-4 4M12.5 17h5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
]

// The hovered icon grows most, its neighbors a little (only with motion allowed).
const magnify =
  "origin-bottom transition-transform duration-200 ease-out motion-safe:hover:-translate-y-[0.35rem] motion-safe:hover:scale-[1.35] motion-safe:[&:has(+*:hover)]:-translate-y-[0.15rem] motion-safe:[&:has(+*:hover)]:scale-[1.15] motion-safe:[*:hover+&]:-translate-y-[0.15rem] motion-safe:[*:hover+&]:scale-[1.15]"

const tileBase =
  "flex size-9 items-center justify-center rounded-[0.6rem] shadow-button-secondary sm:size-11 sm:rounded-[0.75rem]"

/** `bounceKey` changes on every scene switch; pass -1 to never bounce (reduced motion). */
export function DemoDock({ active, bounceKey }: { active: DockApp; bounceKey: number }) {
  return (
    <div aria-hidden className="flex justify-center">
      <div className="flex items-end gap-2 rounded-[1.1rem] border border-accent-ink/25 bg-accent-ink/15 px-2.5 pb-1.5 pt-2 backdrop-blur-sm sm:gap-2.5 sm:px-3">
        {TILES.map((t) => {
          const isActive = t.id === active
          const running = t.id === "chat" || t.id === "mail" || t.id === "ai"
          return (
            <div key={t.id} className={cn("flex flex-col items-center gap-1", magnify, !t.mobile && "max-sm:hidden")}>
              {/* Re-keyed on each switch so the bounce plays again. */}
              <div key={isActive ? bounceKey : "still"} className={cn(isActive && bounceKey >= 0 && "animate-dock-bounce")}>
                <span className={cn(tileBase, t.tile)}>
                  <svg viewBox="0 0 24 24" className="size-[62%]">
                    {t.glyph}
                  </svg>
                </span>
              </div>
              <Dot on={running} bright={isActive} />
            </div>
          )
        })}
        <span className="mx-0.5 mb-3 h-8 w-px self-center bg-accent-ink/30 sm:h-10" />
        <div className={cn("flex flex-col items-center gap-1", magnify)}>
          <Image src="/icons/icon-192.png" alt="" width={192} height={192} className="size-9 scale-[1.14] sm:size-11" />
          <Dot on bright />
        </div>
      </div>
    </div>
  )
}

function Dot({ on, bright }: { on: boolean; bright: boolean }) {
  return (
    <span
      className={cn(
        "size-1 rounded-full transition-colors duration-300",
        !on ? "bg-transparent" : bright ? "bg-accent-ink" : "bg-accent-ink/45",
      )}
    />
  )
}

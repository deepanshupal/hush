import { useId } from "react"
import type { Cell } from "@/lib/comparison-data"
import { ROADMAP_STAGES } from "@/lib/roadmap"
import { cn } from "@/lib/utils"

const marks = {
  yes: { symbol: "✓", label: "Yes", className: "text-ink font-semibold" },
  no: { symbol: "✗", label: "No", className: "text-ink-subtle" },
  partial: { symbol: "◐", label: "Partly", className: "text-ink-muted" },
  unknown: { symbol: "?", label: "Not stated on their site", className: "text-ink-subtle" },
} as const

/** A ✓ / ✗ / ◐ / ? mark with an accessible name. */
export function Mark({ kind, className }: { kind: keyof typeof marks; className?: string }) {
  const mark = marks[kind]
  return (
    <span role="img" aria-label={mark.label} className={cn("text-body leading-none", mark.className, className)}>
      {mark.symbol}
    </span>
  )
}

/** Where the tooltip sits relative to the cell, so it never runs off the edge. */
export type TipAlign = "center" | "start" | "end"

/**
 * Renders one comparison cell: a mark, a "Coming …" pill for planned features
 * (labeled with the roadmap stage), or short text. A cell's `note` becomes a
 * small tooltip that opens on hover and on keyboard focus.
 */
export function CellValue({ cell, align = "center" }: { cell: Cell; align?: TipAlign }) {
  const tipId = useId()
  let content: React.ReactNode
  if (cell.value === "no" && cell.planned) {
    content = (
      <span className="inline-block rounded-[0.75rem] border border-line bg-surface-raised px-2 py-0.5 text-caption leading-snug font-medium text-ink-muted">
        <span className="sr-only">Not yet, </span>
        {ROADMAP_STAGES[cell.planned].pill}
      </span>
    )
  } else if (cell.value in marks) {
    content = <Mark kind={cell.value as keyof typeof marks} />
  } else {
    content = <span>{cell.value}</span>
  }

  if (!cell.note) return content

  return (
    <span
      tabIndex={0}
      aria-describedby={tipId}
      className="group/tip relative inline-flex cursor-help items-baseline gap-1 rounded-sm outline-offset-2"
    >
      {/* Text values get a dotted underline as a hint; marks and pills stay clean. */}
      <span
        className={cn(
          !(cell.value in marks) && !cell.planned && "underline decoration-ink-subtle/60 decoration-dotted underline-offset-4",
        )}
      >
        {content}
      </span>
      <span
        id={tipId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute bottom-full z-30 mb-2 w-max max-w-[14rem] rounded-panel bg-ink px-3 py-2 text-left text-caption font-normal text-surface opacity-0 shadow-panel transition-opacity duration-150",
          "invisible group-hover/tip:visible group-hover/tip:opacity-100 group-focus/tip:visible group-focus/tip:opacity-100",
          align === "center" && "left-1/2 -translate-x-1/2",
          align === "start" && "left-0",
          align === "end" && "right-0",
        )}
      >
        {cell.note}
      </span>
    </span>
  )
}

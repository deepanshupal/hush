import type { Cell } from "@/lib/comparison-data"
import { cn } from "@/lib/utils"

const marks = {
  yes: { symbol: "✓", label: "Yes", className: "text-ink font-semibold" },
  no: { symbol: "✗", label: "No", className: "text-ink-subtle" },
  partial: { symbol: "◐", label: "Partial", className: "text-ink-muted" },
  unknown: { symbol: "?", label: "Unknown", className: "text-ink-subtle" },
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

/**
 * Renders one comparison cell: a mark, a "Coming soon" label for planned
 * features, or short text. `footnote` links to the numbered note below the table.
 */
export function CellValue({
  cell,
  footnote,
  idPrefix = "",
  inlineNote = false,
}: {
  cell: Cell
  footnote?: number
  idPrefix?: string
  inlineNote?: boolean
}) {
  let content: React.ReactNode
  if (cell.value === "no" && cell.planned) {
    content = (
      <span className="inline-flex items-center rounded-control border border-line px-2 py-0.5 text-caption font-medium text-ink-subtle">
        <span className="sr-only">No, </span>Coming soon
      </span>
    )
  } else if (cell.value in marks) {
    content = <Mark kind={cell.value as keyof typeof marks} />
  } else {
    content = <span>{cell.value}</span>
  }

  return (
    <>
      {content}
      {footnote !== undefined && (
        <sup className="ml-0.5 text-caption">
          <a
            href={`#${idPrefix}note-${footnote}`}
            id={`${idPrefix}ref-${footnote}`}
            className="link no-underline"
            aria-label={`Note ${footnote}`}
          >
            {footnote}
          </a>
        </sup>
      )}
      {inlineNote && cell.note && (
        <span className="mt-1 block text-caption text-ink-subtle">{cell.note}</span>
      )}
    </>
  )
}

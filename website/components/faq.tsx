import { ChevronDownIcon } from "@/components/icons/ui-icons"
import type { FaqItem } from "@/lib/faq"

/** Accessible FAQ list built on <details>, so it works without JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-panel border border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-body font-medium text-ink transition-colors hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDownIcon className="size-4 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="px-5 pb-5 text-small text-ink-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}

import { cn } from "@/lib/utils"

/** A full-width band inside the card, separated by a top border. */
export function Section({
  id,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section id={id} className={cn("border-t border-line px-6 py-14 sm:px-10", className)} {...props}>
      {children}
    </section>
  )
}

/** Eyebrow + heading + optional lead, used at the top of sections. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  id,
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "left" | "center"
  id?: string
}) {
  return (
    <div className={cn("mb-10 flex max-w-2xl flex-col gap-3", align === "center" && "mx-auto items-center text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id}>{title}</h2>
      {lead && <p className="text-body text-ink-muted">{lead}</p>}
    </div>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-control bg-surface-muted px-2.5 py-0.5 text-caption font-medium text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Header block for inner pages: eyebrow, h1 and lead, centred. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className="flex animate-enter flex-col items-center gap-4 px-6 pb-12 pt-14 text-center sm:px-10">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="max-w-2xl">{title}</h1>
      {lead && <p className="max-w-xl text-body text-ink-muted">{lead}</p>}
      {children}
    </div>
  )
}

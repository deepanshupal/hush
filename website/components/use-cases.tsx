import { BookIcon, ChatIcon, CommandIcon, InboxIcon, SparklesIcon } from "@/components/icons/feature-icons"
import { Section, SectionHeading } from "@/components/section"

const useCases = [
  {
    title: "Chat",
    where: "Slack, Messages, WhatsApp, Discord",
    style: "Message",
    description: "Quick, casual replies without the typos. Fillers and false starts are gone before you hit send.",
    icon: ChatIcon,
  },
  {
    title: "Email",
    where: "Mail, Gmail, Outlook, Superhuman",
    style: "Email",
    description: "Say it the way you'd explain it, get a properly punctuated email with paragraphs.",
    icon: InboxIcon,
  },
  {
    title: "AI prompts",
    where: "Claude, ChatGPT, Cursor, any chat box",
    style: "Default",
    description: "Speaking is about three times faster than typing, so long, detailed prompts stop feeling like work.",
    icon: SparklesIcon,
  },
  {
    title: "Code and terminal",
    where: "VS Code, Xcode, Terminal, iTerm",
    style: "Code",
    description: "Comments, commit messages and instructions, with identifiers left exactly as you said them.",
    icon: CommandIcon,
  },
  {
    title: "Writing",
    where: "Notes, Docs, Notion, Obsidian",
    style: "Default",
    description: "Get a first draft out of your head and onto the page, then edit with your keyboard.",
    icon: BookIcon,
  },
]

export function UseCases() {
  return (
    <Section id="everywhere" aria-labelledby="everywhere-title">
      <SectionHeading
        id="everywhere-title"
        eyebrow="Everywhere"
        title="Works everywhere you type"
        lead="If your cursor is in it, Hush can type into it. Each app gets its own style, so a Slack reply doesn't read like a cover letter."
      />
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {useCases.map(({ title, where, style, description, icon: Icon }, i) => (
          <li
            key={title}
            className={
              "flex flex-col gap-3 rounded-panel border border-line bg-surface-raised p-5" +
              (i === useCases.length - 1 ? " sm:col-span-2" : "")
            }
          >
            <div className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-panel bg-accent-soft text-accent">
                <Icon className="size-4" />
              </span>
              <h3>{title}</h3>
              <span className="ml-auto rounded-control bg-surface-muted px-2 py-0.5 text-caption font-medium text-ink-muted">
                {style}
              </span>
            </div>
            <p className="text-small text-ink-muted">{description}</p>
            <p className="text-caption text-ink-subtle">{where}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

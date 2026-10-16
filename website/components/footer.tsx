import Link from "next/link"
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  GITHUB_ISSUES_URL,
  GITHUB_LICENSE_URL,
  GITHUB_URL,
} from "@/lib/site"

const columns = [
  {
    title: "Product",
    links: [
      { label: "Download", href: "/download" },
      { label: "Changelog", href: "/changelog" },
      { label: "FAQ", href: "/faq" },
      { label: "Why Hush", href: "/why" },
      { label: "Compare", href: "/compare" },
    ],
  },
  {
    title: "Open source",
    links: [
      { label: "Source code", href: GITHUB_URL },
      { label: "Contribute", href: "/open-source" },
      { label: "Report an issue", href: GITHUB_ISSUES_URL },
      { label: "MIT license", href: GITHUB_LICENSE_URL },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
]

const linkClass = "text-small text-ink-muted transition-colors hover:text-accent"

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[52rem] px-6 pb-12 pt-6 sm:px-10">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-2">
            <p className="text-caption font-semibold uppercase tracking-wider text-ink">
              {column.title}
            </p>
            <ul className="flex flex-col gap-1.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-10 text-caption text-ink-muted">
        Hush is free and open source under the MIT license. Made by{" "}
        <a href={AUTHOR_URL} className="underline underline-offset-2 hover:text-accent">
          {AUTHOR_NAME}
        </a>
        .
      </p>
    </footer>
  )
}

import Link from "next/link"
import { Logo } from "@/components/icons/logo"
import { AppleIcon } from "@/components/icons/apple-icon"
import { Button } from "@/components/ui/button"
import { GITHUB_URL } from "@/lib/site"

const navLinks = [
  { label: "Why", href: "/why" },
  { label: "Changelog", href: "/changelog" },
  { label: "GitHub", href: GITHUB_URL, hideOnMobile: true },
]

const navLinkClass =
  "inline-flex h-8 items-center rounded-control px-2.5 text-caption font-medium text-ink transition-colors hover:bg-surface-muted hover:text-accent sm:px-3"

export function Header() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-3 sm:px-4">
      <nav aria-label="Main">
        <ul className="flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href} className={link.hideOnMobile ? "hidden sm:block" : undefined}>
              {link.href.startsWith("/") ? (
                <Link href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} className={navLinkClass}>
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <Link href="/" aria-label="Hush home" className="inline-flex rounded-panel">
        <Logo />
      </Link>

      <div className="flex justify-end">
        <Button href="/download" variant="secondary" size="sm">
          <AppleIcon />
          Download
        </Button>
      </div>
    </header>
  )
}

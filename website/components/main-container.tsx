import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

/** Page shell: header, the single cream card, and the footer outside it. */
export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface-raised focus:px-4 focus:py-2 focus:text-small focus:text-ink focus:shadow-panel"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen w-full flex-col items-center px-4 pb-4 pt-6 sm:pt-12">
        <div className="w-full max-w-[52rem] animate-card-in overflow-hidden rounded-card border border-line bg-surface shadow-card">
          <Header />
          <main id="main">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}

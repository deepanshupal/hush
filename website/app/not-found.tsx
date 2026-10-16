import type { Metadata } from "next"
import Link from "next/link"
import { MainContainer } from "@/components/main-container"
import { PageHeader } from "@/components/section"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <MainContainer>
      <PageHeader
        eyebrow="404"
        title="This page doesn't exist"
        lead="It may have moved, or the link may be mistyped."
      >
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Button href="/">Go to the home page</Button>
          <Button href="/download" variant="secondary">
            Download Hush
          </Button>
        </div>
        <p className="mt-4 text-small text-ink-muted">
          Looking for answers? Try the <Link href="/faq" className="link">FAQ</Link>.
        </p>
      </PageHeader>
    </MainContainer>
  )
}

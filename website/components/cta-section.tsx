import { AppleIcon } from "@/components/icons/apple-icon"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import type { Download } from "@/lib/github"

export function CTASection({ download }: { download: Download }) {
  return (
    <Section className="flex flex-col items-center gap-5 bg-surface-raised py-20 text-center">
      <h2>
        You talk faster <span className="text-accent">than you type.</span>
      </h2>
      <p className="max-w-md text-body text-ink-muted">
        About three times faster. Hush turns that into text you can actually send, for free, without
        your voice leaving your Mac.
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button href={download.url} size="lg">
          <AppleIcon />
          Download for Mac
        </Button>
        <Button href="/download#install" variant="ghost" size="lg">
          Install guide
        </Button>
      </div>
      <p className="text-caption text-ink-subtle">Apple Silicon Macs · Free and open source</p>
    </Section>
  )
}

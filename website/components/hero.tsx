import { AppleIcon } from "@/components/icons/apple-icon"
import { GitHubIcon, StarIcon } from "@/components/icons/ui-icons"
import { Eyebrow } from "@/components/section"
import { Button } from "@/components/ui/button"
import type { Download } from "@/lib/github"
import { GITHUB_URL } from "@/lib/site"
import { formatStars } from "@/lib/utils"

export function Hero({ download, stars }: { download: Download; stars: number | null }) {
  return (
    <div className="flex flex-col items-center gap-8 px-6 pb-14 pt-12 text-center sm:px-10 sm:pt-16">
      <div className="flex flex-col items-center gap-5">
        <Eyebrow className="animate-enter">The free, open-source Wispr Flow alternative</Eyebrow>
        <h1 className="max-w-[44rem] animate-enter text-display [animation-delay:100ms]">
          Dictation that stays <span className="text-accent">on your Mac.</span>
        </h1>
        <p className="max-w-[36rem] animate-enter text-body text-ink-muted [animation-delay:200ms]">
          Hold <kbd className="kbd">Fn</kbd>, talk, let go. Clean, punctuated text appears wherever
          your cursor is. Speech recognition runs on your Mac, so your voice never leaves it. Free
          forever, no account, no telemetry.
        </p>
      </div>

      <div className="flex animate-enter flex-col items-center gap-3 [animation-delay:300ms]">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button href={download.url} size="lg">
            <AppleIcon />
            Download for Mac
          </Button>
          <Button href={GITHUB_URL} variant="secondary" size="lg">
            <GitHubIcon />
            View on GitHub
            {stars !== null && (
              <span
                className="ml-1 inline-flex items-center gap-1 border-l border-line pl-3 text-small text-ink-muted"
                aria-label={`${stars} stars`}
              >
                <StarIcon className="size-3.5" />
                {formatStars(stars)}
              </span>
            )}
          </Button>
        </div>
        <p className="text-caption text-ink-subtle">
          Apple Silicon Macs
          {download.version ? ` · Version ${download.version}` : ""} · Free forever
        </p>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import Link from "next/link"
import { MainContainer } from "@/components/main-container"
import { PageHeader } from "@/components/section"
import { Button } from "@/components/ui/button"
import { AUTHOR_NAME, GITHUB_URL } from "@/lib/site"

export const metadata: Metadata = pageMetadata("why")

export default function WhyPage() {
  return (
    <MainContainer>
      <JsonLd data={breadcrumbJsonLd("why")} />
      <PageHeader eyebrow="Manifesto" title="Free. Private. Open." />
      <article className="prose mx-auto max-w-[38rem] px-6 pb-16 sm:px-0">
        <p>
          Voice is faster than typing. Most of us talk at well over a hundred words a minute and
          type at a fraction of that. Dictation should be the easy win.
        </p>
        <p>
          But the most popular dictation tools send your voice to a server to be transcribed, and
          charge you a monthly fee for it. Your voice is personal. You say things out loud that you
          would never write in an email. You shouldn&apos;t have to rent it back from someone
          else&apos;s cloud.
        </p>
        <p>
          You don&apos;t have to any more. Open speech models like Parakeet and Whisper got good
          enough, and Apple Silicon got fast enough, that a Mac can recognize speech on its own and
          keep up with you. So that is what Hush does.
        </p>

        <h2>Free</h2>
        <p>
          Hush is free. Not for 14 days, not a free tier with a word limit, not &ldquo;free while in
          beta&rdquo;. There is nothing to buy and no account to create. It costs almost nothing to
          run software on your own computer, so it shouldn&apos;t cost you $15 a month.
        </p>

        <h2>Private</h2>
        <p>
          Your audio is recognized on your Mac and is never uploaded. Hush has no analytics and no
          telemetry. The only time anything leaves your Mac is when you ask it to: downloading a
          speech model, or turning on AI clean-up with a provider you chose, in which case the text
          (not the audio) goes to that provider under your own key. We wrote down{" "}
          <Link href="/privacy">exactly what leaves your Mac</Link>.
        </p>

        <h2>Open</h2>
        <p>
          &ldquo;Trust us&rdquo; is not a privacy policy. Hush is open source under the MIT license,
          so you can read every line that touches your voice, build it yourself, and change it to
          suit you. If Hush ever stopped being what it says it is, anyone could fork it.
        </p>

        <h2>What Hush is not</h2>
        <p>
          It is not a meeting recorder and it doesn&apos;t watch your screen. It does one thing:
          you hold a key, you talk, and your words appear where your cursor is.
        </p>

        <div className="!mt-12 border-t border-line pt-8">
          <p className="!mt-0 font-semibold text-ink">{AUTHOR_NAME}</p>
          <p className="!mt-0 text-small text-ink-subtle">Maker of Hush</p>
        </div>

        <div className="!mt-10 flex flex-wrap gap-3">
          <Button href="/download">Download Hush</Button>
          <Button href={GITHUB_URL} variant="secondary">
            Read the source
          </Button>
        </div>
      </article>
    </MainContainer>
  )
}

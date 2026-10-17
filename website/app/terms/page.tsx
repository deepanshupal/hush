import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd } from "@/lib/structured-data"
import { MainContainer } from "@/components/main-container"
import { PageHeader } from "@/components/section"
import { GITHUB_ISSUES_URL, GITHUB_LICENSE_URL } from "@/lib/site"

export const metadata: Metadata = pageMetadata("terms")

export default function TermsPage() {
  return (
    <MainContainer>
      <JsonLd data={breadcrumbJsonLd("terms")} />
      <PageHeader eyebrow="Legal" title="Terms" lead="Short, because Hush is free software." />
      <article className="prose mx-auto max-w-[38rem] px-6 pb-16 sm:px-0">
        <h2>License</h2>
        <p>
          Hush is open-source software released under the{" "}
          <a href={GITHUB_LICENSE_URL}>MIT license</a>. You may use, copy, modify and distribute
          it, for free, under the terms of that license.
        </p>

        <h2>Provided as is</h2>
        <p>
          As the MIT license says, Hush is provided &ldquo;as is&rdquo;, without warranty of any
          kind, express or implied, including the warranties of merchantability, fitness for a
          particular purpose and non-infringement. In no event shall the authors or copyright
          holders be liable for any claim, damages or other liability arising from, out of or in
          connection with the software or its use. Transcriptions may contain mistakes, so check
          anything important.
        </p>

        <h2>Third-party services</h2>
        <p>
          If you connect Hush to an AI provider, you do so with your own account and API key, and
          that provider&apos;s terms and pricing apply. Speech models are made by third parties and
          keep their own licenses.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={GITHUB_ISSUES_URL}>Open an issue on GitHub</a>
        </p>

        <p className="text-small text-ink-subtle">Last updated: October 2026</p>
      </article>
    </MainContainer>
  )
}

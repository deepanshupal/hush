import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { GitHubIcon } from "@/components/icons/ui-icons"
import { MainContainer } from "@/components/main-container"
import { PageHeader } from "@/components/section"
import { Button } from "@/components/ui/button"
import {
  GITHUB_ISSUES_URL,
  GITHUB_LICENSE_URL,
  GITHUB_NEW_ISSUE_URL,
  GITHUB_URL,
  SOURCE_REPO,
} from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Open source",
  description:
    "Hush is MIT-licensed open source. Read the code, build it from source, report issues and contribute.",
  path: "/open-source",
})

export default function OpenSourcePage() {
  return (
    <MainContainer>
      <PageHeader
        eyebrow="MIT licence"
        title="Hush is open source"
        lead="Read it, build it, change it, share it. Contributions of every size are welcome."
      >
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button href={GITHUB_URL}>
            <GitHubIcon />
            {SOURCE_REPO}
          </Button>
          <Button href={GITHUB_ISSUES_URL} variant="secondary">
            Issues
          </Button>
        </div>
      </PageHeader>

      <article className="prose mx-auto max-w-[38rem] px-6 pb-16 sm:px-0">
        <h2 id="contribute">Contribute</h2>
        <p>
          Bug fixes, translations, documentation, model integrations and design improvements are
          all welcome. For anything bigger than a small fix, open an issue first so we can agree on
          the approach, then send a pull request.
        </p>
        <ul>
          <li>
            <a href={GITHUB_ISSUES_URL}>Browse open issues</a> to find something to work on.
          </li>
          <li>Keep pull requests focused: one change per PR is easiest to review.</li>
          <li>Privacy is the point: changes that send data off the Mac by default won&apos;t be merged.</li>
        </ul>

        <h2 id="build">Build from source</h2>
        <p>
          You need a Mac with Apple Silicon and the toolchain described in the repository&apos;s
          README. Then:
        </p>
        <pre>
          <code>{`git clone ${GITHUB_URL}.git
cd hush`}</code>
        </pre>
        <p>
          and follow the build steps in the <a href={`${GITHUB_URL}#readme`}>README</a>. A build
          you make yourself is signed by you, so macOS won&apos;t show the first-launch warning.
        </p>

        <h2 id="issues">Report an issue</h2>
        <p>
          Found a bug? <a href={GITHUB_NEW_ISSUE_URL}>Open an issue</a> with your macOS version,
          your Mac model, the speech model you use and the steps to reproduce it. Please don&apos;t
          paste API keys or private transcripts.
        </p>

        <h2 id="licence">Licence</h2>
        <p>
          Hush is released under the <a href={GITHUB_LICENSE_URL}>MIT licence</a>. Speech models
          are made by their respective authors and keep their own licences.
        </p>
      </article>
    </MainContainer>
  )
}

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/metadata"
import { MainContainer } from "@/components/main-container"
import { PageHeader } from "@/components/section"
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Hush handles your data: speech is recognised on your Mac, there is no telemetry, and text only leaves your Mac if you turn on AI clean-up.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <MainContainer>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lead="Hush is built so that we never see your data. Here is exactly what the app does with it."
      />
      <article className="prose mx-auto max-w-[38rem] px-6 pb-16 sm:px-0">
        <h2>The short version</h2>
        <ul>
          <li>Speech recognition runs on your Mac. Your audio is never uploaded.</li>
          <li>The app has no analytics, no telemetry and no account.</li>
          <li>
            Text leaves your Mac only if you turn on AI clean-up with a cloud provider, and then only
            to the provider you chose.
          </li>
          <li>We don&apos;t run any server that receives data from the app.</li>
        </ul>

        <h2>What stays on your Mac</h2>
        <ul>
          <li>
            <strong>Audio.</strong> Hush records while you hold the shortcut and transcribes the
            recording on your Mac with the speech model you selected.
          </li>
          <li>
            <strong>Recordings.</strong> If saving recordings is enabled, they are stored locally
            alongside your history and deleted according to the retention setting you choose. You
            can turn this off.
          </li>
          <li>
            <strong>History.</strong> Your transcriptions are stored locally so you can find them
            again. You can clear them in the app.
          </li>
          <li>
            <strong>Settings, snippets and custom words.</strong> Stored locally.
          </li>
          <li>
            <strong>API keys.</strong> If you add a key for an AI provider, it is stored in the
            Hush settings file on your Mac, not in the macOS Keychain. Anyone with access to your
            user account could read it, so treat it like any other local config file.
          </li>
        </ul>

        <h2>What can leave your Mac</h2>
        <ul>
          <li>
            <strong>AI clean-up (optional, off unless you enable it).</strong> If you choose a cloud
            provider such as Groq, OpenAI, Anthropic, OpenRouter, Cerebras or a custom
            OpenAI-compatible endpoint, the transcribed text (never the audio) is sent to that
            provider using your API key. Their privacy policy applies to that text. If you choose
            Apple Intelligence on a supported Mac, clean-up is handled by Apple&apos;s on-device
            model.
          </li>
          <li>
            <strong>Model downloads.</strong> When you download a speech model, Hush fetches it from
            Hugging Face or GitHub. Those services see a normal download request from your IP
            address, as with any download.
          </li>
        </ul>

        <h2>This website</h2>
        <p>
          This site is hosted on Vercel, which keeps standard server logs. The site uses no
          cookies, no analytics and no tracking scripts. Downloads are served by GitHub.
        </p>

        <h2>Deleting your data</h2>
        <p>
          Clear your history in the app, or quit Hush and delete{" "}
          <code>~/Library/Application Support/com.hush.software</code> to remove everything,
          including settings, keys, recordings and models.
        </p>

        <h2>Check for yourself</h2>
        <p>
          Hush is open source, so you can verify all of the above in the{" "}
          <a href={GITHUB_URL}>source code</a>. Questions? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <p className="text-small text-ink-subtle">Last updated: October 2026</p>
      </article>
    </MainContainer>
  )
}

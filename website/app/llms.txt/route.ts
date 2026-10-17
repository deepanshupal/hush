import { getLatestDownload } from "@/lib/github"
import { llmsTxt } from "@/lib/llms"

// Regenerated with the latest release, like the download page.
export const revalidate = 3600

export async function GET() {
  const download = await getLatestDownload()
  return new Response(llmsTxt(download), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}

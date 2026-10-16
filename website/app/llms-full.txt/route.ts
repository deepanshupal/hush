import { getLatestDownload } from "@/lib/github"
import { llmsFullTxt } from "@/lib/llms"

// Regenerated with the latest release, like the download page.
export const revalidate = 3600

export async function GET() {
  const download = await getLatestDownload()
  return new Response(llmsFullTxt(download), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}

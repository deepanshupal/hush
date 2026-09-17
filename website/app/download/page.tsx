import type { Metadata } from "next"
import DownloadClient from "./download-client"

export const metadata: Metadata = {
  title: "Download Hush for Mac",
  description:
    "Download Hush for macOS. Local voice-to-text, free for 14 days. macOS 14+, Apple Silicon.",
}

export default function DownloadPage() {
  return <DownloadClient />
}

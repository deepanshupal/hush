import type { Metadata } from "next"
import { AlternativePage } from "@/components/alternative-page"
import { pageMetadata } from "@/lib/metadata"

export const revalidate = 3600

export const metadata: Metadata = pageMetadata("altVoiceInk")

export default function Page() {
  return <AlternativePage id="altVoiceInk" />
}

import { OG_CONTENT_TYPE, OG_SIZE, ogAlt, ogImage } from "@/lib/og"

export const alt = ogAlt("altVoiceInk")
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage("altVoiceInk")
}

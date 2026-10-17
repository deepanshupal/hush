import { OG_CONTENT_TYPE, OG_SIZE, ogAlt, ogImage } from "@/lib/og"

export const alt = ogAlt("openSource")
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return ogImage("openSource")
}

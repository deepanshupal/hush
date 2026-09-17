import type { Metadata } from "next"
import LicenseClient from "./license-client"

export const metadata: Metadata = {
  title: "Get Hush - $19, lifetime",
  description:
    "Hush is a one-time $19 purchase: lifetime updates, up to 2 Macs, no account, no subscription. Free 14-day trial.",
}

export default function LicensePage() {
  return <LicenseClient />
}

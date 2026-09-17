import { redirect } from "next/navigation"

const CHECKOUT_URL =
  "https://hushsoftware.lemonsqueezy.com/checkout/buy/72913f87-9424-4556-8ac6-367fe647c770"

export default function PaymentPage() {
  redirect(CHECKOUT_URL)
}

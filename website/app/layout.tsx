import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  publisher: SITE_NAME,
  keywords: [
    "dictation",
    "speech to text",
    "voice typing",
    "Mac",
    "macOS",
    "open source",
    "free",
    "Wispr Flow alternative",
    "Superwhisper alternative",
    "on-device speech recognition",
    "Parakeet",
    "Whisper",
    "push to talk",
    "private dictation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#d4ccb8",
  colorScheme: "light",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "macOS (Apple Silicon)",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  license: "https://opensource.org/licenses/MIT",
  isAccessibleForFree: true,
  author: { "@type": "Person", name: AUTHOR_NAME },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}

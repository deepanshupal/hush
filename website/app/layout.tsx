import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { JsonLd } from "@/components/json-ld"
import { PAGES } from "@/lib/pages"
import { AUTHOR_NAME, AUTHOR_URL, BRAND, SITE_NAME, SITE_URL } from "@/lib/site"
import { siteJsonLd } from "@/lib/structured-data"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

// The serif used for every heading, including the hero h1. next/font preloads it
// and sizes the Georgia fallback to match, so the swap doesn't shift the layout.
const canela = localFont({
  src: "../assets/fonts/Canela-Light-Trial.otf",
  weight: "300",
  style: "normal",
  variable: "--font-canela",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
})

const home = PAGES.home

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: home.title,
    template: `%s · ${SITE_NAME}`,
  },
  description: home.description,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  creator: AUTHOR_NAME,
  publisher: SITE_NAME,
  category: "technology",
  keywords: [
    ...home.keywords,
    "Superwhisper alternative",
    "Parakeet",
    "Whisper",
    "macOS",
    "Apple Silicon",
  ],
  // Canonical URLs are set per page (lib/metadata.ts) so the 404 page has none.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: home.title,
    description: home.description,
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: { title: SITE_NAME, statusBarStyle: "default" },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND.page },
    { media: "(prefers-color-scheme: dark)", color: BRAND.ink },
  ],
  colorScheme: "light",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${canela.variable}`}>
      <body>
        <JsonLd data={siteJsonLd()} />
        {children}
      </body>
    </html>
  )
}

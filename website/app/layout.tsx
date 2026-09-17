import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hush",
  description:
    "Hush turns your voice into text, instantly, in any app. No cloud. No subscription. No one listening.",
  authors: [{ name: "Deepanshu" }],
  keywords: [
    "voice to text",
    "speech to text",
    "transcription",
    "macOS",
    "local",
    "privacy",
    "dictation",
    "voice typing",
    "on-device AI",
    "whisper",
    "voice notes",
    "transcribe",
    "speech recognition",
    "mac app",
    "voice recorder",
    "audio to text",
    "local first",
    "private dictation",
    "keyboard shortcut",
    "productivity",
  ],
  creator: "Deepanshu",
  publisher: "Hush",
  robots: "index, follow",
  openGraph: {
    title: "Hush",
    description:
      "Hush turns your voice into text, instantly, in any app. No cloud. No subscription. No one listening.",
    url: "https://hush.software",
    siteName: "Hush",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hush",
    description:
      "Hush turns your voice into text, instantly, in any app. No cloud. No subscription. No one listening.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://hush.software"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Hush",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "macOS",
              description:
                "Hush turns your voice into text, instantly, in any app. No cloud. No subscription. No one listening.",
              url: "https://hush.software",
              author: {
                "@type": "Person",
                name: "Deepanshu",
              },
              offers: {
                "@type": "Offer",
                price: "19",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${GeistMono.variable} ${fraunces.variable} font-sans antialiased overscroll-contain`}
      >
        {children}
      </body>
    </html>
  );
}

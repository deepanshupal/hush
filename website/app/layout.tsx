import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hush — Local Voice-to-Text for Mac",
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
    title: "Hush — Local Voice-to-Text for Mac",
    description:
      "Hush turns your voice into text, instantly, in any app. No cloud. No subscription. No one listening.",
    url: "https://hush.software",
    siteName: "Hush",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/vault0og.png",
        width: 4000,
        height: 2250,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hush — Local Voice-to-Text for Mac",
    description:
      "Hush turns your voice into text, instantly, in any app. No cloud. No subscription. No one listening.",
    images: ["/vault0og.png"],
  },
  icons: {
    icon: "/favicon.png",
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
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
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
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${GeistMono.variable} ${instrumentSerif.variable} font-sans antialiased overscroll-contain`}
      >
        {children}
      </body>
    </html>
  );
}

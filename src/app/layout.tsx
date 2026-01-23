import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import { AIAssistantProvider } from "@/components/ai-assistant";
import { CookieBanner } from "@/components/cookie-banner";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Orbli - Free Birth Chart & Astrology Calculators",
    template: "%s | Orbli",
  },
  description: "Free astrology app with birth chart calculator, daily horoscopes, AI astrologer chat, tarot readings, and personalized cosmic insights based on your natal chart.",
  keywords: "astrology, birth chart, natal chart, horoscope, zodiac signs, moon sign, rising sign, sun sign, tarot, synastry, compatibility",
  authors: [{ name: "Orbli" }],
  creator: "Orbli",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://orbli.app",
    siteName: "Orbli",
    title: "Orbli - Free Birth Chart & Astrology Calculators",
    description: "Free astrology app with birth chart calculator, daily horoscopes, AI astrologer chat, tarot readings, and personalized cosmic insights.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbli - Free Birth Chart & Astrology Calculators",
    description: "Free astrology app with birth chart calculator, daily horoscopes, AI astrologer chat, and tarot readings.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Organization schema for site-wide SEO
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Orbli',
  url: 'https://orbli.app',
  logo: 'https://orbli.app/orbli-logo.png',
  description: 'Free astrology app with birth chart calculator, daily horoscopes, AI astrologer chat, tarot readings, and personalized cosmic insights.',
  sameAs: [],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Orbli',
  url: 'https://orbli.app',
  description: 'Free astrology app with birth chart calculator, daily horoscopes, AI astrologer chat, tarot readings, and personalized cosmic insights.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://orbli.app/charts?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geist.className} ${fraunces.variable} antialiased`}
      >
        <AIAssistantProvider>
          {children}
        </AIAssistantProvider>
        <CookieBanner />
      </body>
    </html>
  );
}

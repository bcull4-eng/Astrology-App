import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import { AIAssistantProvider } from "@/components/ai-assistant";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} ${fraunces.variable} antialiased`}
      >
        <AIAssistantProvider>
          {children}
        </AIAssistantProvider>
      </body>
    </html>
  );
}

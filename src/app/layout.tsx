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
  title: "Orbli - Your Cosmic Blueprint",
  description: "Personalized astrology insights based on your natal chart",
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

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chinese Zodiac Calculator - Find Your Animal Sign & Element | Orbli',
  description: 'Calculate your Chinese zodiac animal sign based on your birth year. Discover your element, yin/yang polarity, personality traits, and compatibility.',
  keywords: 'chinese zodiac, chinese zodiac calculator, chinese animal sign, year of the dragon, chinese horoscope, sheng xiao',
}

export default function ChineseZodiacLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

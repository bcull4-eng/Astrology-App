import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Numerology Calculator - Life Path, Expression & Soul Urge Numbers | Orbli',
  description: 'Free numerology calculator. Calculate your Life Path number, Expression number, Soul Urge number, and more based on your name and birth date.',
  keywords: 'numerology calculator, life path number, expression number, soul urge number, numerology reading, name numerology',
}

export default function NumerologyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

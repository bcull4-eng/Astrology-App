import type { Metadata } from 'next'
import { getCalculatorBySlug } from '../data/calculators'

type Props = {
  params: Promise<{ calculatorSlug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { calculatorSlug } = await params
  const calculator = getCalculatorBySlug(calculatorSlug)

  if (!calculator) {
    return {
      title: 'Calculator Not Found | Orbli',
      description: 'The requested calculator could not be found.',
    }
  }

  return {
    title: calculator.metaTitle || `${calculator.title} | Orbli`,
    description: calculator.metaDescription || calculator.description,
    openGraph: {
      title: calculator.metaTitle || calculator.title,
      description: calculator.metaDescription || calculator.description,
      type: 'website',
      siteName: 'Orbli',
    },
    twitter: {
      card: 'summary_large_image',
      title: calculator.metaTitle || calculator.title,
      description: calculator.metaDescription || calculator.description,
    },
  }
}

export default function CalculatorLayout({ children }: Props) {
  return children
}

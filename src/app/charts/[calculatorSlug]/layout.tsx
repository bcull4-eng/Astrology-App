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
      url: `https://www.orbli.app/charts/${calculatorSlug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: calculator.metaTitle || calculator.title,
      description: calculator.metaDescription || calculator.description,
    },
    alternates: {
      canonical: `https://www.orbli.app/charts/${calculatorSlug}`,
    },
  }
}

export default async function CalculatorLayout({ params, children }: Props) {
  const { calculatorSlug } = await params
  const calculator = getCalculatorBySlug(calculatorSlug)

  // Build JSON-LD structured data
  const jsonLd: Record<string, unknown>[] = []

  // WebPage schema
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: calculator?.metaTitle || calculator?.title,
    description: calculator?.metaDescription || calculator?.description,
    url: `https://www.orbli.app/charts/${calculatorSlug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Orbli',
      url: 'https://www.orbli.app',
    },
  })

  // SoftwareApplication schema for the calculator
  if (calculator) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: calculator.title,
      description: calculator.description,
      url: `https://www.orbli.app/charts/${calculatorSlug}`,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
      },
    })
  }

  // FAQ schema if calculator has FAQs
  if (calculator?.seoContent?.faqs && calculator.seoContent.faqs.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: calculator.seoContent.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}

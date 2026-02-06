import { MetadataRoute } from 'next'
import { getAllCompatibilityPairs } from '@/lib/compatibility-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.orbli.app'

  // Calculator slugs
  const calculatorSlugs = [
    'sun-moon-rising-calculator',
    'birth-chart-calculator',
    'rising-sign-calculator',
    'moon-sign-calculator',
    'sun-sign-calculator',
    'venus-sign-calculator',
    'mars-sign-calculator',
    'mercury-sign-calculator',
    'jupiter-sign-calculator',
    'saturn-sign-calculator',
    'saturn-return-calculator',
    'north-node-calculator',
    'chiron-sign-calculator',
    'midheaven-calculator',
    'lilith-calculator',
    'part-of-fortune-calculator',
    'love-compatibility-calculator',
    'personal-planets-calculator',
    'moon-phase-calculator',
    'solar-return-calculator',
  ]

  // Static pages (excluding auth, dashboard, paywall - these shouldn't be indexed)
  const staticPages = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/charts', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/learn', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/reports', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/synastry', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/astrologist', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/tarot', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/legal/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  // Calculator pages
  const calculatorPages = calculatorSlugs.map((slug) => ({
    url: `/charts/${slug}`,
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  }))

  // Compatibility pages (78 unique pairs)
  const compatibilityPairs = getAllCompatibilityPairs()
  const compatibilityPages = [
    { url: '/compatibility', priority: 0.9, changeFrequency: 'monthly' as const },
    ...compatibilityPairs.map((pair) => ({
      url: `/compatibility/${pair}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
  ]

  const allPages = [...staticPages, ...calculatorPages, ...compatibilityPages]

  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { calculators, getCalculatorsByTier } from './data/calculators'

export const metadata: Metadata = {
  title: 'Free Astrology Calculators | Birth Chart, Moon Sign, Rising Sign & More',
  description: 'Free astrology calculators for your birth chart, Big 3, Moon sign, Rising sign, Venus sign, Saturn Return, and more. Instant, accurate results with detailed interpretations.',
  keywords: 'astrology calculator, birth chart calculator, moon sign calculator, rising sign calculator, big 3 calculator, venus sign, saturn return, natal chart',
}

// Tier display info
const tierInfo = [
  { tier: 1 as const, name: 'Most Popular', description: 'Start with these essential calculators' },
  { tier: 2 as const, name: 'Personal Planets', description: 'Discover your communication, love, and drive' },
  { tier: 3 as const, name: 'Special Points', description: 'Life purpose, healing, and career' },
  { tier: 4 as const, name: 'Compatibility & Timing', description: 'Relationships and life cycles' },
]

// Icons for each calculator type
const calculatorIcons: Record<string, string> = {
  'sun-moon-rising-calculator': '\u2600\ufe0f',  // Sun emoji for Big 3
  'birth-chart-calculator': '\u{1f52e}',  // Crystal ball
  'rising-sign-calculator': '\u2b06\ufe0f',  // Up arrow
  'moon-sign-calculator': '\u{1f319}',  // Crescent moon
  'sun-sign-calculator': '\u2600\ufe0f',  // Sun
  'venus-sign-calculator': '\u2640\ufe0f',  // Venus symbol
  'mars-sign-calculator': '\u2642\ufe0f',  // Mars symbol
  'mercury-sign-calculator': '\u263f\ufe0f',  // Mercury symbol
  'jupiter-sign-calculator': '\u2643\ufe0f',  // Jupiter symbol
  'saturn-sign-calculator': '\u2644\ufe0f',  // Saturn symbol
  'saturn-return-calculator': '\u{1f504}',  // Cycle arrows
  'north-node-calculator': '\u260a\ufe0f',  // Node symbol
  'chiron-sign-calculator': '\u26b7\ufe0f',  // Chiron symbol
  'midheaven-calculator': '\u{1f3af}',  // Target
  'lilith-calculator': '\u{1f311}',  // New moon (dark)
  'part-of-fortune-calculator': '\u2618\ufe0f',  // Shamrock/luck
  'love-compatibility-calculator': '\u2764\ufe0f',  // Heart
  'personal-planets-calculator': '\u2728',  // Sparkles
  'moon-phase-calculator': '\u{1f315}',  // Full moon
  'solar-return-calculator': '\u{1f382}',  // Birthday cake
}

export default function ChartsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-900/30 to-slate-900 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Free Astrology Calculators
          </h1>
          <p className="text-xl text-slate-300 text-center max-w-2xl mx-auto">
            Discover your cosmic blueprint with our accurate, instant astrology calculators.
            Find your Sun sign, Moon sign, Rising sign, and much more.
          </p>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {tierInfo.map(({ tier, name, description }) => {
          const tierCalculators = getCalculatorsByTier(tier)
          return (
            <section key={tier}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">{name}</h2>
                <p className="text-slate-400 mt-1">{description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tierCalculators.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/charts/${calc.slug}`}
                    className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-xl p-6 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">
                        {calculatorIcons[calc.slug] || '\u2728'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                          {calc.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                          {calc.description}
                        </p>
                        {calc.requiresTime && (
                          <span className="inline-block mt-2 text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                            Requires birth time
                          </span>
                        )}
                      </div>
                      <svg
                        className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-t from-indigo-900/30 to-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready for Your Full Astrological Profile?
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            These calculators are just the beginning. Create a free account to access your complete birth chart,
            daily personalized guidance, and in-depth astrological reports.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Get Your Full Birth Chart
            </Link>
            <Link
              href="/reports"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            >
              Explore Reports
            </Link>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert prose-slate max-w-none">
          <h2 className="text-xl font-semibold text-white">About Our Astrology Calculators</h2>
          <p className="text-slate-300 leading-relaxed">
            Our free astrology calculators use precise astronomical data to calculate your planetary positions accurately.
            Whether you're looking for your Sun sign, Moon sign, Rising sign, or want to explore your complete birth chart,
            our tools provide instant results with detailed interpretations.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Each calculator is designed to give you meaningful insights into different aspects of your astrological profile.
            From the Big 3 (Sun, Moon, Rising) that form the foundation of your cosmic identity, to specialized calculations
            like your Saturn Return timing or Part of Fortune placement, you'll find everything you need to explore astrology.
          </p>
          <h3 className="text-lg font-semibold text-white mt-6">Frequently Asked Questions</h3>
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-white">Do I need my birth time?</strong> Some calculators require your birth time for
            accuracy (like Rising sign and house placements), while others (like Sun sign) only need your birth date.
            We clearly mark which calculators need birth time.
          </p>
          <p className="text-slate-300 leading-relaxed">
            <strong className="text-white">How accurate are these calculators?</strong> Our calculators use professional-grade
            ephemeris data for precise planetary positions. For best results, use your exact birth time and location.
          </p>
        </div>
      </div>
    </div>
  )
}

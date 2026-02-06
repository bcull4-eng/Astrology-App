import { Metadata } from 'next'
import Link from 'next/link'
import {
  ZODIAC_SIGNS,
  SIGN_DISPLAY_NAMES,
  SIGN_SYMBOLS,
  SIGN_ELEMENTS,
  getAllCompatibilityPairs,
} from '@/lib/compatibility-data'

export const metadata: Metadata = {
  title: 'Zodiac Compatibility Calculator - Love & Relationship Match | Orbli',
  description: 'Find your zodiac compatibility! Check love, friendship, and relationship compatibility between all 12 zodiac signs. Free compatibility calculator with detailed analysis.',
  keywords: 'zodiac compatibility, love compatibility, astrology compatibility, zodiac signs compatibility, relationship compatibility',
}

const ELEMENT_COLORS = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-600 to-emerald-500',
  air: 'from-sky-400 to-blue-500',
  water: 'from-blue-500 to-indigo-600',
}

export default function CompatibilityPage() {
  const allPairs = getAllCompatibilityPairs()

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Zodiac Compatibility
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover how your zodiac sign matches with others in love, friendship, and life.
            Click any combination to see your detailed compatibility analysis.
          </p>
        </div>

        {/* Quick select grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Select Your Sign
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {ZODIAC_SIGNS.map((sign) => (
              <Link
                key={sign}
                href={`#${sign}`}
                className={`p-4 rounded-xl bg-gradient-to-br ${ELEMENT_COLORS[SIGN_ELEMENTS[sign]]} text-white text-center hover:scale-105 transition-transform`}
              >
                <span className="text-3xl block mb-1">{SIGN_SYMBOLS[sign]}</span>
                <span className="font-medium">{SIGN_DISPLAY_NAMES[sign]}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Compatibility matrix by sign */}
        {ZODIAC_SIGNS.map((sign) => (
          <section key={sign} id={sign} className="mb-12 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${ELEMENT_COLORS[SIGN_ELEMENTS[sign]]}`}>
                {SIGN_SYMBOLS[sign]}
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {SIGN_DISPLAY_NAMES[sign]} Compatibility
                </h2>
                <p className="text-white/60 capitalize">{SIGN_ELEMENTS[sign]} sign</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {ZODIAC_SIGNS.map((otherSign) => {
                const pair = ZODIAC_SIGNS.indexOf(sign) <= ZODIAC_SIGNS.indexOf(otherSign)
                  ? `${sign}-${otherSign}`
                  : `${otherSign}-${sign}`
                return (
                  <Link
                    key={otherSign}
                    href={`/compatibility/${pair}`}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{SIGN_SYMBOLS[otherSign]}</span>
                      <div>
                        <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                          {SIGN_DISPLAY_NAMES[otherSign]}
                        </p>
                        <p className="text-white/40 text-sm capitalize">
                          {SIGN_ELEMENTS[otherSign]}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}

        {/* SEO Content */}
        <section className="mt-16 prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Understanding Zodiac Compatibility
          </h2>
          <p className="text-white/70">
            Zodiac compatibility is based on the elemental and modal relationships between signs.
            Signs of the same element (Fire, Earth, Air, Water) typically understand each other well,
            while complementary elements can create dynamic and growth-oriented relationships.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">
            The Elements and Compatibility
          </h3>
          <ul className="text-white/70 space-y-2">
            <li><strong className="text-red-400">Fire Signs (Aries, Leo, Sagittarius):</strong> Passionate and energetic, fire signs match well with air signs who fan their flames, and other fire signs who match their intensity.</li>
            <li><strong className="text-green-400">Earth Signs (Taurus, Virgo, Capricorn):</strong> Practical and grounded, earth signs find harmony with water signs who nurture them, and other earth signs who share their values.</li>
            <li><strong className="text-sky-400">Air Signs (Gemini, Libra, Aquarius):</strong> Intellectual and social, air signs connect with fire signs who inspire them, and other air signs who stimulate their minds.</li>
            <li><strong className="text-blue-400">Water Signs (Cancer, Scorpio, Pisces):</strong> Emotional and intuitive, water signs bond with earth signs who stabilize them, and other water signs who understand their depths.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">
            Beyond Sun Sign Compatibility
          </h3>
          <p className="text-white/70">
            While Sun sign compatibility offers valuable insights, a complete compatibility analysis
            considers Moon signs (emotional compatibility), Venus signs (love style), Mars signs (passion and conflict),
            and the aspects between your full birth charts. Use our <Link href="/charts/love-compatibility-calculator" className="text-indigo-400 hover:underline">Love Compatibility Calculator</Link> for
            a more detailed analysis.
          </p>
        </section>
      </div>
    </div>
  )
}

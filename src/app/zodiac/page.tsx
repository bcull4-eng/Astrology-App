import { Metadata } from 'next'
import Link from 'next/link'
import { ZODIAC_SIGNS, ZODIAC_DATA } from '@/lib/zodiac-data'

export const metadata: Metadata = {
  title: 'All 12 Zodiac Signs - Personality Traits, Dates & Compatibility | Orbli',
  description: 'Explore all 12 zodiac signs. Learn about personality traits, strengths, weaknesses, love compatibility, and more for Aries through Pisces.',
  keywords: 'zodiac signs, astrology signs, horoscope signs, all zodiac signs, zodiac personality traits',
}

const ELEMENT_COLORS = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-600 to-emerald-500',
  air: 'from-sky-400 to-blue-500',
  water: 'from-blue-500 to-indigo-600',
}

const ELEMENT_BG = {
  fire: 'bg-red-500/10 border-red-500/30',
  earth: 'bg-green-500/10 border-green-500/30',
  air: 'bg-sky-500/10 border-sky-500/30',
  water: 'bg-blue-500/10 border-blue-500/30',
}

export default function ZodiacSignsPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            The 12 Zodiac Signs
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover the unique personality traits, strengths, and characteristics of each zodiac sign.
            Click any sign to explore its full profile.
          </p>
        </div>

        {/* Elements Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['fire', 'earth', 'air', 'water'] as const).map((element) => (
            <div key={element} className={`px-4 py-2 rounded-full border ${ELEMENT_BG[element]}`}>
              <span className="text-white capitalize">{element} Signs</span>
            </div>
          ))}
        </div>

        {/* Zodiac Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ZODIAC_SIGNS.map((sign) => {
            const data = ZODIAC_DATA[sign]
            return (
              <Link
                key={sign}
                href={`/zodiac/${sign}`}
                className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${ELEMENT_COLORS[data.element]} text-white shrink-0`}>
                    <span className="text-3xl">{data.symbol}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {data.name}
                    </h2>
                    <p className="text-white/60 text-sm mb-2">{data.dateRange}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {data.traits.slice(0, 3).map((trait) => (
                        <span key={trait} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/70">
                          {trait}
                        </span>
                      ))}
                    </div>
                    <p className="text-white/50 text-sm capitalize">
                      {data.element} • {data.modality} • {data.rulingPlanet}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* SEO Content */}
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Understanding the Zodiac Signs
          </h2>
          <p className="text-white/70 mb-6">
            The zodiac is divided into 12 signs, each representing a 30-degree arc of the sky that the Sun
            travels through during the year. Your Sun sign, determined by your birth date, reveals your
            core personality, ego, and sense of self.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">The Four Elements</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className={`p-4 rounded-xl border ${ELEMENT_BG.fire}`}>
              <h4 className="text-red-400 font-semibold mb-2">Fire Signs: Aries, Leo, Sagittarius</h4>
              <p className="text-white/70 text-sm">
                Passionate, dynamic, and temperamental. Fire signs are driven by inspiration and can be
                impulsive but are natural leaders.
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${ELEMENT_BG.earth}`}>
              <h4 className="text-green-400 font-semibold mb-2">Earth Signs: Taurus, Virgo, Capricorn</h4>
              <p className="text-white/70 text-sm">
                Grounded, practical, and reliable. Earth signs are focused on the material world and
                building lasting foundations.
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${ELEMENT_BG.air}`}>
              <h4 className="text-sky-400 font-semibold mb-2">Air Signs: Gemini, Libra, Aquarius</h4>
              <p className="text-white/70 text-sm">
                Intellectual, communicative, and social. Air signs are thinkers who value ideas,
                relationships, and mental stimulation.
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${ELEMENT_BG.water}`}>
              <h4 className="text-blue-400 font-semibold mb-2">Water Signs: Cancer, Scorpio, Pisces</h4>
              <p className="text-white/70 text-sm">
                Emotional, intuitive, and sensitive. Water signs are deeply connected to their feelings
                and have strong psychic abilities.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">The Three Modalities</h3>
          <ul className="text-white/70 space-y-2">
            <li>
              <strong className="text-white">Cardinal (Aries, Cancer, Libra, Capricorn):</strong> Initiators
              who start new things and lead the way into each season.
            </li>
            <li>
              <strong className="text-white">Fixed (Taurus, Leo, Scorpio, Aquarius):</strong> Stabilizers
              who maintain and build upon what has been started.
            </li>
            <li>
              <strong className="text-white">Mutable (Gemini, Virgo, Sagittarius, Pisces):</strong> Adapters
              who bring change and prepare for transitions.
            </li>
          </ul>

          <div className="mt-12 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Want to Know Your Full Chart?</h3>
            <p className="text-white/60 mb-4">
              Your Sun sign is just the beginning. Discover your Moon, Rising, and all planetary placements.
            </p>
            <Link
              href="/charts/birth-chart-calculator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Calculate Your Birth Chart
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

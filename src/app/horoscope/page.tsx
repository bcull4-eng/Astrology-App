import { Metadata } from 'next'
import Link from 'next/link'
import { ZODIAC_SIGNS, ZODIAC_DATA } from '@/lib/zodiac-data'
import { generateDailyHoroscope, getFormattedDate } from '@/lib/horoscope-data'
import { Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Daily Horoscope - Free Horoscopes for All 12 Zodiac Signs | Orbli',
  description: 'Read your free daily horoscope for all 12 zodiac signs. Get personalized insights on love, career, and health updated every day.',
  keywords: 'daily horoscope, free horoscope, today horoscope, zodiac horoscope, astrology predictions',
}

export const revalidate = 3600 // Revalidate every hour

const ELEMENT_COLORS = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-600 to-emerald-500',
  air: 'from-sky-400 to-blue-500',
  water: 'from-blue-500 to-indigo-600',
}

export default function HoroscopePage() {
  const today = new Date()
  const formattedDate = getFormattedDate(today)

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-indigo-400 mb-2">{formattedDate}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Daily Horoscope
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Your personalized cosmic guidance for today. Select your zodiac sign to read your full horoscope.
          </p>
        </div>

        {/* Horoscope Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ZODIAC_SIGNS.map((sign) => {
            const data = ZODIAC_DATA[sign]
            const horoscope = generateDailyHoroscope(sign, today)

            return (
              <Link
                key={sign}
                href={`/horoscope/${sign}`}
                className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${ELEMENT_COLORS[data.element]} text-white shrink-0`}>
                    <span className="text-2xl">{data.symbol}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {data.name}
                    </h2>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < horoscope.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-white/70 text-sm line-clamp-3 mb-3">
                  {horoscope.overall}
                </p>

                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span>Lucky: {horoscope.luckyNumber}</span>
                  <span>•</span>
                  <span>{horoscope.luckyColor}</span>
                  <span>•</span>
                  <span>{horoscope.mood}</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* SEO Content */}
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-white mb-4">
            About Daily Horoscopes
          </h2>
          <p className="text-white/70 mb-6">
            Your daily horoscope provides guidance based on the current positions of the planets and their
            interactions with your zodiac sign. While Sun sign horoscopes offer general insights, they can
            help you navigate your day with greater awareness.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">
            How to Read Your Horoscope
          </h3>
          <ul className="text-white/70 space-y-2">
            <li>
              <strong className="text-white">Sun Sign:</strong> Read for your main zodiac sign based on your birth date.
            </li>
            <li>
              <strong className="text-white">Rising Sign:</strong> If you know your rising sign, read that horoscope too
              for a more complete picture.
            </li>
            <li>
              <strong className="text-white">Moon Sign:</strong> Your moon sign horoscope reveals your emotional forecast
              for the day.
            </li>
          </ul>

          <div className="mt-12 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Don't Know Your Rising Sign?</h3>
            <p className="text-white/60 mb-4">
              Calculate your complete birth chart to discover your Rising, Moon, and all planetary placements.
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

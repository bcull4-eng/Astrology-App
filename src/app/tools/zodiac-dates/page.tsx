import { Metadata } from 'next'
import Link from 'next/link'
import { ZODIAC_SIGNS, ZODIAC_DATA } from '@/lib/zodiac-data'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Zodiac Sign Dates - What Sign Am I? Find Your Zodiac Sign | Orbli',
  description: 'Find your zodiac sign based on your birthday. Complete list of zodiac sign dates, date ranges, and when each sign starts and ends.',
  keywords: 'zodiac sign dates, what sign am i, zodiac dates, star sign dates, horoscope dates, when does aries start',
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

export default function ZodiacDatesPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Zodiac Sign Dates
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Find your zodiac sign based on your birthday. Each sign spans approximately one month of the year.
          </p>
        </div>

        {/* Quick Finder */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 mb-12 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">What's My Zodiac Sign?</h2>
          <p className="text-white/70 mb-4">
            Find your sign in the list below based on your birth date, or use our calculator for precise results
            (important if you're born on a cusp day).
          </p>
          <Link
            href="/charts/sun-sign-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Calculate My Sun Sign
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Zodiac Dates Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">All Zodiac Sign Dates</h2>
          <div className="space-y-4">
            {ZODIAC_SIGNS.map((sign) => {
              const data = ZODIAC_DATA[sign]
              return (
                <Link
                  key={sign}
                  href={`/zodiac/${sign}`}
                  className={`flex items-center justify-between p-5 rounded-xl border ${ELEMENT_BG[data.element]} hover:scale-[1.02] transition-transform`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${ELEMENT_COLORS[data.element]} text-white`}>
                      <span className="text-2xl">{data.symbol}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{data.name}</h3>
                      <p className="text-white/60 text-sm capitalize">{data.element} sign • {data.modality}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{data.dateRange}</p>
                    <p className="text-white/50 text-sm">Ruled by {data.rulingPlanet}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Cusp Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Born on the Cusp?</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-white/70 mb-4">
              If you were born within a few days of when one sign ends and another begins, you're "on the cusp."
              The exact moment the Sun changes signs varies each year, so you'll need to check the exact date and
              time for your birth year.
            </p>
            <p className="text-white/70">
              People born on the cusp often feel they have traits of both signs. While you technically have one
              Sun sign, you may resonate with qualities of your neighboring sign as well.
            </p>
          </div>
        </section>

        {/* Elements Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Signs by Element</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`p-5 rounded-xl border ${ELEMENT_BG.fire}`}>
              <h3 className="text-red-400 font-semibold mb-3">Fire Signs</h3>
              <ul className="space-y-2">
                <li className="text-white/70">♈ Aries: March 21 - April 19</li>
                <li className="text-white/70">♌ Leo: July 23 - August 22</li>
                <li className="text-white/70">♐ Sagittarius: November 22 - December 21</li>
              </ul>
            </div>
            <div className={`p-5 rounded-xl border ${ELEMENT_BG.earth}`}>
              <h3 className="text-green-400 font-semibold mb-3">Earth Signs</h3>
              <ul className="space-y-2">
                <li className="text-white/70">♉ Taurus: April 20 - May 20</li>
                <li className="text-white/70">♍ Virgo: August 23 - September 22</li>
                <li className="text-white/70">♑ Capricorn: December 22 - January 19</li>
              </ul>
            </div>
            <div className={`p-5 rounded-xl border ${ELEMENT_BG.air}`}>
              <h3 className="text-sky-400 font-semibold mb-3">Air Signs</h3>
              <ul className="space-y-2">
                <li className="text-white/70">♊ Gemini: May 21 - June 20</li>
                <li className="text-white/70">♎ Libra: September 23 - October 22</li>
                <li className="text-white/70">♒ Aquarius: January 20 - February 18</li>
              </ul>
            </div>
            <div className={`p-5 rounded-xl border ${ELEMENT_BG.water}`}>
              <h3 className="text-blue-400 font-semibold mb-3">Water Signs</h3>
              <ul className="space-y-2">
                <li className="text-white/70">♋ Cancer: June 21 - July 22</li>
                <li className="text-white/70">♏ Scorpio: October 23 - November 21</li>
                <li className="text-white/70">♓ Pisces: February 19 - March 20</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="prose prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Frequently Asked Questions</h2>

          <h3 className="text-lg font-semibold text-white mt-6 mb-2">Why do zodiac date ranges vary?</h3>
          <p className="text-white/70">
            The Sun doesn't change signs at the exact same moment each year because the Earth's orbit isn't
            perfectly aligned with our calendar. That's why some sources give slightly different dates.
          </p>

          <h3 className="text-lg font-semibold text-white mt-6 mb-2">What if I'm born on a cusp?</h3>
          <p className="text-white/70">
            Use a precise birth chart calculator with your exact birth time to determine your true Sun sign.
            You have one Sun sign, but may feel influences from your neighboring sign.
          </p>

          <h3 className="text-lg font-semibold text-white mt-6 mb-2">Is my Sun sign the only one that matters?</h3>
          <p className="text-white/70">
            No! Your Moon sign, Rising sign, and other planetary placements are equally important. Your Sun sign
            represents your core identity, but your full birth chart tells the complete story.
          </p>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Discover Your Complete Birth Chart</h3>
          <p className="text-white/60 mb-4">
            Your Sun sign is just the beginning. Find your Moon, Rising, and all planetary placements.
          </p>
          <Link
            href="/charts/birth-chart-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Get Your Full Birth Chart
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ZODIAC_SIGNS, ZODIAC_DATA, type ZodiacSign } from '@/lib/zodiac-data'
import { generateDailyHoroscope, getFormattedDate } from '@/lib/horoscope-data'
import { Heart, Briefcase, Activity, Star, ChevronRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ sign: string }>
}

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  return ZODIAC_SIGNS.map((sign) => ({ sign }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sign } = await params
  const data = ZODIAC_DATA[sign as ZodiacSign]

  if (!data) {
    return { title: 'Horoscope Not Found' }
  }

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return {
    title: `${data.name} Daily Horoscope - ${dateStr} | Orbli`,
    description: `Read today's ${data.name} horoscope. Get your daily predictions for love, career, health, and more. Free ${data.name} horoscope updated daily.`,
    keywords: `${data.name.toLowerCase()} horoscope, ${data.name.toLowerCase()} daily horoscope, ${data.name.toLowerCase()} today, ${data.name.toLowerCase()} horoscope today`,
  }
}

const ELEMENT_COLORS = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-600 to-emerald-500',
  air: 'from-sky-400 to-blue-500',
  water: 'from-blue-500 to-indigo-600',
}

export default async function HoroscopeSignPage({ params }: PageProps) {
  const { sign } = await params
  const data = ZODIAC_DATA[sign as ZodiacSign]

  if (!data) {
    notFound()
  }

  const today = new Date()
  const formattedDate = getFormattedDate(today)
  const horoscope = generateDailyHoroscope(sign as ZodiacSign, today)

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-white/60">
            <li><Link href="/horoscope" className="hover:text-white">Daily Horoscope</Link></li>
            <li>/</li>
            <li className="text-white">{data.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <p className="text-indigo-400 mb-4">{formattedDate}</p>
          <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${ELEMENT_COLORS[data.element]} text-white mb-6`}>
            <span className="text-5xl">{data.symbol}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            {data.name} Daily Horoscope
          </h1>
          <p className="text-white/60">{data.dateRange}</p>

          {/* Rating */}
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < horoscope.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-white/20'
                }`}
              />
            ))}
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-white/60 text-sm mb-1">Lucky Number</p>
            <p className="text-2xl font-bold text-white">{horoscope.luckyNumber}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-white/60 text-sm mb-1">Lucky Color</p>
            <p className="text-lg font-semibold text-white">{horoscope.luckyColor}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-white/60 text-sm mb-1">Mood</p>
            <p className="text-lg font-semibold text-white">{horoscope.mood}</p>
          </div>
        </div>

        {/* Overall */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Today's Overview</h2>
          <p className="text-white/80 leading-relaxed text-lg">{horoscope.overall}</p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-pink-400" />
              <h3 className="text-lg font-semibold text-pink-400">Love</h3>
            </div>
            <p className="text-white/80 leading-relaxed">{horoscope.love}</p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-amber-400">Career</h3>
            </div>
            <p className="text-white/80 leading-relaxed">{horoscope.career}</p>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-emerald-400">Health</h3>
            </div>
            <p className="text-white/80 leading-relaxed">{horoscope.health}</p>
          </div>
        </div>

        {/* About This Sign */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">About {data.name}</h2>
          <p className="text-white/70 leading-relaxed mb-4">{data.description}</p>
          <Link
            href={`/zodiac/${sign}`}
            className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Learn more about {data.name}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-xl font-semibold text-white mb-2">Get a Personalized Reading</h3>
          <p className="text-white/60 mb-4">
            Your daily horoscope is based on your Sun sign. Get a complete reading with your full birth chart.
          </p>
          <Link
            href="/charts/birth-chart-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Get Your Full Birth Chart
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Other Signs */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">Other Horoscopes</h3>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {ZODIAC_SIGNS.filter((s) => s !== sign).map((otherSign) => (
              <Link
                key={otherSign}
                href={`/horoscope/${otherSign}`}
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition-all text-center"
              >
                <span className="text-2xl block mb-1">{ZODIAC_DATA[otherSign].symbol}</span>
                <span className="text-white text-xs">{ZODIAC_DATA[otherSign].name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

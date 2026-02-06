import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ZODIAC_SIGNS, ZODIAC_DATA, type ZodiacSign } from '@/lib/zodiac-data'
import { Heart, Briefcase, Users, Star, ChevronRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ sign: string }>
}

export async function generateStaticParams() {
  return ZODIAC_SIGNS.map((sign) => ({ sign }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sign } = await params
  const data = ZODIAC_DATA[sign as ZodiacSign]

  if (!data) {
    return { title: 'Sign Not Found' }
  }

  return {
    title: `${data.name} Zodiac Sign - Personality, Traits & Compatibility | Orbli`,
    description: `Everything about ${data.name} (${data.dateRange}). Discover ${data.name} personality traits, love compatibility, career strengths, and famous ${data.name}s.`,
    keywords: `${data.name.toLowerCase()}, ${data.name.toLowerCase()} zodiac, ${data.name.toLowerCase()} personality, ${data.name.toLowerCase()} traits, ${data.name.toLowerCase()} compatibility`,
  }
}

const ELEMENT_COLORS = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-600 to-emerald-500',
  air: 'from-sky-400 to-blue-500',
  water: 'from-blue-500 to-indigo-600',
}

const ELEMENT_TEXT = {
  fire: 'text-red-400',
  earth: 'text-green-400',
  air: 'text-sky-400',
  water: 'text-blue-400',
}

export default async function ZodiacSignPage({ params }: PageProps) {
  const { sign } = await params
  const data = ZODIAC_DATA[sign as ZodiacSign]

  if (!data) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-white/60">
            <li><Link href="/zodiac" className="hover:text-white">Zodiac Signs</Link></li>
            <li>/</li>
            <li className="text-white">{data.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-br ${ELEMENT_COLORS[data.element]} text-white mb-6`}>
            <span className="text-7xl">{data.symbol}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
            {data.name}
          </h1>
          <p className="text-xl text-white/60 mb-4">{data.dateRange}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className={`px-3 py-1 rounded-full bg-white/10 ${ELEMENT_TEXT[data.element]} capitalize`}>
              {data.element} Element
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 capitalize">
              {data.modality}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/70">
              Ruled by {data.rulingPlanet}
            </span>
          </div>
        </header>

        {/* Key Traits */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {data.traits.map((trait) => (
            <span
              key={trait}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-lg text-white/80 leading-relaxed">{data.description}</p>
        </div>

        {/* Personality Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            {data.name} Personality
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/80 leading-relaxed mb-6">{data.personality}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-emerald-400 font-semibold mb-3">Strengths</h3>
                <ul className="space-y-2">
                  {data.strengths.map((strength) => (
                    <li key={strength} className="flex items-start gap-2 text-white/70">
                      <span className="text-emerald-400 mt-1">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-amber-400 font-semibold mb-3">Weaknesses</h3>
                <ul className="space-y-2">
                  {data.weaknesses.map((weakness) => (
                    <li key={weakness} className="flex items-start gap-2 text-white/70">
                      <span className="text-amber-400 mt-1">!</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Love Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-400" />
            {data.name} in Love
          </h2>
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-6">
            <p className="text-white/80 leading-relaxed mb-6">{data.inLove}</p>
            <p className="text-white/70 italic mb-6">{data.loveStyle}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-emerald-400 font-semibold mb-3">Best Matches</h3>
                <div className="flex flex-wrap gap-2">
                  {data.compatibleSigns.map((compatSign) => (
                    <Link
                      key={compatSign}
                      href={`/zodiac/${compatSign}`}
                      className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                    >
                      {ZODIAC_DATA[compatSign].symbol} {ZODIAC_DATA[compatSign].name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-red-400 font-semibold mb-3">Challenging Matches</h3>
                <div className="flex flex-wrap gap-2">
                  {data.leastCompatible.map((incompatSign) => (
                    <Link
                      key={incompatSign}
                      href={`/zodiac/${incompatSign}`}
                      className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      {ZODIAC_DATA[incompatSign].symbol} {ZODIAC_DATA[incompatSign].name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Career Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-amber-400" />
            {data.name} at Work
          </h2>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
            <p className="text-white/80 leading-relaxed mb-4">{data.atWork}</p>
            <p className="text-white/70">{data.careerStrengths}</p>
          </div>
        </section>

        {/* Lucky Things */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Lucky for {data.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/60 text-sm mb-1">Lucky Day</p>
              <p className="text-white font-semibold">{data.luckyDay}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/60 text-sm mb-1">Lucky Numbers</p>
              <p className="text-white font-semibold">{data.luckyNumbers.join(', ')}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/60 text-sm mb-1">Lucky Colors</p>
              <p className="text-white font-semibold">{data.luckyColors.join(', ')}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/60 text-sm mb-1">Tarot Card</p>
              <p className="text-white font-semibold">{data.tarotCard}</p>
            </div>
          </div>
        </section>

        {/* Famous People */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Famous {data.name}s</h2>
          <div className="flex flex-wrap gap-3">
            {data.celebrities.map((celeb) => (
              <span
                key={celeb}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80"
              >
                {celeb}
              </span>
            ))}
          </div>
        </section>

        {/* Body & Health */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Body Rulership</h2>
          <p className="text-white/70">
            In medical astrology, {data.name} rules the <strong className="text-white">{data.bodyPart}</strong>.
            Pay special attention to this area of your body and take preventive care.
          </p>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-xl font-semibold text-white mb-2">Discover More About Your Chart</h3>
          <p className="text-white/60 mb-4">
            Your {data.name} Sun sign is just part of your cosmic story. Explore your full birth chart.
          </p>
          <Link
            href="/charts/birth-chart-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Get Your Full Birth Chart
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Related Signs */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">Explore Other Signs</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {ZODIAC_SIGNS.filter((s) => s !== sign).slice(0, 6).map((otherSign) => (
              <Link
                key={otherSign}
                href={`/zodiac/${otherSign}`}
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition-all text-center"
              >
                <span className="text-2xl block mb-1">{ZODIAC_DATA[otherSign].symbol}</span>
                <span className="text-white text-sm">{ZODIAC_DATA[otherSign].name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import {
  getCompatibilityData,
  isValidPair,
  normalizePair,
  getAllCompatibilityPairs,
  SIGN_DISPLAY_NAMES,
  SIGN_SYMBOLS,
  SIGN_ELEMENTS,
  ZODIAC_SIGNS,
  type ZodiacSign,
} from '@/lib/compatibility-data'
import { Heart, Users, MessageCircle, Shield, Star, ChevronRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ pair: string }>
}

export async function generateStaticParams() {
  return getAllCompatibilityPairs().map((pair) => ({ pair }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pair } = await params
  const data = getCompatibilityData(pair)

  if (!data) {
    return { title: 'Compatibility Not Found' }
  }

  const name1 = SIGN_DISPLAY_NAMES[data.sign1]
  const name2 = SIGN_DISPLAY_NAMES[data.sign2]
  const title = data.sign1 === data.sign2
    ? `${name1} and ${name2} Compatibility - Two ${name1}s in Love`
    : `${name1} and ${name2} Compatibility - Love & Relationship Match`

  return {
    title: `${title} | Orbli`,
    description: `Are ${name1} and ${name2} compatible? Discover your compatibility score, strengths, challenges, and relationship advice. Free zodiac compatibility analysis.`,
    keywords: `${name1.toLowerCase()} ${name2.toLowerCase()} compatibility, ${name1.toLowerCase()} and ${name2.toLowerCase()}, zodiac compatibility, ${name1.toLowerCase()} compatibility, ${name2.toLowerCase()} compatibility`,
  }
}

const ELEMENT_COLORS = {
  fire: 'from-red-500 to-orange-500',
  earth: 'from-green-600 to-emerald-500',
  air: 'from-sky-400 to-blue-500',
  water: 'from-blue-500 to-indigo-600',
}

function ScoreBar({ label, score, icon: Icon }: { label: string; score: number; icon: React.ElementType }) {
  const color = score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/80">
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </div>
        <span className="text-white font-semibold">{score}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

export default async function CompatibilityPairPage({ params }: PageProps) {
  const { pair } = await params

  // Check if pair is valid
  if (!isValidPair(pair)) {
    notFound()
  }

  // Normalize the pair (redirect leo-aries to aries-leo)
  const parts = pair.split('-')
  const normalized = normalizePair(parts[0], parts[1])
  if (normalized && normalized !== pair) {
    redirect(`/compatibility/${normalized}`)
  }

  const data = getCompatibilityData(pair)
  if (!data) {
    notFound()
  }

  const name1 = SIGN_DISPLAY_NAMES[data.sign1]
  const name2 = SIGN_DISPLAY_NAMES[data.sign2]
  const symbol1 = SIGN_SYMBOLS[data.sign1]
  const symbol2 = SIGN_SYMBOLS[data.sign2]
  const el1 = SIGN_ELEMENTS[data.sign1]
  const el2 = SIGN_ELEMENTS[data.sign2]
  const isSameSign = data.sign1 === data.sign2

  // Get related compatibilities
  const relatedPairs = ZODIAC_SIGNS
    .filter((s) => s !== data.sign1 && s !== data.sign2)
    .slice(0, 4)
    .map((s) => ({
      sign: s,
      pair: normalizePair(data.sign1, s),
    }))

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-white/60">
            <li><Link href="/compatibility" className="hover:text-white">Compatibility</Link></li>
            <li>/</li>
            <li className="text-white">{name1} & {name2}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${ELEMENT_COLORS[el1]} text-white`}>
              <span className="text-5xl">{symbol1}</span>
            </div>
            <Heart className="w-8 h-8 text-pink-500" />
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${ELEMENT_COLORS[el2]} text-white`}>
              <span className="text-5xl">{symbol2}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            {name1} and {name2} Compatibility
          </h1>
          <p className="text-white/60">
            {isSameSign ? `Two ${name1}s` : `${el1} meets ${el2}`} — How compatible are they?
          </p>
        </header>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 mb-8 text-center">
          <p className="text-white/60 mb-2">Overall Compatibility</p>
          <div className="text-6xl font-bold text-white mb-2">{data.overallScore}%</div>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(data.overallScore / 20)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Compatibility Breakdown</h2>
          <div className="space-y-4">
            <ScoreBar label="Love & Romance" score={data.loveScore} icon={Heart} />
            <ScoreBar label="Friendship" score={data.friendshipScore} icon={Users} />
            <ScoreBar label="Communication" score={data.communicationScore} icon={MessageCircle} />
            <ScoreBar label="Trust" score={data.trustScore} icon={Shield} />
          </div>
        </div>

        {/* Summary */}
        <div className="prose prose-invert max-w-none mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {name1} and {name2}: The Overview
          </h2>
          <p className="text-white/80 leading-relaxed">{data.summary}</p>
        </div>

        {/* Strengths & Challenges */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Strengths</h3>
            <ul className="space-y-3">
              {data.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <span className="text-emerald-400 mt-1">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Challenges</h3>
            <ul className="space-y-3">
              {data.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80">
                  <span className="text-amber-400 mt-1">!</span>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Love Advice */}
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-pink-400 mb-4">Love Advice for {name1} & {name2}</h3>
          <p className="text-white/80 leading-relaxed">{data.loveAdvice}</p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-xl font-semibold text-white mb-2">Want a Deeper Analysis?</h3>
          <p className="text-white/60 mb-4">
            Get a complete compatibility reading based on your full birth charts
          </p>
          <Link
            href="/charts/love-compatibility-calculator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Full Compatibility Calculator
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Related Compatibilities */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">
            More {name1} Compatibility
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedPairs.map(({ sign, pair: relPair }) => (
              <Link
                key={sign}
                href={`/compatibility/${relPair}`}
                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition-all text-center"
              >
                <span className="text-2xl block mb-1">{SIGN_SYMBOLS[sign as ZodiacSign]}</span>
                <span className="text-white font-medium">{SIGN_DISPLAY_NAMES[sign as ZodiacSign]}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

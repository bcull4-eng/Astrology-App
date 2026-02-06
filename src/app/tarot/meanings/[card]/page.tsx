import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTarotCard, getAllTarotCardIds, ALL_TAROT_CARDS } from '@/lib/tarot-data'
import { Heart, Briefcase, CheckCircle, XCircle, HelpCircle, ChevronRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ card: string }>
}

export async function generateStaticParams() {
  return getAllTarotCardIds().map((card) => ({ card }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { card: cardId } = await params
  const card = getTarotCard(cardId)

  if (!card) {
    return { title: 'Card Not Found' }
  }

  return {
    title: `${card.name} Tarot Card Meaning - Upright & Reversed | Orbli`,
    description: `Learn the meaning of ${card.name} tarot card. Discover upright and reversed interpretations, love and career readings, and symbolism. ${card.keywords.join(', ')}.`,
    keywords: `${card.name.toLowerCase()}, ${card.name.toLowerCase()} tarot, ${card.name.toLowerCase()} meaning, tarot card meaning`,
  }
}

const SUIT_COLORS = {
  major: 'from-purple-500 to-indigo-600',
  wands: 'from-red-500 to-orange-500',
  cups: 'from-blue-500 to-cyan-500',
  swords: 'from-gray-400 to-slate-500',
  pentacles: 'from-yellow-500 to-amber-500',
}

const SUIT_TEXT = {
  major: 'text-purple-400',
  wands: 'text-red-400',
  cups: 'text-blue-400',
  swords: 'text-gray-400',
  pentacles: 'text-yellow-400',
}

export default async function TarotCardPage({ params }: PageProps) {
  const { card: cardId } = await params
  const card = getTarotCard(cardId)

  if (!card) {
    notFound()
  }

  const suitName = card.suit === 'major' ? 'Major Arcana' : `Suit of ${card.suit.charAt(0).toUpperCase() + card.suit.slice(1)}`

  // Get adjacent cards for navigation
  const allIds = getAllTarotCardIds()
  const currentIndex = allIds.indexOf(cardId)
  const prevCard = currentIndex > 0 ? getTarotCard(allIds[currentIndex - 1]) : null
  const nextCard = currentIndex < allIds.length - 1 ? getTarotCard(allIds[currentIndex + 1]) : null

  // Get related cards from same suit
  const relatedCards = ALL_TAROT_CARDS
    .filter((c) => c.suit === card.suit && c.id !== card.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-white/60">
            <li><Link href="/tarot/meanings" className="hover:text-white">Tarot Meanings</Link></li>
            <li>/</li>
            <li><Link href={`/tarot/meanings#${card.suit === 'major' ? 'major-arcana' : card.suit}`} className="hover:text-white">{suitName}</Link></li>
            <li>/</li>
            <li className="text-white">{card.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${SUIT_COLORS[card.suit]} text-white mb-6`}>
            <span className="text-4xl font-serif">{typeof card.number === 'number' ? card.number : card.number.charAt(0)}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            {card.name}
          </h1>
          <p className={`${SUIT_TEXT[card.suit]} mb-4`}>{suitName}</p>

          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-2">
            {card.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </header>

        {/* Quick Info */}
        {(card.element || card.astrologicalSign || card.planet) && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {card.element && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-white/60 text-sm mb-1">Element</p>
                <p className="text-white font-semibold">{card.element}</p>
              </div>
            )}
            {card.astrologicalSign && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-white/60 text-sm mb-1">Zodiac</p>
                <p className="text-white font-semibold">{card.astrologicalSign}</p>
              </div>
            )}
            {card.planet && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-white/60 text-sm mb-1">Planet</p>
                <p className="text-white font-semibold">{card.planet}</p>
              </div>
            )}
          </div>
        )}

        {/* Yes or No */}
        <div className="flex justify-center mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            card.yesOrNo === 'yes' ? 'bg-emerald-500/20 text-emerald-400' :
            card.yesOrNo === 'no' ? 'bg-red-500/20 text-red-400' :
            'bg-amber-500/20 text-amber-400'
          }`}>
            {card.yesOrNo === 'yes' ? <CheckCircle className="w-5 h-5" /> :
             card.yesOrNo === 'no' ? <XCircle className="w-5 h-5" /> :
             <HelpCircle className="w-5 h-5" />}
            <span className="font-semibold capitalize">Yes or No: {card.yesOrNo}</span>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-lg text-white/80 leading-relaxed">{card.description}</p>
        </div>

        {/* Meanings */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-emerald-400 mb-4">Upright Meaning</h2>
            <p className="text-white/80 leading-relaxed">{card.uprightMeaning}</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Reversed Meaning</h2>
            <p className="text-white/80 leading-relaxed">{card.reversedMeaning}</p>
          </div>
        </div>

        {/* Symbolism */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Symbolism</h2>
          <p className="text-white/80 leading-relaxed">{card.symbolism}</p>
        </div>

        {/* Readings */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-pink-400" />
              <h3 className="text-lg font-semibold text-pink-400">Love Reading</h3>
            </div>
            <p className="text-white/80 leading-relaxed">{card.loveReading}</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-amber-400">Career Reading</h3>
            </div>
            <p className="text-white/80 leading-relaxed">{card.careerReading}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          {prevCard ? (
            <Link
              href={`/tarot/meanings/${prevCard.id}`}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>{prevCard.name}</span>
            </Link>
          ) : <div />}
          {nextCard && (
            <Link
              href={`/tarot/meanings/${nextCard.id}`}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <span>{nextCard.name}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-xl font-semibold text-white mb-2">Get a Tarot Reading</h3>
          <p className="text-white/60 mb-4">
            Discover what the cards have to say about your love life, career, and spiritual journey.
          </p>
          <Link
            href="/tarot"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Get Your Reading
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Related Cards */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-4">More from {suitName}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedCards.map((relCard) => (
              <Link
                key={relCard.id}
                href={`/tarot/meanings/${relCard.id}`}
                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-indigo-500/50 transition-all"
              >
                <p className={`${SUIT_TEXT[relCard.suit]} text-sm mb-1`}>{relCard.number}</p>
                <p className="text-white font-medium">{relCard.name}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

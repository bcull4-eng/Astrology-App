import { Metadata } from 'next'
import Link from 'next/link'
import { MAJOR_ARCANA, MINOR_ARCANA } from '@/lib/tarot-data'

export const metadata: Metadata = {
  title: 'Tarot Card Meanings - Complete Guide to All 78 Cards | Orbli',
  description: 'Learn the meaning of all 78 tarot cards. Complete guide to Major and Minor Arcana including upright and reversed meanings, love, and career interpretations.',
  keywords: 'tarot card meanings, tarot cards, major arcana, minor arcana, tarot guide, tarot interpretation',
}

const SUIT_COLORS = {
  major: 'from-purple-500 to-indigo-600',
  wands: 'from-red-500 to-orange-500',
  cups: 'from-blue-500 to-cyan-500',
  swords: 'from-gray-400 to-slate-500',
  pentacles: 'from-yellow-500 to-amber-500',
}

const SUIT_BG = {
  major: 'bg-purple-500/10 border-purple-500/30',
  wands: 'bg-red-500/10 border-red-500/30',
  cups: 'bg-blue-500/10 border-blue-500/30',
  swords: 'bg-gray-500/10 border-gray-500/30',
  pentacles: 'bg-yellow-500/10 border-yellow-500/30',
}

export default function TarotMeaningsPage() {
  const wandsCards = MINOR_ARCANA.filter((c) => c.suit === 'wands')
  const cupsCards = MINOR_ARCANA.filter((c) => c.suit === 'cups')
  const swordsCards = MINOR_ARCANA.filter((c) => c.suit === 'swords')
  const pentaclesCards = MINOR_ARCANA.filter((c) => c.suit === 'pentacles')

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Tarot Card Meanings
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore the meaning of all 78 tarot cards. Click any card to learn its upright and reversed meanings,
            symbolism, and interpretations for love and career.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <a href="#major-arcana" className={`px-4 py-2 rounded-full border ${SUIT_BG.major} text-purple-400 hover:bg-purple-500/20 transition-colors`}>
            Major Arcana (22)
          </a>
          <a href="#wands" className={`px-4 py-2 rounded-full border ${SUIT_BG.wands} text-red-400 hover:bg-red-500/20 transition-colors`}>
            Wands (14)
          </a>
          <a href="#cups" className={`px-4 py-2 rounded-full border ${SUIT_BG.cups} text-blue-400 hover:bg-blue-500/20 transition-colors`}>
            Cups (14)
          </a>
          <a href="#swords" className={`px-4 py-2 rounded-full border ${SUIT_BG.swords} text-gray-400 hover:bg-gray-500/20 transition-colors`}>
            Swords (14)
          </a>
          <a href="#pentacles" className={`px-4 py-2 rounded-full border ${SUIT_BG.pentacles} text-yellow-400 hover:bg-yellow-500/20 transition-colors`}>
            Pentacles (14)
          </a>
        </div>

        {/* Major Arcana */}
        <section id="major-arcana" className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${SUIT_COLORS.major}`} />
            <div>
              <h2 className="text-2xl font-semibold text-white">Major Arcana</h2>
              <p className="text-white/60">The 22 trump cards representing life's spiritual lessons</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {MAJOR_ARCANA.map((card) => (
              <Link
                key={card.id}
                href={`/tarot/meanings/${card.id}`}
                className={`p-4 border rounded-xl hover:bg-white/10 transition-all group ${SUIT_BG.major}`}
              >
                <p className="text-purple-400 text-sm mb-1">{card.number}</p>
                <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                  {card.name}
                </h3>
                <p className="text-white/50 text-xs mt-2 line-clamp-2">
                  {card.keywords.slice(0, 2).join(' • ')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Wands */}
        <section id="wands" className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${SUIT_COLORS.wands}`} />
            <div>
              <h2 className="text-2xl font-semibold text-white">Suit of Wands</h2>
              <p className="text-white/60">Fire element — Passion, creativity, action, ambition</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wandsCards.map((card) => (
              <Link
                key={card.id}
                href={`/tarot/meanings/${card.id}`}
                className={`p-4 border rounded-xl hover:bg-white/10 transition-all group ${SUIT_BG.wands}`}
              >
                <p className="text-red-400 text-sm mb-1">{card.number}</p>
                <h3 className="text-white font-medium group-hover:text-red-400 transition-colors">
                  {card.name}
                </h3>
                <p className="text-white/50 text-xs mt-2 line-clamp-2">
                  {card.keywords.slice(0, 2).join(' • ')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Cups */}
        <section id="cups" className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${SUIT_COLORS.cups}`} />
            <div>
              <h2 className="text-2xl font-semibold text-white">Suit of Cups</h2>
              <p className="text-white/60">Water element — Emotions, relationships, intuition, creativity</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cupsCards.map((card) => (
              <Link
                key={card.id}
                href={`/tarot/meanings/${card.id}`}
                className={`p-4 border rounded-xl hover:bg-white/10 transition-all group ${SUIT_BG.cups}`}
              >
                <p className="text-blue-400 text-sm mb-1">{card.number}</p>
                <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                  {card.name}
                </h3>
                <p className="text-white/50 text-xs mt-2 line-clamp-2">
                  {card.keywords.slice(0, 2).join(' • ')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Swords */}
        <section id="swords" className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${SUIT_COLORS.swords}`} />
            <div>
              <h2 className="text-2xl font-semibold text-white">Suit of Swords</h2>
              <p className="text-white/60">Air element — Intellect, conflict, communication, truth</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {swordsCards.map((card) => (
              <Link
                key={card.id}
                href={`/tarot/meanings/${card.id}`}
                className={`p-4 border rounded-xl hover:bg-white/10 transition-all group ${SUIT_BG.swords}`}
              >
                <p className="text-gray-400 text-sm mb-1">{card.number}</p>
                <h3 className="text-white font-medium group-hover:text-gray-300 transition-colors">
                  {card.name}
                </h3>
                <p className="text-white/50 text-xs mt-2 line-clamp-2">
                  {card.keywords.slice(0, 2).join(' • ')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Pentacles */}
        <section id="pentacles" className="mb-16 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${SUIT_COLORS.pentacles}`} />
            <div>
              <h2 className="text-2xl font-semibold text-white">Suit of Pentacles</h2>
              <p className="text-white/60">Earth element — Material, finances, career, physical world</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pentaclesCards.map((card) => (
              <Link
                key={card.id}
                href={`/tarot/meanings/${card.id}`}
                className={`p-4 border rounded-xl hover:bg-white/10 transition-all group ${SUIT_BG.pentacles}`}
              >
                <p className="text-yellow-400 text-sm mb-1">{card.number}</p>
                <h3 className="text-white font-medium group-hover:text-yellow-400 transition-colors">
                  {card.name}
                </h3>
                <p className="text-white/50 text-xs mt-2 line-clamp-2">
                  {card.keywords.slice(0, 2).join(' • ')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Understanding the Tarot
          </h2>
          <p className="text-white/70 mb-6">
            The tarot deck consists of 78 cards divided into two main sections: the Major Arcana and the Minor Arcana.
            Each card carries its own unique meaning and symbolism, offering guidance and insight into life's journey.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Major Arcana</h3>
          <p className="text-white/70">
            The 22 Major Arcana cards represent significant life events, spiritual lessons, and karmic influences.
            They tell the story of the Fool's Journey—from innocence through experience to enlightenment.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3">Minor Arcana</h3>
          <p className="text-white/70">
            The 56 Minor Arcana cards deal with day-to-day events and practical aspects of life. They are divided
            into four suits, each associated with an element and area of life.
          </p>

          <div className="mt-12 p-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Get a Tarot Reading</h3>
            <p className="text-white/60 mb-4">
              Let the cards reveal insights about your love life, career, and spiritual path.
            </p>
            <Link
              href="/tarot"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Get Your Reading
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

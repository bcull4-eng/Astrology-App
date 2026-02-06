import { Metadata } from 'next'
import Link from 'next/link'
import { Moon, Hash, Calendar, AlertTriangle, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Astrology Tools - Calculators, Calendars & More | Orbli',
  description: 'Free astrology and spiritual tools. Moon calendar, Mercury retrograde tracker, Chinese zodiac calculator, numerology calculator and more.',
  keywords: 'astrology tools, free astrology, moon calendar, mercury retrograde, chinese zodiac, numerology calculator',
}

const TOOLS = [
  {
    title: 'Moon Phase Calendar',
    description: 'Track lunar phases, full moons, and new moons for 2025.',
    href: '/tools/moon-calendar',
    icon: Moon,
    color: 'from-yellow-500 to-amber-500',
  },
  {
    title: 'Mercury Retrograde Tracker',
    description: 'Is Mercury in retrograde? Check dates and survival tips.',
    href: '/tools/mercury-retrograde',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-500',
  },
  {
    title: 'Chinese Zodiac Calculator',
    description: 'Discover your Chinese zodiac animal and element.',
    href: '/tools/chinese-zodiac',
    icon: Sparkles,
    color: 'from-red-600 to-rose-500',
  },
  {
    title: 'Numerology Calculator',
    description: 'Calculate your Life Path, Expression, and Soul Urge numbers.',
    href: '/tools/numerology',
    icon: Hash,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    title: 'Zodiac Sign Dates',
    description: 'Find which zodiac sign you are based on your birthday.',
    href: '/tools/zodiac-dates',
    icon: Calendar,
    color: 'from-indigo-500 to-blue-500',
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Free Astrology Tools
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore our collection of free astrology calculators, calendars, and spiritual tools.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {TOOLS.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-indigo-500/50 transition-all"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.color} text-white mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
                  {tool.title}
                </h2>
                <p className="text-white/60">{tool.description}</p>
              </Link>
            )
          })}
        </div>

        {/* More Tools Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">More Free Resources</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/zodiac"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <p className="text-white font-medium">Zodiac Signs</p>
              <p className="text-white/50 text-sm">All 12 sign profiles</p>
            </Link>
            <Link
              href="/horoscope"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <p className="text-white font-medium">Daily Horoscopes</p>
              <p className="text-white/50 text-sm">Free daily readings</p>
            </Link>
            <Link
              href="/compatibility"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <p className="text-white font-medium">Compatibility</p>
              <p className="text-white/50 text-sm">78 sign pairings</p>
            </Link>
            <Link
              href="/tarot/meanings"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <p className="text-white font-medium">Tarot Meanings</p>
              <p className="text-white/50 text-sm">All 78 cards</p>
            </Link>
            <Link
              href="/charts"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <p className="text-white font-medium">Chart Calculators</p>
              <p className="text-white/50 text-sm">Birth charts & more</p>
            </Link>
            <Link
              href="/learn"
              className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <p className="text-white font-medium">Learn Astrology</p>
              <p className="text-white/50 text-sm">Guides & lessons</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

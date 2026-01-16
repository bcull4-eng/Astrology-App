'use client'

/**
 * Daily Horoscope Component
 *
 * Displays a personalized daily horoscope based on the user's natal chart.
 * Updates daily with fresh content.
 */

import { useState } from 'react'
import type { DailyHoroscope as DailyHoroscopeType } from '@/lib/daily-horoscope'

interface DailyHoroscopeProps {
  horoscope: DailyHoroscopeType
  isPersonalized?: boolean
}

export function DailyHoroscope({ horoscope, isPersonalized = true }: DailyHoroscopeProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const energyColors = {
    high: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400' },
    moderate: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-400' },
    low: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-400' },
  }

  const energy = energyColors[horoscope.overallEnergy]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
  }

  const sections = [
    { id: 'love', icon: '💕', title: 'Love & Relationships', content: horoscope.loveInsight },
    { id: 'career', icon: '💼', title: 'Career & Money', content: horoscope.careerInsight },
    { id: 'wellness', icon: '🌿', title: 'Health & Wellness', content: horoscope.wellnessInsight },
  ]

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-indigo-500/20 overflow-hidden mb-8">
      {/* Sample data banner */}
      {!isPersonalized && (
        <div className="px-6 py-3 bg-amber-500/10 border-b border-amber-500/20">
          <p className="text-amber-400 text-sm text-center">
            Sample horoscope for Leo - <a href="/birth-details" className="underline hover:text-amber-300">add your birth details</a> for personalized insights
          </p>
        </div>
      )}

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
              {getZodiacEmoji(horoscope.sunSign)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Daily Horoscope for {horoscope.sunSign}
              </h2>
              <p className="text-slate-400 text-sm">{formatDate(horoscope.date)}</p>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-full ${energy.bg} ${energy.border} border`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${energy.dot}`} />
              <span className={`text-xs font-medium ${energy.text} capitalize`}>
                {horoscope.overallEnergy} Energy
              </span>
            </div>
          </div>
        </div>

        {/* Moon phase */}
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <span>{getMoonEmoji(horoscope.moonPhase)}</span>
          <span>{horoscope.moonPhase}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-5">
        {/* Headline */}
        <h3 className="text-xl font-medium text-white mb-3">
          {horoscope.headline}
        </h3>

        {/* Summary */}
        <p className="text-slate-300 leading-relaxed mb-6">
          {horoscope.summary}
        </p>

        {/* Expandable Sections */}
        <div className="space-y-2 mb-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-slate-800/30 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{section.icon}</span>
                  <span className="text-white font-medium">{section.title}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedSection === section.id && (
                <div className="px-4 pb-4">
                  <p className="text-slate-300 text-sm leading-relaxed pl-9">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lucky Elements & Affirmation */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-slate-800/30 rounded-xl p-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Lucky Number</div>
            <div className="text-2xl font-semibold text-white">{horoscope.luckyNumber}</div>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-4">
            <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Lucky Color</div>
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full border border-white/20"
                style={{ backgroundColor: getColorHex(horoscope.luckyColor) }}
              />
              <span className="text-white font-medium capitalize">{horoscope.luckyColor}</span>
            </div>
          </div>
        </div>

        {/* Affirmation */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
          <div className="text-purple-300 text-xs uppercase tracking-wider mb-2">Today's Affirmation</div>
          <p className="text-white italic">"{horoscope.affirmation}"</p>
        </div>
      </div>
    </div>
  )
}

function getZodiacEmoji(sign: string): string {
  const emojis: Record<string, string> = {
    Aries: '♈',
    Taurus: '♉',
    Gemini: '♊',
    Cancer: '♋',
    Leo: '♌',
    Virgo: '♍',
    Libra: '♎',
    Scorpio: '♏',
    Sagittarius: '♐',
    Capricorn: '♑',
    Aquarius: '♒',
    Pisces: '♓',
  }
  return emojis[sign] || '✨'
}

function getMoonEmoji(phase: string): string {
  const emojis: Record<string, string> = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full Moon': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘',
  }
  return emojis[phase] || '🌙'
}

function getColorHex(colorName: string): string {
  const colors: Record<string, string> = {
    'deep red': '#8B0000',
    'emerald green': '#50C878',
    'royal blue': '#4169E1',
    'golden yellow': '#FFD700',
    'soft pink': '#FFB6C1',
    'rich purple': '#6B3FA0',
    'ocean teal': '#008B8B',
    'sunset orange': '#FF6347',
    'silver gray': '#C0C0C0',
    'forest green': '#228B22',
    'coral': '#FF7F50',
    'indigo': '#4B0082',
  }
  return colors[colorName] || '#808080'
}

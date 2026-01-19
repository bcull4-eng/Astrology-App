'use client'

/**
 * Free Insight Screen
 *
 * Displays: primary theme based on natal chart
 * This is the free preview before the paywall.
 * Navigation: proceeds to Paywall
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { format, addDays } from 'date-fns'
import type { NatalChart, ZodiacSign } from '@/types'

// Generate insight based on sun sign
function generateInsight(chart: NatalChart | null) {
  if (!chart) {
    return {
      themeName: 'Personal Transformation',
      explanation: "A period of growth and self-discovery awaits you. The cosmic energies are aligning to support your personal evolution.",
      endDate: addDays(new Date(), 21),
      intensity: 3 as const,
    }
  }

  // Find sun placement
  const sunPlacement = chart.placements.find(p => p.planet === 'sun')
  const moonPlacement = chart.placements.find(p => p.planet === 'moon')
  const ascendant = chart.ascendant

  // Theme based on sun sign
  const sunThemes: Record<ZodiacSign, { theme: string; focus: string }> = {
    aries: { theme: 'Bold New Beginnings', focus: 'initiative and leadership' },
    taurus: { theme: 'Building Foundations', focus: 'security and material growth' },
    gemini: { theme: 'Mental Expansion', focus: 'communication and learning' },
    cancer: { theme: 'Emotional Depth', focus: 'home and emotional security' },
    leo: { theme: 'Creative Expression', focus: 'self-expression and recognition' },
    virgo: { theme: 'Practical Refinement', focus: 'health and daily routines' },
    libra: { theme: 'Relationship Harmony', focus: 'partnerships and balance' },
    scorpio: { theme: 'Deep Transformation', focus: 'personal power and rebirth' },
    sagittarius: { theme: 'Expanding Horizons', focus: 'adventure and philosophy' },
    capricorn: { theme: 'Ambitious Climb', focus: 'career and long-term goals' },
    aquarius: { theme: 'Innovative Vision', focus: 'community and future ideals' },
    pisces: { theme: 'Spiritual Connection', focus: 'intuition and transcendence' },
  }

  const sunSign = sunPlacement?.sign || 'aries'
  const moonSign = moonPlacement?.sign || 'aries'
  const { theme, focus } = sunThemes[sunSign]

  const signNames: Record<ZodiacSign, string> = {
    aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer',
    leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio',
    sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces',
  }

  return {
    themeName: theme,
    explanation: `With your Sun in ${signNames[sunSign]} and Moon in ${signNames[moonSign]}, you have a natural orientation toward ${focus}. Your ${signNames[ascendant.sign]} rising adds a distinctive way of approaching the world. Current planetary transits are activating these core parts of your chart, making this an important time for self-awareness and intentional action.`,
    endDate: addDays(new Date(), 21),
    intensity: 4 as const,
  }
}

export default function FreeInsightPage() {
  const router = useRouter()
  const [insight, setInsight] = useState<ReturnType<typeof generateInsight> | null>(null)

  useEffect(() => {
    // Get chart from session storage
    const chartData = sessionStorage.getItem('natal-chart')
    if (chartData) {
      const chart: NatalChart = JSON.parse(chartData)
      setInsight(generateInsight(chart))
    } else {
      setInsight(generateInsight(null))
    }
  }, [])

  const handleContinue = () => {
    router.push('/dashboard')
  }

  if (!insight) {
    return (
      <div className="w-full max-w-lg mx-auto text-center py-12">
        <div className="animate-pulse">Loading your insight...</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-indigo-400 text-sm font-medium mb-2">Your Current Theme</p>
        <h1 className="text-3xl font-bold text-white mb-2">
          {insight.themeName}
        </h1>
        <p className="text-slate-400">
          Active until {format(insight.endDate, 'MMMM d')}
        </p>
      </div>

      {/* Intensity indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-slate-400 text-sm">Intensity:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-full ${
                level <= insight.intensity
                  ? 'bg-indigo-500'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
        <span className="text-slate-400 text-sm">High</span>
      </div>

      {/* Insight card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
        <h2 className="text-white font-semibold mb-3">Why this is happening</h2>
        <p className="text-slate-300 leading-relaxed">
          {insight.explanation}
        </p>
      </div>

      {/* What's next */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium text-sm">Explore your dashboard</p>
            <p className="text-slate-400 text-sm">
              See your birth chart, daily horoscope, reports, calculators, and more.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleContinue}
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
      >
        Go to Dashboard
      </button>
    </div>
  )
}

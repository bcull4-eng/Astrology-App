'use client'

/**
 * Free Insight Screen
 *
 * Displays: primary theme name, explanation of why active, end date
 * This is the free preview before the paywall.
 * Navigation: proceeds to Paywall
 */

import { useRouter } from 'next/navigation'
import { format, addDays } from 'date-fns'

// Mock data - in production this would come from the synthesis engine
const mockInsight = {
  themeName: 'Relationship Recalibration',
  explanation:
    "You're in a period of re-evaluating your closest connections. Saturn is currently forming a challenging aspect to your natal Venus, which often brings relationship dynamics into sharp focus. This isn't about endings—it's about understanding what you truly need from partnerships and setting healthier boundaries.",
  endDate: addDays(new Date(), 23),
  intensity: 4 as const,
}

export default function FreeInsightPage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/paywall')
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-indigo-400 text-sm font-medium mb-2">Your Current Theme</p>
        <h1 className="text-3xl font-bold text-white mb-2">
          {mockInsight.themeName}
        </h1>
        <p className="text-slate-400">
          Active until {format(mockInsight.endDate, 'MMMM d')}
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
                level <= mockInsight.intensity
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
          {mockInsight.explanation}
        </p>
      </div>

      {/* What's locked */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium text-sm">Unlock your full dashboard</p>
            <p className="text-slate-400 text-sm">
              See daily guidance, intensity timelines, and what to do about it.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleContinue}
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
      >
        See what to do about it
      </button>
    </div>
  )
}

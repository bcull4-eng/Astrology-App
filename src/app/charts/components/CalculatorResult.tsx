'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Calculator, CalculatorResult as CalculatorResultType, SignResult } from '@/types/calculators'
import { SignResultCard, SignResultCompact } from './SignResult'
import type { ZodiacSign } from '@/types/astrology'

interface CalculatorResultProps {
  calculator: Calculator
  result: CalculatorResultType
}

// Moon phase visual representations
const moonPhaseIcons: Record<string, string> = {
  'new-moon': '\u{1F311}',
  'waxing-crescent': '\u{1F312}',
  'first-quarter': '\u{1F313}',
  'waxing-gibbous': '\u{1F314}',
  'full-moon': '\u{1F315}',
  'waning-gibbous': '\u{1F316}',
  'last-quarter': '\u{1F317}',
  'waning-crescent': '\u{1F318}',
}

const moonPhaseNames: Record<string, string> = {
  'new-moon': 'New Moon',
  'waxing-crescent': 'Waxing Crescent',
  'first-quarter': 'First Quarter',
  'waxing-gibbous': 'Waxing Gibbous',
  'full-moon': 'Full Moon',
  'waning-gibbous': 'Waning Gibbous',
  'last-quarter': 'Last Quarter',
  'waning-crescent': 'Waning Crescent (Balsamic)',
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function CalculatorResultDisplay({ calculator, result }: CalculatorResultProps) {
  const [selectedResult, setSelectedResult] = useState<SignResult | null>(null)

  // Single sign result (e.g., Moon Sign Calculator)
  if (calculator.outputType === 'single-sign' && result.signResults && result.signResults.length === 1) {
    return (
      <div className="space-y-6">
        <SignResultCard result={result.signResults[0]} />
        <UpgradePrompt calculator={calculator} />
      </div>
    )
  }

  // Multiple signs result (e.g., Big 3, Big 6)
  if (calculator.outputType === 'multiple-signs' && result.signResults) {
    return (
      <div className="space-y-6">
        {/* Grid of compact results */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {result.signResults.map((sr, i) => (
            <SignResultCompact
              key={i}
              result={sr}
              onClick={() => setSelectedResult(selectedResult?.planet === sr.planet ? null : sr)}
            />
          ))}
        </div>

        {/* Expanded detail */}
        {selectedResult && (
          <div className="animate-in slide-in-from-top-2 duration-200">
            <SignResultCard result={selectedResult} />
          </div>
        )}

        {!selectedResult && (
          <p className="text-center text-slate-400 text-sm">
            Click on any placement above to see detailed interpretation
          </p>
        )}

        <UpgradePrompt calculator={calculator} />
      </div>
    )
  }

  // Full chart result
  if (calculator.outputType === 'chart' && result.signResults) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">Your Birth Chart Placements</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {result.signResults.map((sr, i) => (
              <SignResultCompact
                key={i}
                result={sr}
                onClick={() => setSelectedResult(selectedResult?.planet === sr.planet ? null : sr)}
              />
            ))}
          </div>
        </div>

        {selectedResult && (
          <div className="animate-in slide-in-from-top-2 duration-200">
            <SignResultCard result={selectedResult} />
          </div>
        )}

        <UpgradePrompt calculator={calculator} />
      </div>
    )
  }

  // Saturn Return result
  if (calculator.outputType === 'date-based' && result.saturnReturn) {
    const sr = result.saturnReturn
    const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-700/30 to-slate-600/30 border border-slate-600/50 rounded-xl p-6 space-y-6">
          {/* Saturn Sign */}
          <div className="text-center pb-6 border-b border-slate-700">
            <p className="text-slate-400 text-sm">Your Saturn Sign</p>
            <p className="text-3xl font-bold text-white mt-1">
              Saturn in {capitalizeFirst(sr.saturnSign)}
            </p>
            <p className="text-slate-400 mt-1">{sr.saturnDegree.toFixed(1)}°</p>
          </div>

          {/* Current Phase */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">Current Phase</p>
            <p className={`text-xl font-semibold mt-1 ${
              sr.currentPhase === 'in-return' || sr.currentPhase === 'approaching'
                ? 'text-amber-400'
                : 'text-slate-300'
            }`}>
              {sr.currentPhase === 'pre-return' && 'Before Your Saturn Return'}
              {sr.currentPhase === 'approaching' && 'Saturn Return Approaching'}
              {sr.currentPhase === 'in-return' && 'In Your Saturn Return'}
              {sr.currentPhase === 'post-return' && 'After Your Saturn Return'}
            </p>
          </div>

          {/* First Return */}
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-3">First Saturn Return (Age ~{sr.firstReturn.age})</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-slate-500">Begins</p>
                <p className="text-sm text-slate-300">{formatDate(sr.firstReturn.startDate)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Peak</p>
                <p className="text-sm text-white font-medium">{formatDate(sr.firstReturn.exactDate)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Ends</p>
                <p className="text-sm text-slate-300">{formatDate(sr.firstReturn.endDate)}</p>
              </div>
            </div>
          </div>

          {/* Second Return */}
          {sr.secondReturn && (
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">Second Saturn Return (Age ~{sr.secondReturn.age})</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-500">Begins</p>
                  <p className="text-sm text-slate-300">{formatDate(sr.secondReturn.startDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Peak</p>
                  <p className="text-sm text-white font-medium">{formatDate(sr.secondReturn.exactDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Ends</p>
                  <p className="text-sm text-slate-300">{formatDate(sr.secondReturn.endDate)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Interpretation */}
          <div className="pt-4 border-t border-slate-700">
            <p className="text-slate-300 leading-relaxed">{sr.interpretation}</p>
          </div>
        </div>

        <UpgradePrompt calculator={calculator} />
      </div>
    )
  }

  // Moon Phase result
  if (calculator.outputType === 'moon-phase' && result.moonPhase) {
    const mp = result.moonPhase
    const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-indigo-900/30 to-violet-900/30 border border-indigo-500/30 rounded-xl p-6 text-center space-y-4">
          {/* Moon Phase Icon */}
          <div className="text-8xl">{moonPhaseIcons[mp.phase]}</div>

          {/* Phase Name */}
          <div>
            <p className="text-slate-400 text-sm">You Were Born Under a</p>
            <p className="text-3xl font-bold text-white mt-1">{moonPhaseNames[mp.phase]}</p>
          </div>

          {/* Illumination */}
          <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2">
            <span className="text-slate-400 text-sm">Illumination:</span>
            <span className="text-white font-medium">{mp.illumination}%</span>
          </div>

          {/* Interpretation */}
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {mp.interpretation}
          </p>

          {/* Current Moon Info */}
          <div className="pt-4 border-t border-slate-700 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500">Next New Moon</p>
              <p className="text-sm text-slate-300">{formatDate(mp.nextNewMoon)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Next Full Moon</p>
              <p className="text-sm text-slate-300">{formatDate(mp.nextFullMoon)}</p>
            </div>
          </div>
        </div>

        <UpgradePrompt calculator={calculator} />
      </div>
    )
  }

  // Compatibility result
  if (calculator.outputType === 'compatibility' && result.compatibility) {
    const compat = result.compatibility

    return (
      <div className="space-y-6">
        {/* Overall Score */}
        <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 border border-pink-500/30 rounded-xl p-6 text-center">
          <p className="text-slate-400 text-sm">Overall Compatibility</p>
          <div className="text-6xl font-bold text-white my-4">{compat.overallScore}%</div>
          <p className="text-slate-300">
            {compat.overallScore >= 80 && 'Excellent natural compatibility!'}
            {compat.overallScore >= 65 && compat.overallScore < 80 && 'Good compatibility with growth potential'}
            {compat.overallScore >= 50 && compat.overallScore < 65 && 'Moderate compatibility requiring effort'}
            {compat.overallScore < 50 && 'Challenging but potentially transformative'}
          </p>
        </div>

        {/* Category Scores */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(compat.categories).map(([key, value]) => (
            <div key={key} className="bg-slate-800/50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500 capitalize">{key}</p>
              <p className="text-2xl font-bold text-white mt-1">{value}%</p>
            </div>
          ))}
        </div>

        {/* Sign Comparisons */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Sign Compatibility</h3>
          {[compat.sunCompatibility, compat.moonCompatibility, compat.venusCompatibility, compat.marsCompatibility].map((aspect, i) => (
            <div key={i} className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <span className="text-white">{capitalizeFirst(aspect.person1Sign)}</span>
                  <span className="text-slate-500">&</span>
                  <span className="text-white">{capitalizeFirst(aspect.person2Sign)}</span>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  aspect.compatibility === 'excellent' ? 'bg-green-500/20 text-green-400' :
                  aspect.compatibility === 'good' ? 'bg-blue-500/20 text-blue-400' :
                  aspect.compatibility === 'moderate' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {capitalizeFirst(aspect.compatibility)}
                </span>
              </div>
              <p className="text-sm text-slate-400">{aspect.description}</p>
            </div>
          ))}
        </div>

        {/* Strengths & Challenges */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-3">Relationship Strengths</h4>
            <ul className="space-y-2">
              {compat.strengths.map((s, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">+</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-amber-400 mb-3">Areas for Growth</h4>
            <ul className="space-y-2">
              {compat.challenges.map((c, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">!</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Advice */}
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-indigo-400 mb-2">Relationship Advice</h4>
          <p className="text-slate-300">{compat.advice}</p>
        </div>

        <UpgradePrompt calculator={calculator} />
      </div>
    )
  }

  // Fallback for any result with signResults
  if (result.signResults && result.signResults.length > 0) {
    return (
      <div className="space-y-6">
        {result.signResults.map((sr, i) => (
          <SignResultCard key={i} result={sr} />
        ))}
        <UpgradePrompt calculator={calculator} />
      </div>
    )
  }

  return (
    <div className="text-center py-8 text-slate-400">
      Unable to display results. Please try again.
    </div>
  )
}

// Upgrade/CTA prompt component
function UpgradePrompt({ calculator }: { calculator: Calculator }) {
  return (
    <div className="bg-gradient-to-r from-indigo-900/50 to-violet-900/50 border border-indigo-500/30 rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-semibold text-white">Want to Go Deeper?</h3>
      <p className="text-slate-300">
        This is just a glimpse of what your birth chart reveals. Unlock your full astrological profile with personalized insights, daily guidance, and in-depth reports.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          See Your Full Birth Chart
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Get Personalized Reports
        </Link>
      </div>

      {/* Related Calculators */}
      {calculator.relatedCalculators.length > 0 && (
        <div className="pt-4 border-t border-slate-700">
          <p className="text-sm text-slate-400 mb-2">Related Calculators:</p>
          <div className="flex flex-wrap gap-2">
            {calculator.relatedCalculators.slice(0, 3).map((slug) => (
              <Link
                key={slug}
                href={`/charts/${slug}`}
                className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

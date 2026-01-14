'use client'

/**
 * Synastry Results Page
 *
 * Shows the full relationship analysis with:
 * - Overall dynamic
 * - Supportive connections (top 3)
 * - Friction points (top 2)
 * - Growth lesson
 * - Practical guidance
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockSynastry } from '@/lib/mock-data'

interface SynastryInsight {
  title: string
  explanation: string
  real_life_manifestation: string
}

export default function SynastryResultsPage() {
  const [partnerName, setPartnerName] = useState('Your Partner')
  const [expandedSection, setExpandedSection] = useState<string | null>('supportive')

  useEffect(() => {
    // Get partner name from session storage
    const stored = sessionStorage.getItem('synastry-partner')
    if (stored) {
      const data = JSON.parse(stored)
      setPartnerName(data.name || 'Your Partner')
    }
  }, [])

  const synastry = mockSynastry

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-pink-400 text-sm font-medium mb-2">Relationship Analysis</p>
        <h1 className="text-3xl font-bold text-white mb-2">You & {partnerName}</h1>
      </div>

      {/* Overall Dynamic */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-3">Your Dynamic</h2>
        <p className="text-slate-300 leading-relaxed">{synastry.overall_dynamic}</p>
      </div>

      {/* Supportive Connections */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden mb-6">
        <button
          onClick={() => setExpandedSection(expandedSection === 'supportive' ? null : 'supportive')}
          className="w-full p-6 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <span className="text-xl">💚</span>
            </div>
            <div>
              <h2 className="text-white font-semibold">Supportive Connections</h2>
              <p className="text-slate-400 text-sm">What brings you together</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${
              expandedSection === 'supportive' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === 'supportive' && (
          <div className="px-6 pb-6 space-y-4">
            {synastry.supportive_connections.map((connection, index) => (
              <InsightCard key={index} insight={connection} variant="supportive" />
            ))}
          </div>
        )}
      </div>

      {/* Friction Points */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden mb-6">
        <button
          onClick={() => setExpandedSection(expandedSection === 'friction' ? null : 'friction')}
          className="w-full p-6 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <h2 className="text-white font-semibold">Friction Points</h2>
              <p className="text-slate-400 text-sm">Areas that need attention</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${
              expandedSection === 'friction' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === 'friction' && (
          <div className="px-6 pb-6 space-y-4">
            {synastry.friction_points.map((friction, index) => (
              <InsightCard key={index} insight={friction} variant="friction" />
            ))}
          </div>
        )}
      </div>

      {/* Growth Lesson */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden mb-6">
        <button
          onClick={() => setExpandedSection(expandedSection === 'growth' ? null : 'growth')}
          className="w-full p-6 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <span className="text-xl">🌱</span>
            </div>
            <div>
              <h2 className="text-white font-semibold">Growth Lesson</h2>
              <p className="text-slate-400 text-sm">What this relationship teaches you</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${
              expandedSection === 'growth' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSection === 'growth' && (
          <div className="px-6 pb-6">
            <InsightCard insight={synastry.growth_lesson} variant="growth" />
          </div>
        )}
      </div>

      {/* Practical Guidance */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Practical Guidance</h2>
        <ul className="space-y-3">
          {synastry.practical_guidance.map((guidance, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-300">
              <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-indigo-400 text-xs font-medium">{index + 1}</span>
              </div>
              {guidance}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href="/synastry"
          className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors text-center"
        >
          New Analysis
        </Link>
        <Link
          href="/dashboard"
          className="flex-1 py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors text-center"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

function InsightCard({
  insight,
  variant,
}: {
  insight: SynastryInsight
  variant: 'supportive' | 'friction' | 'growth'
}) {
  const borderColors = {
    supportive: 'border-emerald-500/30',
    friction: 'border-amber-500/30',
    growth: 'border-purple-500/30',
  }

  return (
    <div className={`bg-slate-900/50 border ${borderColors[variant]} rounded-xl p-4`}>
      <h3 className="text-white font-medium mb-2">{insight.title}</h3>
      <p className="text-slate-400 text-sm mb-3">{insight.explanation}</p>
      <div className="bg-slate-800/50 rounded-lg p-3">
        <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">In real life</p>
        <p className="text-slate-300 text-sm">{insight.real_life_manifestation}</p>
      </div>
    </div>
  )
}

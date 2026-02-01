'use client'

/**
 * Synastry Input Page
 *
 * Premium feature - requires subscription.
 * Collects partner's birth data for relationship analysis.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { BirthTimeConfidence } from '@/types'
import { useSubscription } from '@/hooks/use-subscription'

const timeConfidenceOptions: { value: BirthTimeConfidence; label: string }[] = [
  { value: 'exact', label: 'Exact time' },
  { value: 'approximate', label: 'Approximate' },
  { value: 'unknown', label: 'Unknown' },
]

// Premium features preview for locked state
const premiumFeatures = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Deep Compatibility Analysis',
    description: 'Discover emotional, mental, and physical chemistry',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Relationship Dynamics',
    description: 'Understand your strengths and growth areas',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Unlimited Comparisons',
    description: 'Compare charts with anyone, anytime',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Planetary Aspects',
    description: 'See Venus, Mars, Moon connections and more',
  },
]

function SynastryLocked() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Relationship Synastry</h1>
        <p className="text-indigo-200/60 text-lg max-w-md mx-auto">
          Discover the cosmic connection between you and anyone in your life
        </p>
      </div>

      {/* Lock Card */}
      <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold">Premium Feature</h2>
            <p className="text-indigo-200/50 text-sm">Upgrade to unlock synastry analysis</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-indigo-900/30 rounded-xl">
              <div className="text-indigo-400 flex-shrink-0 mt-0.5">{feature.icon}</div>
              <div>
                <div className="text-white font-medium text-sm">{feature.title}</div>
                <div className="text-indigo-200/50 text-xs">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/paywall"
          className="block w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-center rounded-xl transition-all shadow-lg shadow-indigo-500/25"
        >
          Unlock Synastry - Try for just £2
        </Link>
      </div>

      {/* Preview Image/Mockup */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="bg-indigo-950/30 p-6 blur-[3px] select-none pointer-events-none">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500/30" />
              <div>
                <div className="h-4 w-24 bg-indigo-500/30 rounded mb-2" />
                <div className="h-3 w-16 bg-indigo-500/20 rounded" />
              </div>
            </div>
            <div className="text-rose-400 text-3xl font-bold">87%</div>
            <div className="flex items-center gap-4">
              <div>
                <div className="h-4 w-24 bg-indigo-500/30 rounded mb-2 text-right" />
                <div className="h-3 w-16 bg-indigo-500/20 rounded ml-auto" />
              </div>
              <div className="w-16 h-16 rounded-full bg-rose-500/30" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-indigo-900/40 rounded-xl p-4 h-24" />
            <div className="bg-indigo-900/40 rounded-xl p-4 h-24" />
            <div className="bg-indigo-900/40 rounded-xl p-4 h-24" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
      </div>

      {/* Trust signals */}
      <div className="mt-8 flex items-center justify-center gap-6 text-indigo-300/40 text-sm">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Privacy protected
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Instant results
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Unlimited comparisons
        </div>
      </div>
    </div>
  )
}

function SynastryForm() {
  const router = useRouter()
  const [partnerName, setPartnerName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthTimeConfidence, setBirthTimeConfidence] = useState<BirthTimeConfidence>('exact')
  const [birthPlace, setBirthPlace] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!birthDate) {
      setError("Please enter your partner's birth date")
      return
    }

    if (!birthPlace) {
      setError("Please enter your partner's birth place")
      return
    }

    setLoading(true)

    // Store in session storage for the results page
    sessionStorage.setItem(
      'synastry-partner',
      JSON.stringify({
        name: partnerName || 'Your Partner',
        birthDate,
        birthTime,
        birthTimeConfidence,
        birthPlace,
      })
    )

    // Navigate to calculating page
    router.push('/synastry/calculating')
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Relationship Analysis</h1>
        <p className="text-indigo-200/50">
          Enter your partner&apos;s birth details to see your relationship dynamics
        </p>
      </div>

      <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Partner Name (optional) */}
          <div>
            <label htmlFor="partnerName" className="block text-sm font-medium text-indigo-200/70 mb-2">
              Their name <span className="text-indigo-300/40">(optional)</span>
            </label>
            <input
              id="partnerName"
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Partner's name"
              className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white placeholder-indigo-300/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Birth Date */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-indigo-200/70 mb-2">
              Birth date
            </label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:dark]"
            />
          </div>

          {/* Birth Time */}
          <div>
            <label htmlFor="birthTime" className="block text-sm font-medium text-indigo-200/70 mb-2">
              Birth time
            </label>
            <div className="flex gap-3">
              <input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="flex-1 px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:dark]"
              />
              <select
                value={birthTimeConfidence}
                onChange={(e) => setBirthTimeConfidence(e.target.value as BirthTimeConfidence)}
                className="px-3 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {timeConfidenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Birth Place */}
          <div>
            <label htmlFor="birthPlace" className="block text-sm font-medium text-indigo-200/70 mb-2">
              Birth place
            </label>
            <input
              id="birthPlace"
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="City, Country"
              required
              className="w-full px-4 py-3 bg-indigo-950/50 border border-indigo-500/20 rounded-lg text-white placeholder-indigo-300/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze Relationship'}
          </button>
        </form>
      </div>

      {/* Info */}
      <div className="mt-6 text-center">
        <p className="text-indigo-300/40 text-sm">
          We analyze the aspects between your birth charts to reveal relationship dynamics,
          strengths, challenges, and growth opportunities.
        </p>
      </div>
    </div>
  )
}

export default function SynastryPage() {
  const { isPro, loading } = useSubscription()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Show locked state for free users
  if (!isPro) {
    return <SynastryLocked />
  }

  // Show full form for premium users
  return <SynastryForm />
}

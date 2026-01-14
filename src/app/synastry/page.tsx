'use client'

/**
 * Synastry Input Page
 *
 * Collects partner's birth data for relationship analysis.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { BirthTimeConfidence } from '@/types'

const timeConfidenceOptions: { value: BirthTimeConfidence; label: string }[] = [
  { value: 'exact', label: 'Exact time' },
  { value: 'approximate', label: 'Approximate' },
  { value: 'unknown', label: 'Unknown' },
]

export default function SynastryPage() {
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
        <p className="text-slate-400">
          Enter your partner&apos;s birth details to see your relationship dynamics
        </p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Partner Name (optional) */}
          <div>
            <label htmlFor="partnerName" className="block text-sm font-medium text-slate-300 mb-2">
              Their name <span className="text-slate-500">(optional)</span>
            </label>
            <input
              id="partnerName"
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Partner's name"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Birth Date */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-slate-300 mb-2">
              Birth date
            </label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent [color-scheme:dark]"
            />
          </div>

          {/* Birth Time */}
          <div>
            <label htmlFor="birthTime" className="block text-sm font-medium text-slate-300 mb-2">
              Birth time
            </label>
            <div className="flex gap-3">
              <input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent [color-scheme:dark]"
              />
              <select
                value={birthTimeConfidence}
                onChange={(e) => setBirthTimeConfidence(e.target.value as BirthTimeConfidence)}
                className="px-3 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
            <label htmlFor="birthPlace" className="block text-sm font-medium text-slate-300 mb-2">
              Birth place
            </label>
            <input
              id="birthPlace"
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="City, Country"
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze Relationship'}
          </button>
        </form>
      </div>

      {/* Info */}
      <div className="mt-6 text-center">
        <p className="text-slate-500 text-sm">
          We analyze the aspects between your birth charts to reveal relationship dynamics,
          strengths, challenges, and growth opportunities.
        </p>
      </div>
    </div>
  )
}

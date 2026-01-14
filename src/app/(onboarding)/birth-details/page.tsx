'use client'

/**
 * Birth Details Screen
 *
 * Collects: birth date, birth time, birth time confidence, birth place
 * Navigation: proceeds to Focus Areas
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/store/onboarding'
import type { BirthTimeConfidence } from '@/types'

const timeConfidenceOptions: { value: BirthTimeConfidence; label: string; description: string }[] = [
  { value: 'exact', label: 'Exact', description: 'From birth certificate or reliable source' },
  { value: 'approximate', label: 'Approximate', description: 'Within an hour or two' },
  { value: 'unknown', label: 'Unknown', description: "I don't know my birth time" },
]

export default function BirthDetailsPage() {
  const router = useRouter()
  const {
    birthDate,
    birthTime,
    birthTimeConfidence,
    birthPlace,
    setBirthDate,
    setBirthTime,
    setBirthTimeConfidence,
    setBirthPlace,
  } = useOnboardingStore()

  const [citySearch, setCitySearch] = useState(birthPlace.city || '')
  const [error, setError] = useState<string | null>(null)

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCitySearch(value)
    // For MVP, we'll just store the city name
    // In production, this would use a geocoding API
    setBirthPlace({
      city: value,
      country: '',
      latitude: null,
      longitude: null,
      timezone: '',
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!birthDate) {
      setError('Please enter your birth date')
      return
    }

    if (!citySearch) {
      setError('Please enter your birth place')
      return
    }

    // Store the city as birth place for now
    setBirthPlace({
      ...birthPlace,
      city: citySearch,
    })

    router.push('/focus-areas')
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Enter your birth details
        </h1>
        <p className="text-slate-400">
          We use this to calculate your personal astrological chart
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

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
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:dark]"
          />
        </div>

        {/* Birth Time */}
        <div>
          <label htmlFor="birthTime" className="block text-sm font-medium text-slate-300 mb-2">
            Birth time
          </label>
          <input
            id="birthTime"
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:dark]"
          />
        </div>

        {/* Time Confidence */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            How confident are you about this time?
          </label>
          <div className="space-y-2">
            {timeConfidenceOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
                  birthTimeConfidence === option.value
                    ? 'bg-indigo-500/20 border-indigo-500'
                    : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                }`}
              >
                <input
                  type="radio"
                  name="timeConfidence"
                  value={option.value}
                  checked={birthTimeConfidence === option.value}
                  onChange={() => setBirthTimeConfidence(option.value)}
                  className="mt-0.5 mr-3"
                />
                <div>
                  <div className="text-white font-medium">{option.label}</div>
                  <div className="text-slate-400 text-sm">{option.description}</div>
                </div>
              </label>
            ))}
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
            value={citySearch}
            onChange={handleCityChange}
            placeholder="City, Country"
            required
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p className="mt-2 text-slate-500 text-sm">
            Enter the city and country where you were born
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  )
}

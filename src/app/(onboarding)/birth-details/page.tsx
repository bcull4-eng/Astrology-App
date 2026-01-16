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
import type { BirthTimeConfidence, RelationshipStatus, LifePhase, PrimaryConcern } from '@/types'

const timeConfidenceOptions: { value: BirthTimeConfidence; label: string; description: string }[] = [
  { value: 'exact', label: 'Exact', description: 'From birth certificate or reliable source' },
  { value: 'approximate', label: 'Approximate', description: 'Within an hour or two' },
  { value: 'unknown', label: 'Unknown', description: "I don't know my birth time" },
]

const relationshipOptions: { value: RelationshipStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'dating', label: 'Dating' },
  { value: 'committed', label: 'In a relationship' },
  { value: 'married', label: 'Married' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

const lifePhaseOptions: { value: LifePhase; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'early_career', label: 'Early career' },
  { value: 'mid_career', label: 'Mid-career' },
  { value: 'parent', label: 'Parent with young children' },
  { value: 'empty_nest', label: 'Empty nester' },
  { value: 'retired', label: 'Retired' },
]

const primaryConcernOptions: { value: PrimaryConcern; label: string; icon: string }[] = [
  { value: 'career', label: 'Career', icon: '💼' },
  { value: 'love', label: 'Love', icon: '💕' },
  { value: 'health', label: 'Health', icon: '🌿' },
  { value: 'finances', label: 'Finances', icon: '💰' },
  { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { value: 'self_growth', label: 'Self-growth', icon: '✨' },
  { value: 'creativity', label: 'Creativity', icon: '🎨' },
]

export default function BirthDetailsPage() {
  const router = useRouter()
  const {
    birthDate,
    birthTime,
    birthTimeConfidence,
    birthPlace,
    relationshipStatus,
    lifePhase,
    primaryConcerns,
    setBirthDate,
    setBirthTime,
    setBirthTimeConfidence,
    setBirthPlace,
    setRelationshipStatus,
    setLifePhase,
    togglePrimaryConcern,
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

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-slate-900 text-slate-500 text-sm">Personalize your experience</span>
          </div>
        </div>

        {/* Relationship Status */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Relationship status <span className="text-slate-500">(optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {relationshipOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRelationshipStatus(relationshipStatus === option.value ? null : option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  relationshipStatus === option.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Life Phase */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Life phase <span className="text-slate-500">(optional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {lifePhaseOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setLifePhase(lifePhase === option.value ? null : option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  lifePhase === option.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Concerns */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            What&apos;s on your mind? <span className="text-slate-500">(select up to 3)</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {primaryConcernOptions.map((option) => {
              const isSelected = primaryConcerns.includes(option.value)
              const isDisabled = !isSelected && primaryConcerns.length >= 3
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !isDisabled && togglePrimaryConcern(option.value)}
                  disabled={isDisabled}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : isDisabled
                      ? 'bg-slate-800/30 text-slate-600 cursor-not-allowed border border-slate-800'
                      : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              )
            })}
          </div>
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

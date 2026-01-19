'use client'

import { useState } from 'react'
import type { Calculator, CalculatorFormData } from '@/types/calculators'

interface CalculatorFormProps {
  calculator: Calculator
  onSubmit: (data: CalculatorFormData) => void
  isLoading?: boolean
}

export function CalculatorForm({ calculator, onSubmit, isLoading }: CalculatorFormProps) {
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthTimeConfidence, setBirthTimeConfidence] = useState<'exact' | 'approximate' | 'unknown'>('exact')
  const [birthPlace, setBirthPlace] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Partner fields for compatibility
  const [partnerBirthDate, setPartnerBirthDate] = useState('')
  const [partnerBirthTime, setPartnerBirthTime] = useState('')
  const [partnerBirthTimeConfidence, setPartnerBirthTimeConfidence] = useState<'exact' | 'approximate' | 'unknown'>('exact')
  const [partnerBirthPlace, setPartnerBirthPlace] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!birthDate) {
      setError('Please enter your birth date')
      return
    }

    if (!birthPlace) {
      setError('Please enter your birth place')
      return
    }

    if (calculator.requiresTime && !birthTime) {
      setError('This calculator requires your birth time for accurate results')
      return
    }

    if (calculator.requiresExactTime && birthTimeConfidence !== 'exact') {
      setError('This calculator requires an exact birth time. If you don\'t know your exact time, the result may not be accurate.')
    }

    if (calculator.inputType === 'compatibility') {
      if (!partnerBirthDate || !partnerBirthPlace) {
        setError('Please enter your partner\'s birth details')
        return
      }
    }

    onSubmit({
      birthDate,
      birthTime,
      birthTimeConfidence,
      birthPlace,
      partnerBirthDate: calculator.inputType === 'compatibility' ? partnerBirthDate : undefined,
      partnerBirthTime: calculator.inputType === 'compatibility' ? partnerBirthTime : undefined,
      partnerBirthTimeConfidence: calculator.inputType === 'compatibility' ? partnerBirthTimeConfidence : undefined,
      partnerBirthPlace: calculator.inputType === 'compatibility' ? partnerBirthPlace : undefined,
    })
  }

  const timeConfidenceOptions = [
    { value: 'exact', label: 'I know my exact birth time', description: 'From birth certificate or hospital records' },
    { value: 'approximate', label: 'Approximate time', description: 'Within an hour or two' },
    { value: 'unknown', label: 'I don\'t know my birth time', description: 'Results will use noon as default' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Person 1 / Main Person */}
      <div className="space-y-4">
        {calculator.inputType === 'compatibility' && (
          <h3 className="text-lg font-semibold text-white">Your Details</h3>
        )}

        {/* Birth Date */}
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-slate-300 mb-2">
            Birth Date <span className="text-red-400">*</span>
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:dark]"
            required
          />
        </div>

        {/* Birth Time */}
        <div>
          <label htmlFor="birthTime" className="block text-sm font-medium text-slate-300 mb-2">
            Birth Time {calculator.requiresTime && <span className="text-red-400">*</span>}
            {!calculator.requiresTime && <span className="text-slate-500 ml-1">(optional but recommended)</span>}
          </label>
          <input
            id="birthTime"
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:dark]"
          />
          {calculator.requiresExactTime && (
            <p className="mt-2 text-amber-400 text-sm">
              This calculator requires an exact birth time for accurate results.
            </p>
          )}
        </div>

        {/* Time Confidence */}
        {birthTime && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
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
                    onChange={() => setBirthTimeConfidence(option.value as 'exact' | 'approximate' | 'unknown')}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <span className="block text-white text-sm font-medium">{option.label}</span>
                    <span className="block text-slate-400 text-xs mt-0.5">{option.description}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    birthTimeConfidence === option.value
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-slate-500'
                  }`}>
                    {birthTimeConfidence === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Birth Place */}
        <div>
          <label htmlFor="birthPlace" className="block text-sm font-medium text-slate-300 mb-2">
            Birth Place <span className="text-red-400">*</span>
          </label>
          <input
            id="birthPlace"
            type="text"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            placeholder="e.g., New York, USA"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-slate-500 text-xs">
            Enter city and country (e.g., "London, UK" or "Los Angeles, USA")
          </p>
        </div>
      </div>

      {/* Partner Fields for Compatibility */}
      {calculator.inputType === 'compatibility' && (
        <div className="space-y-4 pt-6 border-t border-slate-700">
          <h3 className="text-lg font-semibold text-white">Partner's Details</h3>

          <div>
            <label htmlFor="partnerBirthDate" className="block text-sm font-medium text-slate-300 mb-2">
              Partner's Birth Date <span className="text-red-400">*</span>
            </label>
            <input
              id="partnerBirthDate"
              type="date"
              value={partnerBirthDate}
              onChange={(e) => setPartnerBirthDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:dark]"
              required
            />
          </div>

          <div>
            <label htmlFor="partnerBirthTime" className="block text-sm font-medium text-slate-300 mb-2">
              Partner's Birth Time <span className="text-slate-500 ml-1">(optional)</span>
            </label>
            <input
              id="partnerBirthTime"
              type="time"
              value={partnerBirthTime}
              onChange={(e) => setPartnerBirthTime(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent [color-scheme:dark]"
            />
          </div>

          <div>
            <label htmlFor="partnerBirthPlace" className="block text-sm font-medium text-slate-300 mb-2">
              Partner's Birth Place <span className="text-red-400">*</span>
            </label>
            <input
              id="partnerBirthPlace"
              type="text"
              value={partnerBirthPlace}
              onChange={(e) => setPartnerBirthPlace(e.target.value)}
              placeholder="e.g., Paris, France"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Calculating...</span>
          </>
        ) : (
          <span>Calculate My {calculator.title.replace(' Calculator', '')}</span>
        )}
      </button>
    </form>
  )
}

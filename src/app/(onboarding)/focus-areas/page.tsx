'use client'

/**
 * Focus Areas Screen
 *
 * Collects: focus area selections (multi-select)
 * Options: career, relationships, money, growth
 * Navigation: proceeds to Calculation
 */

import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/store/onboarding'
import type { FocusArea } from '@/types'

const focusAreaOptions: { value: FocusArea; label: string; description: string; icon: string }[] = [
  {
    value: 'career',
    label: 'Career',
    description: 'Work, professional growth, purpose',
    icon: '💼',
  },
  {
    value: 'relationships',
    label: 'Relationships',
    description: 'Love, partnerships, connections',
    icon: '❤️',
  },
  {
    value: 'money',
    label: 'Money',
    description: 'Finances, abundance, security',
    icon: '💰',
  },
  {
    value: 'growth',
    label: 'Personal Growth',
    description: 'Self-development, spirituality, health',
    icon: '🌱',
  },
]

export default function FocusAreasPage() {
  const router = useRouter()
  const { focusAreas, toggleFocusArea } = useOnboardingStore()

  const handleContinue = () => {
    router.push('/calculating')
  }

  const handleSkip = () => {
    router.push('/calculating')
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">
          What matters most to you right now?
        </h1>
        <p className="text-slate-400">
          Select the areas you&apos;d like to focus on. You can change these later.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {focusAreaOptions.map((option) => {
          const isSelected = focusAreas.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleFocusArea(option.value)}
              className={`w-full flex items-center p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-indigo-500/20 border-indigo-500'
                  : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
              }`}
            >
              <span className="text-2xl mr-4">{option.icon}</span>
              <div className="flex-1">
                <div className="text-white font-medium">{option.label}</div>
                <div className="text-slate-400 text-sm">{option.description}</div>
              </div>
              {isSelected && (
                <svg
                  className="w-6 h-6 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          )
        })}
      </div>

      <div className="space-y-3">
        <button
          onClick={handleContinue}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
        >
          Continue
        </button>
        <button
          onClick={handleSkip}
          className="w-full py-3 px-4 text-slate-400 hover:text-slate-300 font-medium transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}

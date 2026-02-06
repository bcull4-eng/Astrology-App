'use client'

/**
 * BirthdayStep (Step 2)
 *
 * Birthday selection using scroll wheel pickers for Month/Day/Year
 */

import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { ScrollWheelPicker } from '../shared/ScrollWheelPicker'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)

export function BirthdayStep() {
  const {
    birthMonth,
    birthDay,
    birthYear,
    setBirthMonth,
    setBirthDay,
    setBirthYear,
    goToNextStep,
  } = useOnboardingV2Store()

  const isComplete = birthMonth !== null && birthDay !== null && birthYear !== null

  const handleContinue = () => {
    if (isComplete) {
      goToNextStep()
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        When were you born?
      </h1>
      <p className="text-white/60 text-center mb-8">
        Your birth date reveals your sun sign
      </p>

      <div className="flex gap-4 w-full max-w-sm justify-center mb-8">
        {/* Month picker */}
        <div className="flex-1">
          <label className="block text-xs text-white/40 text-center mb-2 uppercase tracking-wider">
            Month
          </label>
          <ScrollWheelPicker
            items={MONTHS.map((m, i) => ({ value: i + 1, label: m.slice(0, 3) }))}
            value={birthMonth}
            onChange={setBirthMonth}
          />
        </div>

        {/* Day picker */}
        <div className="w-20">
          <label className="block text-xs text-white/40 text-center mb-2 uppercase tracking-wider">
            Day
          </label>
          <ScrollWheelPicker
            items={DAYS.map((d) => ({ value: d, label: String(d) }))}
            value={birthDay}
            onChange={setBirthDay}
          />
        </div>

        {/* Year picker */}
        <div className="w-24">
          <label className="block text-xs text-white/40 text-center mb-2 uppercase tracking-wider">
            Year
          </label>
          <ScrollWheelPicker
            items={YEARS.map((y) => ({ value: y, label: String(y) }))}
            value={birthYear}
            onChange={setBirthYear}
          />
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!isComplete}
        className={`
          w-full max-w-sm py-4 rounded-xl font-semibold text-lg transition-all
          ${
            isComplete
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }
        `}
      >
        Continue
      </button>
    </div>
  )
}

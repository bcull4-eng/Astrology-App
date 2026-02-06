'use client'

/**
 * BirthTimeStep (Step 3)
 *
 * Birth time selection using scroll wheel pickers for Hour/Minute/AM-PM
 * Also includes "I don't remember" option
 */

import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { ScrollWheelPicker } from '../shared/ScrollWheelPicker'
import { TopBanner } from '../shared/TopBanner'

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1)
const MINUTES = Array.from({ length: 60 }, (_, i) => i)
const AMPM: ('AM' | 'PM')[] = ['AM', 'PM']

export function BirthTimeStep() {
  const {
    birthHour,
    birthMinute,
    birthAmPm,
    birthTimeKnown,
    setBirthHour,
    setBirthMinute,
    setBirthAmPm,
    setBirthTimeKnown,
    goToNextStep,
  } = useOnboardingV2Store()

  const isComplete = !birthTimeKnown || (birthHour !== null && birthMinute !== null && birthAmPm !== null)

  const handleContinue = () => {
    if (isComplete) {
      goToNextStep()
    }
  }

  const handleDontRemember = () => {
    setBirthTimeKnown(false)
    setBirthHour(null)
    setBirthMinute(null)
    setBirthAmPm(null)
    goToNextStep()
  }

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-8">
      <TopBanner variant="testimonial" className="mb-6" />

      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        What time were you born?
      </h1>
      <p className="text-white/60 text-center mb-8">
        This determines your rising sign and house placements
      </p>

      {birthTimeKnown && (
        <div className="flex gap-4 w-full max-w-sm justify-center mb-8">
          {/* Hour picker */}
          <div className="w-20">
            <label className="block text-xs text-white/40 text-center mb-2 uppercase tracking-wider">
              Hour
            </label>
            <ScrollWheelPicker
              items={HOURS.map((h) => ({ value: h, label: String(h) }))}
              value={birthHour}
              onChange={setBirthHour}
            />
          </div>

          {/* Minute picker */}
          <div className="w-20">
            <label className="block text-xs text-white/40 text-center mb-2 uppercase tracking-wider">
              Min
            </label>
            <ScrollWheelPicker
              items={MINUTES.map((m) => ({ value: m, label: String(m).padStart(2, '0') }))}
              value={birthMinute}
              onChange={setBirthMinute}
            />
          </div>

          {/* AM/PM picker */}
          <div className="w-20">
            <label className="block text-xs text-white/40 text-center mb-2 uppercase tracking-wider">
              &nbsp;
            </label>
            <ScrollWheelPicker
              items={AMPM.map((a) => ({ value: a, label: a }))}
              value={birthAmPm}
              onChange={setBirthAmPm}
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-sm space-y-3">
        {birthTimeKnown && (
          <button
            onClick={handleContinue}
            disabled={!isComplete}
            className={`
              w-full py-4 rounded-xl font-semibold text-lg transition-all
              ${
                isComplete
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            Continue
          </button>
        )}

        <button
          onClick={handleDontRemember}
          className={`
            w-full py-4 rounded-xl font-medium text-lg transition-all
            ${
              !birthTimeKnown
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          I don&apos;t remember
        </button>
      </div>
    </div>
  )
}

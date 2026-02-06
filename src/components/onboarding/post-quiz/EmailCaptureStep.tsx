'use client'

/**
 * EmailCaptureStep (Step 15)
 *
 * Collects email for lead capture (no auth required).
 * Email is stored but not verified - user continues immediately.
 */

import { useState } from 'react'
import { Mail, Lock, Sparkles, Users, Shield } from 'lucide-react'
import { useOnboardingV2Store, getFormattedBirthDate, getFormattedBirthTime } from '@/store/onboarding-v2'

export function EmailCaptureStep() {
  const store = useOnboardingV2Store()
  const { email, setEmail, goToNextStep } = store
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsSubmitting(true)

    // Save lead data to database
    try {
      await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          gender: store.gender,
          birthDate: getFormattedBirthDate(store.birthMonth, store.birthDay, store.birthYear),
          birthTime: getFormattedBirthTime(store.birthHour, store.birthMinute, store.birthAmPm),
          birthTimeKnown: store.birthTimeKnown,
          birthPlace: store.birthPlace,
          relationshipStatus: store.relationshipStatus,
          futureGoals: store.futureGoals,
          colorPreference: store.colorPreference,
          elementPreference: store.elementPreference,
          palmReadingData: store.palmReadingData,
          natalChartData: store.natalChartData,
          profileData: store.profileData,
        }),
      })
    } catch (error) {
      console.error('Failed to save lead:', error)
      // Continue anyway - data is in localStorage as backup
    }

    setIsSubmitting(false)
    goToNextStep()
  }

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-8">
      {/* Blurred preview */}
      <div className="relative w-full max-w-sm mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a2e]/50 to-[#1a1a2e] z-10" />
        <div className="blur-md opacity-60 p-4 bg-white/5 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
            <div>
              <div className="h-4 w-24 bg-white/20 rounded mb-2" />
              <div className="h-3 w-32 bg-white/10 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-white/10 rounded" />
            <div className="h-3 w-4/5 bg-white/10 rounded" />
            <div className="h-3 w-3/4 bg-white/10 rounded" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span className="text-white text-sm">Your report is ready</span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        Unlock Your Palm Read Report!
      </h1>
      <p className="text-white/60 text-center mb-6 max-w-sm">
        Enter your email to receive your personalized reading
      </p>

      {/* Email form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={!email || isSubmitting}
          className={`
            w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2
            ${
              email && !isSubmitting
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }
          `}
        >
          <Sparkles className="w-5 h-5" />
          {isSubmitting ? 'Saving...' : 'Reveal My Report'}
        </button>
      </form>

      {/* Social proof + Privacy */}
      <div className="mt-6 space-y-3 max-w-sm">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5 text-white/40 text-xs">
            <Users className="w-3.5 h-3.5" />
            <span>2,847 reports today</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/40 text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>100% private</span>
          </div>
        </div>
        <p className="text-white/30 text-xs text-center">
          We&apos;ll never spam you. Your email is used only for your report and account.
        </p>
      </div>
    </div>
  )
}

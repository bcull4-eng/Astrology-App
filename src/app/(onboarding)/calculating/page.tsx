'use client'

/**
 * Calculation Screen
 *
 * Displays: loading state with copy
 * Triggers: natal chart calculation via API
 * Navigation: proceeds to Free Insight on completion
 */

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/store/onboarding'

const loadingMessages = [
  'Analyzing your birth chart...',
  'Calculating planetary positions...',
  'Identifying current transits...',
  'Synthesizing your primary themes...',
  'Preparing your personalized insights...',
]

export default function CalculatingPage() {
  const router = useRouter()
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const hasStartedCalculation = useRef(false)

  const { birthDate, birthTime, birthTimeConfidence, birthPlace } = useOnboardingStore()

  useEffect(() => {
    // Prevent double calculation in strict mode
    if (hasStartedCalculation.current) return
    hasStartedCalculation.current = true

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90 // Cap at 90 until API completes
        return prev + Math.random() * 10
      })
    }, 500)

    // Calculate natal chart
    async function calculateChart() {
      try {
        const response = await fetch('/api/natal-chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate,
            birthTime: birthTime || null,
            birthTimeConfidence,
            birthPlace: birthPlace.city, // Send city string for geocoding
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to calculate chart')
        }

        // Store the chart in session storage for the free-insight page
        sessionStorage.setItem('natal-chart', JSON.stringify(data.chart))
        sessionStorage.setItem('birth-location', JSON.stringify(data.location))

        // Save to database for persistence (don't block on this)
        fetch('/api/user/birth-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            birthDate,
            birthTime: birthTime || null,
            birthTimeConfidence,
            birthPlace: data.location,
            natalChart: data.chart,
          }),
        }).catch((err) => {
          // Log but don't block - sessionStorage still works as fallback
          console.error('Failed to persist birth data:', err)
        })

        // Complete progress and navigate
        setProgress(100)
        setTimeout(() => {
          router.push('/free-insight')
        }, 500)
      } catch (err) {
        console.error('Chart calculation error:', err)
        setError(err instanceof Error ? err.message : 'Something went wrong')
        clearInterval(messageInterval)
        clearInterval(progressInterval)
      }
    }

    calculateChart()

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [router, birthDate, birthTime, birthTimeConfidence, birthPlace])

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-white mb-3">Something went wrong</h1>
        <p className="text-slate-400 mb-6">{error}</p>
        <button
          onClick={() => router.push('/birth-details')}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Animated orb */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-indigo-500/30 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white animate-spin-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-white mb-3">
        Calculating your chart
      </h1>

      <p className="text-slate-400 mb-8 h-6">
        {loadingMessages[messageIndex]}
      </p>

      {/* Progress bar */}
      <div className="w-full bg-slate-700/50 rounded-full h-2 mb-4">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <p className="text-slate-500 text-sm">
        We&apos;re identifying the most important themes shaping your life right now
      </p>
    </div>
  )
}

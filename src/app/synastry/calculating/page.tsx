'use client'

/**
 * Synastry Calculation Screen
 *
 * Calculates synastry via API and shows loading state.
 */

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const loadingMessages = [
  'Comparing your birth charts...',
  'Analyzing planetary aspects...',
  'Identifying supportive connections...',
  'Examining friction points...',
  'Synthesizing relationship dynamics...',
]

export default function SynastryCalculatingPage() {
  const router = useRouter()
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const hasStartedCalculation = useRef(false)

  useEffect(() => {
    // Prevent double calculation in strict mode
    if (hasStartedCalculation.current) return
    hasStartedCalculation.current = true

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 1500)

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90
        return prev + Math.random() * 10
      })
    }, 400)

    // Calculate synastry
    async function calculateSynastry() {
      try {
        // Get partner data from session storage
        const partnerData = sessionStorage.getItem('synastry-partner')
        if (!partnerData) {
          throw new Error('Partner data not found')
        }

        const partner = JSON.parse(partnerData)

        // Get user's chart from session storage
        const userChart = sessionStorage.getItem('natal-chart')

        const response = await fetch('/api/synastry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userChart: userChart ? JSON.parse(userChart) : undefined,
            partnerName: partner.name,
            partnerBirthDate: partner.birthDate,
            partnerBirthTime: partner.birthTime || null,
            partnerBirthTimeConfidence: partner.birthTimeConfidence,
            partnerBirthPlace: partner.birthPlace,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to calculate synastry')
        }

        // Store synastry result
        sessionStorage.setItem('synastry-result', JSON.stringify(data.synastry))

        // Complete and navigate
        setProgress(100)
        setTimeout(() => {
          router.push('/synastry/results')
        }, 500)
      } catch (err) {
        console.error('Synastry calculation error:', err)
        setError(err instanceof Error ? err.message : 'Something went wrong')
        clearInterval(messageInterval)
        clearInterval(progressInterval)
      }
    }

    calculateSynastry()

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [router])

  // Error state
  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-white mb-3">Something went wrong</h1>
        <p className="text-slate-400 mb-6">{error}</p>
        <button
          onClick={() => router.push('/synastry')}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto text-center py-16">
      {/* Animated hearts */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-pink-500/20 rounded-full animate-ping" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <span className="text-5xl animate-pulse">💕</span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-white mb-3">
        Analyzing your connection
      </h1>

      <p className="text-slate-400 mb-8 h-6">{loadingMessages[messageIndex]}</p>

      {/* Progress bar */}
      <div className="w-full bg-slate-700/50 rounded-full h-2 mb-4">
        <div
          className="bg-pink-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <p className="text-slate-500 text-sm">
        Comparing both charts to reveal your unique dynamic
      </p>
    </div>
  )
}

'use client'

/**
 * Calculation Screen
 *
 * Displays: loading state with copy
 * Triggers: natal chart calculation, transit calculation, theme synthesis
 * Navigation: proceeds to Free Insight on completion
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 2000)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 15
      })
    }, 500)

    // Navigate after "calculation" completes
    const timeout = setTimeout(() => {
      router.push('/free-insight')
    }, 4000)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
      clearTimeout(timeout)
    }
  }, [router])

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

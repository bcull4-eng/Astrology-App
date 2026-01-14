'use client'

/**
 * Synastry Calculation Screen
 *
 * Shows loading state while "calculating" synastry.
 */

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 1500)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 12
      })
    }, 400)

    // Navigate after "calculation" completes
    const timeout = setTimeout(() => {
      router.push('/synastry/results')
    }, 3500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
      clearTimeout(timeout)
    }
  }, [router])

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

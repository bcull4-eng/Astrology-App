'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSubscription } from '@/hooks/use-subscription'
import { useTarotStore } from '@/store/tarot'

// Hardcoded spreads to avoid any import issues
const SPREADS = [
  { id: 'daily', name: 'Daily Tarot', description: 'Receive guidance for your day ahead.', cardCount: 1, icon: '☀️' },
  { id: 'yes_no', name: 'Yes/No', description: 'Get a clear answer to your question.', cardCount: 1, icon: '❓' },
  { id: 'one_card', name: 'One Card', description: 'Draw a single card for focused insight.', cardCount: 1, icon: '🎴' },
  { id: 'three_card', name: 'Three Card', description: 'Explore past, present, and future.', cardCount: 3, icon: '🔮' },
]

export default function TarotPage() {
  const [mounted, setMounted] = useState(false)
  const { isPro, loading } = useSubscription()

  // Test the store import
  const { checkDailyLimit, resetDailyLimitIfNewDay } = useTarotStore()

  useEffect(() => {
    setMounted(true)
    // Reset daily limit if it's a new day (must be in effect, not during render)
    resetDailyLimitIfNewDay()
  }, [resetDailyLimitIfNewDay])

  const hasUsedDaily = mounted ? checkDailyLimit() : false

  if (!mounted || loading) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isPro) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🔮</div>
          <h1 className="text-2xl font-bold text-white mb-3">Tarot Readings</h1>
          <p className="text-indigo-200/70 mb-6">
            Unlock daily tarot readings personalized to your natal chart with a Pro subscription.
          </p>
          <Link
            href="/paywall"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/25"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">Tarot Readings</h1>
        <p className="text-indigo-200/70">
          Choose a reading type to begin. You have 1 reading per day.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SPREADS.map((spread) => (
          <button
            key={spread.id}
            className="p-6 rounded-2xl bg-slate-800/40 hover:bg-slate-800/60 text-left transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{spread.icon}</div>
              <div>
                <h3 className="font-bold text-lg text-white mb-1">{spread.name}</h3>
                <p className="text-sm text-slate-400 mb-2">{spread.description}</p>
                <p className="text-xs text-indigo-400/70">
                  {spread.cardCount} {spread.cardCount === 1 ? 'card' : 'cards'}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-slate-500 mt-8 text-sm">
        Full tarot functionality coming soon...
      </p>
    </div>
  )
}

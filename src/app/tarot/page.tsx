'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSubscription } from '@/hooks/use-subscription'

export default function TarotPage() {
  const { isPro, loading } = useSubscription()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-3">Tarot Readings</h1>
        <p className="text-indigo-200/70 mb-8">Coming soon - tarot feature is being set up.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}

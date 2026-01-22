'use client'

/**
 * Tarot Page
 *
 * Main tarot reading interface with reading type selection,
 * card drawing, and AI interpretation display.
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ReadingTypeCard, DeckSpread, ReadingResult } from '@/components/tarot'
import { useTarotStore } from '@/store/tarot'
import { useSubscription } from '@/hooks/use-subscription'
import { getAllSpreads, getSpread } from '@/lib/tarot/spreads'
import type { ReadingType, DrawnCard, NatalChart } from '@/types'

type Step = 'select-type' | 'enter-question' | 'draw-cards' | 'reading'

export default function TarotPage() {
  const [step, setStep] = useState<Step>('select-type')
  const [natalChart, setNatalChart] = useState<NatalChart | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { isPro, loading: subscriptionLoading } = useSubscription()

  const {
    selectedReadingType,
    question,
    drawnCards,
    interpretation,
    isInterpreting,
    setReadingType,
    setQuestion,
    drawCard,
    appendInterpretation,
    setInterpretation,
    setIsInterpreting,
    setDailyReadingUsed,
    checkDailyLimit,
    resetReading,
  } = useTarotStore()

  const spreads = getAllSpreads()
  const selectedSpread = selectedReadingType ? getSpread(selectedReadingType) : null
  const hasUsedDaily = checkDailyLimit()

  // Load natal chart
  useEffect(() => {
    async function loadNatalChart() {
      const sessionData = sessionStorage.getItem('natal-chart')
      if (sessionData) {
        try {
          setNatalChart(JSON.parse(sessionData))
        } catch {
          // Invalid chart data
        }
      }

      try {
        const response = await fetch('/api/user/birth-data')
        if (response.ok) {
          const { birthData } = await response.json()
          if (birthData?.natalChart) {
            setNatalChart(birthData.natalChart)
            sessionStorage.setItem('natal-chart', JSON.stringify(birthData.natalChart))
          }
        }
      } catch {
        // Database fetch failed
      }
    }

    loadNatalChart()
  }, [])

  const handleSelectReadingType = (type: ReadingType) => {
    setReadingType(type)
    // For yes/no, go to question step. For others, go directly to card drawing
    if (type === 'yes_no') {
      setStep('enter-question')
    } else {
      setStep('draw-cards')
    }
  }

  const handleQuestionSubmit = () => {
    if (question.trim() || selectedReadingType !== 'yes_no') {
      setStep('draw-cards')
    }
  }

  const handleCardSelect = (cardId: string, isReversed: boolean) => {
    if (!selectedSpread) return

    const position = selectedSpread.positions[drawnCards.length]
    drawCard(cardId, position, isReversed)

    // Check if all cards are drawn
    if (drawnCards.length + 1 >= selectedSpread.cardCount) {
      setStep('reading')
      // Start the interpretation
      startInterpretation([...drawnCards, { cardId, position, isReversed }])
    }
  }

  const startInterpretation = async (cards: DrawnCard[]) => {
    if (!selectedReadingType) return

    setIsInterpreting(true)
    setInterpretation('')
    setError(null)

    try {
      const response = await fetch('/api/tarot/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          readingType: selectedReadingType,
          cards,
          question: question || undefined,
          natalChart,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.code === 'DAILY_LIMIT_REACHED') {
          setDailyReadingUsed()
          setError(errorData.message)
          setIsInterpreting(false)
          return
        }
        throw new Error(errorData.message || 'Failed to get interpretation')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          appendInterpretation(chunk)
        }
      }

      // Mark daily reading as used
      setDailyReadingUsed()
    } catch (error) {
      console.error('Interpretation error:', error)
      setError(error instanceof Error ? error.message : 'Failed to get interpretation')
    } finally {
      setIsInterpreting(false)
    }
  }

  const handleNewReading = () => {
    resetReading()
    setStep('select-type')
    setError(null)
  }

  // Loading state
  if (subscriptionLoading) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Pro gate
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Upgrade to Pro
          </Link>
          <p className="text-indigo-300/40 text-xs mt-3">
            From £14.99/month • Cancel anytime
          </p>
        </div>
      </div>
    )
  }

  // Daily limit reached
  if (hasUsedDaily && step === 'select-type') {
    return (
      <div className="min-h-[calc(100vh-65px)] flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🌙</div>
          <h1 className="text-2xl font-bold text-white mb-3">Come Back Tomorrow</h1>
          <p className="text-indigo-200/70 mb-6">
            You&apos;ve received your daily tarot reading. The cards will be ready to speak to you again tomorrow.
          </p>
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Step 1: Select Reading Type */}
      {step === 'select-type' && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">Tarot Readings</h1>
            <p className="text-indigo-200/70">
              Choose a reading type to begin. You have 1 reading per day.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {spreads.map((spread) => (
              <ReadingTypeCard
                key={spread.id}
                spread={spread}
                isSelected={selectedReadingType === spread.id}
                onSelect={() => handleSelectReadingType(spread.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Enter Question (for yes/no) */}
      {step === 'enter-question' && selectedSpread && (
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => {
              setStep('select-type')
              setReadingType(null)
            }}
            className="flex items-center gap-2 text-indigo-300/70 hover:text-white transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{selectedSpread.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{selectedSpread.name} Reading</h2>
            <p className="text-indigo-200/70">Enter your yes or no question</p>
          </div>

          <div className="space-y-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know?"
              className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none"
              rows={3}
            />
            <button
              onClick={handleQuestionSubmit}
              disabled={!question.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all"
            >
              Continue to Card Selection
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Draw Cards */}
      {step === 'draw-cards' && selectedSpread && (
        <div>
          <button
            onClick={() => {
              if (selectedReadingType === 'yes_no') {
                setStep('enter-question')
              } else {
                setStep('select-type')
                setReadingType(null)
              }
              resetReading()
            }}
            className="flex items-center gap-2 text-indigo-300/70 hover:text-white transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{selectedSpread.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{selectedSpread.name} Reading</h2>
            <p className="text-indigo-200/70">Focus on your intention and select your cards</p>
          </div>

          <DeckSpread
            cardsToSelect={selectedSpread.cardCount}
            selectedCardIds={drawnCards.map((c) => c.cardId)}
            onCardSelect={handleCardSelect}
          />
        </div>
      )}

      {/* Step 4: Reading Result */}
      {step === 'reading' && selectedSpread && (
        <div>
          {error ? (
            <div className="max-w-md mx-auto text-center">
              <div className="text-6xl mb-6">⚠️</div>
              <h2 className="text-xl font-bold text-white mb-3">Something went wrong</h2>
              <p className="text-indigo-200/70 mb-6">{error}</p>
              <button
                onClick={handleNewReading}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <ReadingResult
                spread={selectedSpread}
                drawnCards={drawnCards}
                interpretation={interpretation}
                isInterpreting={isInterpreting}
                question={question || undefined}
              />

              {!isInterpreting && interpretation && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleNewReading}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

'use client'

/**
 * Reading Result Component
 *
 * Displays the revealed cards with their positions and
 * streams the AI interpretation.
 */

import { useEffect, useRef } from 'react'
import { TarotCard } from './tarot-card'
import { getCard } from '@/lib/tarot/cards'
import type { DrawnCard, SpreadConfig } from '@/types/tarot'

interface ReadingResultProps {
  spread: SpreadConfig
  drawnCards: DrawnCard[]
  interpretation: string
  isInterpreting: boolean
  question?: string
}

export function ReadingResult({
  spread,
  drawnCards,
  interpretation,
  isInterpreting,
  question,
}: ReadingResultProps) {
  const interpretationRef = useRef<HTMLDivElement>(null)

  // Auto-scroll as interpretation streams in
  useEffect(() => {
    if (interpretationRef.current && isInterpreting) {
      interpretationRef.current.scrollTop = interpretationRef.current.scrollHeight
    }
  }, [interpretation, isInterpreting])

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Question if provided */}
      {question && (
        <div className="text-center mb-6">
          <p className="text-indigo-200/70 text-sm">Your question:</p>
          <p className="text-white text-lg italic">&ldquo;{question}&rdquo;</p>
        </div>
      )}

      {/* Cards display */}
      <div className="flex justify-start md:justify-center gap-4 md:gap-8 mb-8 overflow-x-auto scrollbar-hide px-4 -mx-4 pb-2">
        {drawnCards.map((drawnCard, index) => {
          const card = getCard(drawnCard.cardId)
          if (!card) return null

          return (
            <TarotCard
              key={drawnCard.cardId}
              card={card}
              isReversed={drawnCard.isReversed}
              isRevealed={true}
              revealDelay={index * 400}
              showPosition={spread.positions[index]}
              size="lg"
            />
          )
        })}
      </div>

      {/* Interpretation */}
      <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-xl">✨</span>
          Your Reading
        </h3>

        <div
          ref={interpretationRef}
          className="prose prose-invert prose-sm max-w-none max-h-96 overflow-y-auto"
        >
          {interpretation ? (
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {interpretation}
              {isInterpreting && (
                <span className="inline-block w-2 h-4 bg-indigo-400 ml-1 animate-pulse" />
              )}
            </div>
          ) : isInterpreting ? (
            <div className="flex items-center gap-2 text-indigo-300">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="ml-2">Channeling the cards...</span>
            </div>
          ) : (
            <p className="text-slate-500">Waiting for interpretation...</p>
          )}
        </div>
      </div>
    </div>
  )
}

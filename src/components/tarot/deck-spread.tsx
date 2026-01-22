'use client'

/**
 * Deck Spread Component
 *
 * Simple card selection - click the deck to draw a random card.
 */

import { useMemo } from 'react'
import { TAROT_DECK } from '@/lib/tarot/cards'

interface DeckSpreadProps {
  cardsToSelect: number
  selectedCardIds: string[]
  onCardSelect: (cardId: string, isReversed: boolean) => void
}

export function DeckSpread({ cardsToSelect, selectedCardIds, onCardSelect }: DeckSpreadProps) {
  // Shuffle deck on mount
  const shuffledDeck = useMemo(() => {
    return [...TAROT_DECK].sort(() => Math.random() - 0.5)
  }, [])

  const canSelectMore = selectedCardIds.length < cardsToSelect
  const remainingCards = cardsToSelect - selectedCardIds.length

  const handleDrawCard = () => {
    if (!canSelectMore) return

    // Find a card that hasn't been selected yet
    const availableCard = shuffledDeck.find(card => !selectedCardIds.includes(card.id))
    if (!availableCard) return

    // 50% chance of reversal
    const isReversed = Math.random() > 0.5
    onCardSelect(availableCard.id, isReversed)
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Instructions */}
      <div className="text-center mb-8">
        <p className="text-indigo-200/70">
          {canSelectMore
            ? `Tap the deck to draw ${remainingCards} ${remainingCards === 1 ? 'card' : 'cards'}`
            : 'All cards drawn'}
        </p>
      </div>

      {/* Clickable deck */}
      <button
        onClick={handleDrawCard}
        disabled={!canSelectMore}
        className={`
          relative group
          ${canSelectMore ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}
          transition-transform duration-200
        `}
      >
        {/* Stacked cards effect */}
        <div className="absolute top-1 left-1 w-32 h-48 rounded-lg bg-indigo-950 border-2 border-indigo-400/20" />
        <div className="absolute top-0.5 left-0.5 w-32 h-48 rounded-lg bg-indigo-900 border-2 border-indigo-400/25" />

        {/* Top card */}
        <div className="relative w-32 h-48 rounded-lg overflow-hidden shadow-xl border-2 border-indigo-400/30 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-3 border border-indigo-400/20 rounded flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl opacity-50">✦</span>
              {canSelectMore && (
                <p className="text-xs text-indigo-300/50 mt-2">Tap to draw</p>
              )}
            </div>
          </div>
        </div>

        {/* Glow effect on hover */}
        {canSelectMore && (
          <div className="absolute inset-0 rounded-lg bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors" />
        )}
      </button>

      {/* Selected cards indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: cardsToSelect }).map((_, i) => (
          <div
            key={i}
            className={`
              w-4 h-4 rounded-full transition-all duration-300
              ${i < selectedCardIds.length
                ? 'bg-indigo-500 scale-110'
                : 'bg-slate-700 border border-slate-600'}
            `}
          />
        ))}
      </div>

      {/* Card count */}
      <p className="text-sm text-slate-500 mt-4">
        {selectedCardIds.length} of {cardsToSelect} cards drawn
      </p>
    </div>
  )
}

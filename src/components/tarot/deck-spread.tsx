'use client'

/**
 * Deck Spread Component
 *
 * Displays a fanned deck of face-down cards for selection.
 * Users click cards to select them for their reading.
 */

import { useState, useMemo } from 'react'
import { TAROT_DECK } from '@/lib/tarot/cards'

interface DeckSpreadProps {
  cardsToSelect: number
  selectedCardIds: string[]
  onCardSelect: (cardId: string, isReversed: boolean) => void
}

export function DeckSpread({ cardsToSelect, selectedCardIds, onCardSelect }: DeckSpreadProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Shuffle deck on mount - use memo to keep consistent during component lifecycle
  const shuffledDeck = useMemo(() => {
    return [...TAROT_DECK].sort(() => Math.random() - 0.5)
  }, [])

  const canSelectMore = selectedCardIds.length < cardsToSelect

  const handleCardClick = (cardId: string) => {
    if (selectedCardIds.includes(cardId)) return
    if (!canSelectMore) return

    // 50% chance of reversal
    const isReversed = Math.random() > 0.5
    onCardSelect(cardId, isReversed)
  }

  return (
    <div className="w-full">
      {/* Instructions */}
      <div className="text-center mb-8">
        <p className="text-indigo-200/70">
          {canSelectMore
            ? `Select ${cardsToSelect - selectedCardIds.length} more ${cardsToSelect - selectedCardIds.length === 1 ? 'card' : 'cards'}`
            : 'All cards selected'}
        </p>
      </div>

      {/* Fan of cards */}
      <div className="relative h-64 flex items-center justify-center">
        <div className="relative w-full max-w-2xl h-full">
          {shuffledDeck.map((card, index) => {
            const isSelected = selectedCardIds.includes(card.id)
            const totalCards = shuffledDeck.length
            const middleIndex = totalCards / 2

            // Calculate fan spread angles and positions
            const angleRange = 60 // Total spread angle in degrees
            const angle = ((index - middleIndex) / middleIndex) * (angleRange / 2)

            // Calculate vertical offset for arc effect
            const normalizedPosition = (index - middleIndex) / middleIndex
            const arcHeight = 30 * (1 - normalizedPosition * normalizedPosition)

            const isHovered = hoveredIndex === index

            return (
              <div
                key={card.id}
                className={`
                  absolute left-1/2 bottom-0
                  transition-all duration-200 ease-out
                  ${isSelected ? 'opacity-30 pointer-events-none' : 'cursor-pointer'}
                  ${!canSelectMore && !isSelected ? 'pointer-events-none' : ''}
                `}
                style={{
                  transform: `
                    translateX(-50%)
                    translateY(${isHovered && !isSelected ? -20 - arcHeight : -arcHeight}px)
                    rotate(${angle}deg)
                  `,
                  transformOrigin: 'bottom center',
                  zIndex: isHovered ? 100 : index,
                }}
                onClick={() => handleCardClick(card.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card back */}
                <div
                  className={`
                    w-16 h-24 rounded-lg overflow-hidden shadow-lg
                    transition-all duration-200
                    ${isHovered && !isSelected ? 'shadow-xl shadow-indigo-500/20' : ''}
                  `}
                >
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 flex items-center justify-center border-2 border-indigo-400/30">
                    <div className="w-[80%] h-[85%] border border-indigo-400/20 rounded flex items-center justify-center">
                      <span className="text-xl opacity-40">✦</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected cards indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: cardsToSelect }).map((_, i) => (
          <div
            key={i}
            className={`
              w-3 h-3 rounded-full transition-colors
              ${i < selectedCardIds.length ? 'bg-indigo-500' : 'bg-slate-700'}
            `}
          />
        ))}
      </div>
    </div>
  )
}

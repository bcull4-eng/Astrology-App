'use client'

/**
 * Tarot Card Component
 *
 * Displays a single tarot card with flip animation.
 * Can show face-down (back) or face-up (front) with the card image.
 */

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { TarotCard as TarotCardType } from '@/types/tarot'

interface TarotCardProps {
  card?: TarotCardType
  isReversed?: boolean
  isRevealed?: boolean
  revealDelay?: number
  showPosition?: string
  onClick?: () => void
  isSelected?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-20 h-32',
  md: 'w-28 h-44',
  lg: 'w-36 h-56',
}

export function TarotCard({
  card,
  isReversed = false,
  isRevealed = false,
  revealDelay = 0,
  showPosition,
  onClick,
  isSelected = false,
  size = 'md',
}: TarotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (isRevealed && !isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true)
      }, revealDelay)
      return () => clearTimeout(timer)
    }
  }, [isRevealed, revealDelay, isFlipped])

  return (
    <div className="flex flex-col items-center gap-2">
      {showPosition && (
        <span className="text-xs text-indigo-300/70 font-medium uppercase tracking-wider">
          {showPosition}
        </span>
      )}
      <div
        onClick={onClick}
        className={`
          ${sizeClasses[size]}
          cursor-pointer
          transition-transform duration-200
          ${onClick ? 'hover:-translate-y-2' : ''}
          ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900 rounded-lg' : ''}
        `}
        style={{ perspective: '1000px' }}
      >
        <div
          className={`
            relative w-full h-full transition-transform duration-500
            ${isFlipped ? '' : ''}
          `}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Card Back */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden shadow-xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 flex items-center justify-center border-2 border-indigo-400/30">
              <div className="w-[85%] h-[90%] border border-indigo-400/20 rounded-md flex items-center justify-center">
                <div className="text-4xl opacity-50">✦</div>
              </div>
            </div>
          </div>

          {/* Card Front */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden shadow-xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {card ? (
              <div className={`w-full h-full ${isReversed ? 'rotate-180' : ''}`}>
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <span className="text-slate-500">No card</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {isFlipped && card && (
        <div className="text-center mt-1">
          <span className="text-sm font-medium text-white">{card.name}</span>
          {isReversed && (
            <span className="text-xs text-indigo-400 ml-1">(Reversed)</span>
          )}
        </div>
      )}
    </div>
  )
}

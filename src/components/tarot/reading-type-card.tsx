'use client'

/**
 * Reading Type Card Component
 *
 * Displays a selectable card for choosing a tarot reading type.
 */

import type { SpreadConfig } from '@/types/tarot'

interface ReadingTypeCardProps {
  spread: SpreadConfig
  isSelected: boolean
  onSelect: () => void
  disabled?: boolean
  usedToday?: boolean
}

export function ReadingTypeCard({ spread, isSelected, onSelect, disabled, usedToday }: ReadingTypeCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled && !usedToday}
      className={`
        relative w-full text-left transition-all duration-200
        ${disabled && !usedToday ? 'opacity-60 cursor-not-allowed' : ''}
        ${isSelected && !disabled ? 'scale-[1.01]' : 'hover:scale-[1.005]'}
      `}
    >
      <div className={`
        p-6 rounded-2xl transition-all
        ${isSelected
          ? 'bg-slate-800/80 ring-2 ring-indigo-500/60 shadow-lg shadow-indigo-500/10'
          : usedToday
            ? 'bg-slate-800/40 hover:bg-slate-800/60 ring-1 ring-indigo-500/30'
            : 'bg-slate-800/40 hover:bg-slate-800/60'
        }
      `}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="text-3xl flex-shrink-0">
            {spread.icon}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-white">
                {spread.name}
              </h3>
              {usedToday && (
                <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full">
                  View reading
                </span>
              )}
              {isSelected && !usedToday && (
                <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-sm leading-relaxed mb-2 text-slate-400">
              {spread.description}
            </p>
            <p className={`text-xs font-medium ${
              isSelected
                ? 'text-indigo-400'
                : 'text-indigo-400/70'
            }`}>
              {spread.cardCount} {spread.cardCount === 1 ? 'card' : 'cards'}
            </p>
          </div>

          {/* Arrow for used readings */}
          {usedToday && (
            <div className="flex-shrink-0 self-center">
              <svg className="w-5 h-5 text-indigo-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

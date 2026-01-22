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
}

export function ReadingTypeCard({ spread, isSelected, onSelect, disabled }: ReadingTypeCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        relative w-full text-left transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isSelected && !disabled ? 'scale-[1.01]' : 'hover:scale-[1.005]'}
      `}
    >
      <div className={`
        p-6 rounded-2xl transition-all
        ${isSelected
          ? 'bg-slate-800/80 ring-2 ring-indigo-500/60 shadow-lg shadow-indigo-500/10'
          : 'bg-slate-800/40 hover:bg-slate-800/60'
        }
      `}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="text-3xl flex-shrink-0">{spread.icon}</div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-white">
                {spread.name}
              </h3>
              {isSelected && (
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
            <p className="text-sm text-slate-400 leading-relaxed mb-2">
              {spread.description}
            </p>
            <p className={`text-xs font-medium ${isSelected ? 'text-indigo-400' : 'text-indigo-400/70'}`}>
              {spread.cardCount} {spread.cardCount === 1 ? 'card' : 'cards'}
            </p>
          </div>
        </div>
      </div>
    </button>
  )
}

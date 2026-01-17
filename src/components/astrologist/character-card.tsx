'use client'

/**
 * Character Card Component
 *
 * Displays a selectable character card for the AI astrologist.
 */

import type { Character } from '@/types'

interface CharacterCardProps {
  character: Character
  isSelected: boolean
  onSelect: () => void
}

export function CharacterCard({ character, isSelected, onSelect }: CharacterCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        relative w-full text-left p-6 rounded-2xl border-2 transition-all duration-200
        ${isSelected
          ? `bg-gradient-to-br ${character.gradient} border-white/30 scale-[1.02] shadow-lg`
          : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800/70'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{character.avatar}</span>
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-slate-200'}`}>
            {character.name}
          </h3>
          <p className={`text-sm font-medium ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
            {character.tagline}
          </p>
          <p className={`mt-2 text-sm ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>
            {character.description}
          </p>
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      )}
    </button>
  )
}

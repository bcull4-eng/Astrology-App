'use client'

/**
 * Character Card Component
 *
 * Displays a selectable character card for the AI astrologist.
 */

import Image from 'next/image'
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
        relative w-full text-left transition-all duration-200
        ${isSelected ? 'scale-[1.01]' : 'hover:scale-[1.005]'}
      `}
    >
      <div className={`
        flex items-stretch overflow-hidden rounded-2xl transition-all
        ${isSelected
          ? 'bg-slate-800/80 ring-2 ring-indigo-500/60 shadow-lg shadow-indigo-500/10'
          : 'bg-slate-800/40 hover:bg-slate-800/60'
        }
      `}>
        {/* Character image */}
        <div className="relative w-32 h-40 flex-shrink-0">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-white">
              {character.name}
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
          <p className={`text-sm font-medium mb-2 ${isSelected ? 'text-indigo-400' : 'text-indigo-400/70'}`}>
            {character.tagline}
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            {character.description}
          </p>
        </div>
      </div>
    </button>
  )
}

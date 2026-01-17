'use client'

/**
 * Character Selector Component
 *
 * Grid of character cards for selecting an AI astrologist personality.
 */

import { CharacterCard } from './character-card'
import { characterList } from '@/lib/astrologist/characters'
import type { CharacterId } from '@/types'

interface CharacterSelectorProps {
  selectedCharacter: CharacterId | null
  onSelect: (characterId: CharacterId) => void
}

export function CharacterSelector({ selectedCharacter, onSelect }: CharacterSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Choose Your Astrologist</h1>
        <p className="text-slate-400">Each astrologist has their own unique style and approach</p>
      </div>

      <div className="space-y-4">
        {characterList.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedCharacter === character.id}
            onSelect={() => onSelect(character.id)}
          />
        ))}
      </div>

      {selectedCharacter && (
        <div className="mt-8 text-center">
          <button
            onClick={() => onSelect(selectedCharacter)}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
          >
            Start Chatting
          </button>
        </div>
      )}
    </div>
  )
}

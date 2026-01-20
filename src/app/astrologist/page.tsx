'use client'

/**
 * AI Astrologist Page
 *
 * Chat with AI astrologers that have distinct personalities.
 */

import { useEffect, useState } from 'react'
import { CharacterSelector, ChatInterface } from '@/components/astrologist'
import { useAstrologistStore } from '@/store/astrologist'
import type { CharacterId } from '@/types'

export default function AstrologistPage() {
  const [mounted, setMounted] = useState(false)
  const { selectedCharacter, selectCharacter } = useAstrologistStore()
  const [viewingChat, setViewingChat] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSelectCharacter = (characterId: CharacterId) => {
    selectCharacter(characterId)
    setViewingChat(true)
  }

  const handleBack = () => {
    setViewingChat(false)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <div className="animate-pulse text-indigo-200/50">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {viewingChat && selectedCharacter ? (
        <ChatInterface characterId={selectedCharacter} onBack={handleBack} />
      ) : (
        <div className="flex-1 overflow-y-auto py-8 px-6">
          <CharacterSelector
            selectedCharacter={selectedCharacter}
            onSelect={handleSelectCharacter}
          />
        </div>
      )}
    </div>
  )
}

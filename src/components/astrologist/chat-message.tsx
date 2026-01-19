'use client'

/**
 * Chat Message Component
 *
 * Displays a single chat message with character-specific styling.
 */

import { getCharacter } from '@/lib/astrologist/characters'
import type { AstrologistMessage } from '@/types'

interface ChatMessageProps {
  message: AstrologistMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const character = getCharacter(message.characterId)

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[80%] bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-br-md">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-3 max-w-[85%]">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${character.gradient} flex items-center justify-center text-lg`}
        >
          {character.avatar}
        </div>
        <div className="bg-indigo-950/50 text-indigo-100 px-4 py-3 rounded-2xl rounded-bl-md">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  )
}

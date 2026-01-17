/**
 * AI Astrologist Types
 *
 * Types for the AI astrologist chat feature with character personalities.
 */

export type CharacterId = 'celeste' | 'nova' | 'orion'

export interface Character {
  id: CharacterId
  name: string
  tagline: string
  avatar: string
  description: string
  systemPrompt: string
  gradient: string
  accentColor: string
}

export interface AstrologistMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  characterId: CharacterId
  createdAt: Date
}

export interface AstrologistConversation {
  characterId: CharacterId
  messages: AstrologistMessage[]
}

export interface AstrologistState {
  selectedCharacter: CharacterId | null
  conversations: Record<CharacterId, AstrologistMessage[]>
  isLoading: boolean

  // Actions
  selectCharacter: (characterId: CharacterId | null) => void
  addMessage: (characterId: CharacterId, message: Omit<AstrologistMessage, 'id' | 'createdAt'>) => void
  updateLastMessage: (characterId: CharacterId, content: string) => void
  clearConversation: (characterId: CharacterId) => void
  setIsLoading: (loading: boolean) => void
}

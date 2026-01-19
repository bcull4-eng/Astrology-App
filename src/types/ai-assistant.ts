/**
 * Types for the site-wide AI Assistant feature
 */

export interface AIContext {
  // Current page/section context
  pageName: string
  pageDescription?: string
  // Specific context about what the user is viewing
  viewingContext?: {
    type: 'chart' | 'placement' | 'report' | 'calculator' | 'lesson' | 'general'
    details?: string
    data?: Record<string, unknown>
  }
}

export interface AIAssistantState {
  // Modal state
  isOpen: boolean
  // Current question/selection
  selectedText?: string
  // Context about current view
  context: AIContext
  // Conversation for current session
  messages: AIMessage[]
  // Loading state
  isLoading: boolean
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface AIAssistantActions {
  openAssistant: (selectedText?: string) => void
  closeAssistant: () => void
  setContext: (context: Partial<AIContext>) => void
  askQuestion: (question: string) => Promise<void>
  clearMessages: () => void
}

export type AIAssistantStore = AIAssistantState & AIAssistantActions

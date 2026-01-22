'use client'

import { Sparkles } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useAIAssistantStore } from '@/store/ai-assistant'

interface FloatingAIButtonProps {
  onClick?: () => void
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  const { isOpen } = useAIAssistantStore()
  const pathname = usePathname()

  // Don't show on astrologist page (has its own chat)
  if (pathname?.startsWith('/astrologist')) return null

  // Don't show if modal is already open
  if (isOpen) return null

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[9990] w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
      title="Ask AI Assistant"
    >
      <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />
    </button>
  )
}

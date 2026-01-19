'use client'

import { useEffect, useState } from 'react'
import { useTextSelection } from '@/hooks/use-text-selection'
import { useSubscription } from '@/hooks/use-subscription'
import { useAIAssistantStore } from '@/store/ai-assistant'
import { SelectionPopup } from './selection-popup'
import { AssistantModal } from './assistant-modal'
import { FloatingAIButton } from './floating-button'
import { UpgradePrompt } from './upgrade-prompt'

interface AIAssistantProviderProps {
  children: React.ReactNode
}

export function AIAssistantProvider({ children }: AIAssistantProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
  const [upgradeSelectedText, setUpgradeSelectedText] = useState<string | undefined>()

  const { selection, clearSelection } = useTextSelection()
  const { openAssistant, isOpen } = useAIAssistantStore()
  const { isPro, loading: subscriptionLoading } = useSubscription()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAskAboutSelection = () => {
    if (selection?.text) {
      if (isPro) {
        openAssistant(selection.text)
      } else {
        // Show upgrade prompt for free users
        setUpgradeSelectedText(selection.text)
        setShowUpgradePrompt(true)
      }
      clearSelection()
    }
  }

  const handleFloatingButtonClick = () => {
    if (isPro) {
      openAssistant()
    } else {
      setUpgradeSelectedText(undefined)
      setShowUpgradePrompt(true)
    }
  }

  if (!mounted) {
    return <>{children}</>
  }

  // Don't show anything while checking subscription
  if (subscriptionLoading) {
    return <>{children}</>
  }

  return (
    <>
      {children}

      {/* Selection Popup - show for both free and pro users */}
      {selection && !isOpen && !showUpgradePrompt && (
        <SelectionPopup
          x={selection.x}
          y={selection.y}
          onAskAI={handleAskAboutSelection}
          onClose={clearSelection}
        />
      )}

      {/* Floating AI Button - always visible */}
      <FloatingAIButton onClick={handleFloatingButtonClick} />

      {/* Assistant Modal - only for Pro users */}
      {isPro && <AssistantModal />}

      {/* Upgrade Prompt - for free users */}
      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        selectedText={upgradeSelectedText}
      />
    </>
  )
}

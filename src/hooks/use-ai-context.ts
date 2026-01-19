'use client'

import { useEffect } from 'react'
import { useAIAssistantStore } from '@/store/ai-assistant'
import type { AIContext } from '@/types/ai-assistant'

/**
 * Hook to set the AI assistant context for the current page.
 * Call this in page components to provide context-aware AI assistance.
 *
 * @example
 * ```tsx
 * useAIContext({
 *   pageName: 'Birth Chart',
 *   pageDescription: 'Viewing your complete natal chart',
 *   viewingContext: {
 *     type: 'chart',
 *     details: 'Full birth chart with all planetary placements',
 *     data: { chart: natalChart }
 *   }
 * })
 * ```
 */
export function useAIContext(context: Partial<AIContext>) {
  const setContext = useAIAssistantStore((state) => state.setContext)

  useEffect(() => {
    setContext(context)

    // Reset to default on unmount
    return () => {
      setContext({
        pageName: 'Astrology App',
        pageDescription: undefined,
        viewingContext: undefined,
      })
    }
  }, [context, setContext])
}

'use client'

import { useState, useEffect, useCallback } from 'react'

interface TextSelection {
  text: string
  x: number
  y: number
}

export function useTextSelection() {
  const [selection, setSelection] = useState<TextSelection | null>(null)

  const handleSelectionChange = useCallback(() => {
    const windowSelection = window.getSelection()

    if (!windowSelection || windowSelection.isCollapsed) {
      // Small delay before clearing to allow for click handling
      setTimeout(() => {
        const currentSelection = window.getSelection()
        if (!currentSelection || currentSelection.isCollapsed) {
          setSelection(null)
        }
      }, 100)
      return
    }

    const text = windowSelection.toString().trim()

    // Only show for meaningful selections (more than 2 characters)
    if (text.length < 3) {
      setSelection(null)
      return
    }

    // Get the position of the selection
    const range = windowSelection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    // Position the popup above the selection, centered
    setSelection({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 10, // 10px above the selection
    })
  }, [])

  const clearSelection = useCallback(() => {
    setSelection(null)
    window.getSelection()?.removeAllRanges()
  }, [])

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [handleSelectionChange])

  return { selection, clearSelection }
}

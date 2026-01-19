'use client'

import { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'

interface SelectionPopupProps {
  x: number
  y: number
  onAskAI: () => void
  onClose: () => void
}

export function SelectionPopup({ x, y, onAskAI, onClose }: SelectionPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Small delay to avoid immediate closure
    const timeout = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  // Adjust position to stay within viewport
  const adjustedX = Math.max(60, Math.min(x, window.innerWidth - 60))
  const adjustedY = Math.max(50, y)

  return (
    <div
      ref={popupRef}
      className="fixed z-[9999] animate-in fade-in zoom-in-95 duration-150"
      style={{
        left: adjustedX,
        top: adjustedY,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <button
        onClick={onAskAI}
        className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-lg transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Explain this
      </button>
      {/* Arrow pointing down */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-indigo-600"
      />
    </div>
  )
}

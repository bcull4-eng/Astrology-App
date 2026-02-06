'use client'

/**
 * ScrollWheelPicker
 *
 * CSS scroll-snap based picker for date/time selection.
 * Inspired by iOS-style wheel pickers.
 */

import { useRef, useEffect, useCallback } from 'react'

interface PickerItem<T> {
  value: T
  label: string
}

interface ScrollWheelPickerProps<T> {
  items: PickerItem<T>[]
  value: T | null
  onChange: (value: T) => void
  itemHeight?: number
  visibleItems?: number
}

export function ScrollWheelPicker<T extends string | number>({
  items,
  value,
  onChange,
  itemHeight = 44,
  visibleItems = 5,
}: ScrollWheelPickerProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>(null)

  const containerHeight = itemHeight * visibleItems
  const paddingItems = Math.floor(visibleItems / 2)

  // Scroll to selected value on mount and when value changes externally
  useEffect(() => {
    if (value === null || !containerRef.current) return

    const index = items.findIndex((item) => item.value === value)
    if (index === -1) return

    const scrollTop = index * itemHeight
    containerRef.current.scrollTop = scrollTop
  }, [value, items, itemHeight])

  // Handle scroll end to snap to nearest item
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    isScrollingRef.current = true

    // Wait for scroll to settle
    scrollTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return

      const scrollTop = containerRef.current.scrollTop
      const index = Math.round(scrollTop / itemHeight)
      const clampedIndex = Math.max(0, Math.min(index, items.length - 1))

      // Snap to nearest item
      containerRef.current.scrollTop = clampedIndex * itemHeight

      // Update value if changed
      const newValue = items[clampedIndex]?.value
      if (newValue !== undefined && newValue !== value) {
        onChange(newValue)
      }

      isScrollingRef.current = false
    }, 100)
  }, [items, itemHeight, value, onChange])

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white/5"
      style={{ height: containerHeight }}
    >
      {/* Gradient masks */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#1a1a2e] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1a1a2e] to-transparent pointer-events-none z-10" />

      {/* Selection indicator */}
      <div
        className="absolute inset-x-2 border-y border-indigo-500/50 pointer-events-none z-10"
        style={{
          top: paddingItems * itemHeight,
          height: itemHeight,
        }}
      />

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scroll-wheel-picker scrollbar-hide"
        onScroll={handleScroll}
      >
        {/* Top padding */}
        <div style={{ height: paddingItems * itemHeight }} />

        {/* Items */}
        {items.map((item, index) => {
          const isSelected = item.value === value

          return (
            <div
              key={`${item.value}-${index}`}
              className={`
                flex items-center justify-center scroll-wheel-item transition-all
                ${isSelected ? 'text-white font-medium' : 'text-white/40'}
              `}
              style={{ height: itemHeight }}
              onClick={() => {
                onChange(item.value)
                // Scroll to item
                if (containerRef.current) {
                  containerRef.current.scrollTo({
                    top: index * itemHeight,
                    behavior: 'smooth',
                  })
                }
              }}
            >
              <span className="text-lg">{item.label}</span>
            </div>
          )
        })}

        {/* Bottom padding */}
        <div style={{ height: paddingItems * itemHeight }} />
      </div>
    </div>
  )
}

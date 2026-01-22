'use client'

import { useState, useEffect, useRef } from 'react'
import { Star } from 'lucide-react'

interface AnimatedUserCountProps {
  target?: number
  duration?: number
}

export function AnimatedUserCount({ target = 237, duration = 2500 }: AnimatedUserCountProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number
          let animationFrame: number

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime

            // Ease out cubic - slows down significantly as we approach target
            const easeOut = 1 - Math.pow(1 - Math.min(progress / duration, 1), 3)
            const current = Math.floor(easeOut * target)

            setCount(current)

            if (progress < duration) {
              animationFrame = requestAnimationFrame(animate)
            } else {
              setCount(target)
            }
          }

          animationFrame = requestAnimationFrame(animate)

          return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full"
    >
      <div className="flex -space-x-2">
        {['SM', 'JK', 'EL', 'MT'].map((initials, i) => (
          <div
            key={i}
            className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-slate-800"
          >
            {initials}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <span className="text-slate-400 text-sm">
        Loved by <span className="text-white font-medium">{count.toLocaleString()}</span> users
      </span>
    </div>
  )
}

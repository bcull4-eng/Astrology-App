'use client'

/**
 * Starfield Background Component
 *
 * Creates an animated starfield effect with twinkling stars
 * similar to the StarsTell design reference.
 */

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000)
      starsRef.current = []

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7
        const currentOpacity = star.opacity * twinkle

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.fill()

        // Add subtle glow to larger stars
        if (star.size > 1) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.1})`
          ctx.fill()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

/**
 * Static Starfield using CSS
 * A lighter alternative that doesn't use canvas animation
 */
export function StaticStarfield() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Small stars layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, white, transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 160px 120px, white, transparent),
            radial-gradient(1.5px 1.5px at 200px 50px, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 220px 140px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 250px 90px, white, transparent)
          `,
          backgroundSize: '300px 200px',
        }}
      />
      {/* Medium stars layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 100px 100px, white, transparent),
            radial-gradient(2px 2px at 250px 200px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1.5px 1.5px at 400px 150px, white, transparent),
            radial-gradient(2px 2px at 550px 50px, rgba(255,255,255,0.9), transparent),
            radial-gradient(1.5px 1.5px at 150px 300px, rgba(255,255,255,0.7), transparent)
          `,
          backgroundSize: '600px 400px',
        }}
      />
    </div>
  )
}

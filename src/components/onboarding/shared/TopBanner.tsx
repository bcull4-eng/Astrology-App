'use client'

/**
 * TopBanner - Social proof and feature highlights for onboarding steps
 *
 * Displays rotating testimonials, stats, or feature highlights
 * in the empty space above the question.
 */

import { useState, useEffect } from 'react'
import { Star, Users, Sparkles, Heart, TrendingUp, Shield } from 'lucide-react'

type BannerVariant = 'testimonial' | 'stat' | 'feature'

interface Testimonial {
  text: string
  author: string
  rating: number
}

interface Stat {
  value: string
  label: string
  icon: React.ElementType
}

interface Feature {
  title: string
  description: string
  icon: React.ElementType
}

const TESTIMONIALS: Testimonial[] = [
  { text: "Scarily accurate! It knew things about me I barely admit to myself.", author: "Sarah M.", rating: 5 },
  { text: "The most detailed birth chart analysis I've ever received.", author: "James K.", rating: 5 },
  { text: "Finally an astrology app that actually feels personal to ME.", author: "Emma R.", rating: 5 },
  { text: "My daily horoscopes are spot on. I check it every morning!", author: "Michael T.", rating: 5 },
  { text: "The compatibility report saved my relationship!", author: "Lisa P.", rating: 5 },
  { text: "Worth every penny. The insights are incredible.", author: "David H.", rating: 5 },
]

const STATS: Stat[] = [
  { value: "47,892", label: "Reports delivered", icon: TrendingUp },
  { value: "4.9", label: "Average rating", icon: Star },
  { value: "12,000+", label: "Happy users", icon: Users },
  { value: "98%", label: "Accuracy rated", icon: Sparkles },
]

const FEATURES: Feature[] = [
  { title: "AI-Powered Analysis", description: "Advanced algorithms analyze your unique cosmic blueprint", icon: Sparkles },
  { title: "Daily Insights", description: "Personalized horoscopes delivered fresh every morning", icon: Star },
  { title: "Love Compatibility", description: "Deep relationship analysis with any zodiac sign", icon: Heart },
  { title: "Secure & Private", description: "Your birth data is encrypted and never shared", icon: Shield },
]

interface TopBannerProps {
  variant?: BannerVariant
  className?: string
}

export function TopBanner({ variant = 'testimonial', className = '' }: TopBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Rotate content every 4 seconds
  useEffect(() => {
    const items = variant === 'testimonial' ? TESTIMONIALS : variant === 'stat' ? STATS : FEATURES
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [variant])

  if (variant === 'testimonial') {
    const testimonial = TESTIMONIALS[currentIndex]
    return (
      <div className={`px-6 py-4 ${className}`}>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-w-sm mx-auto">
          <div className="flex gap-0.5 mb-2 justify-center">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-white/80 text-sm text-center italic mb-2">
            "{testimonial.text}"
          </p>
          <p className="text-white/40 text-xs text-center">— {testimonial.author}</p>
        </div>
      </div>
    )
  }

  if (variant === 'stat') {
    return (
      <div className={`px-6 py-4 ${className}`}>
        <div className="flex justify-center gap-6">
          {STATS.slice(0, 3).map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span className="text-white font-bold">{stat.value}</span>
                </div>
                <p className="text-white/50 text-xs">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Feature variant
  const feature = FEATURES[currentIndex]
  const Icon = feature.icon
  return (
    <div className={`px-6 py-4 ${className}`}>
      <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
        <div className="p-2 rounded-lg bg-indigo-500/20">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">{feature.title}</p>
          <p className="text-white/50 text-xs">{feature.description}</p>
        </div>
      </div>
    </div>
  )
}

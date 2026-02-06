'use client'

/**
 * TopBanner - Social proof and feature highlights for onboarding steps
 *
 * Displays rotating testimonials, stats, or feature highlights
 * in the empty space above the question.
 *
 * Use startIndex to ensure each step shows different content.
 */

import { useState, useEffect } from 'react'
import { Star, Users, Sparkles, Heart, TrendingUp, Shield, Zap, Clock } from 'lucide-react'

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

// 8 testimonials - one unique per step that uses testimonials
const TESTIMONIALS: Testimonial[] = [
  { text: "Scarily accurate! It knew things about me I barely admit to myself.", author: "Sarah M.", rating: 5 },
  { text: "The most detailed birth chart analysis I've ever received.", author: "James K.", rating: 5 },
  { text: "Finally an astrology app that actually feels personal to ME.", author: "Emma R.", rating: 5 },
  { text: "My daily horoscopes are spot on. I check it every morning!", author: "Michael T.", rating: 5 },
  { text: "The compatibility report saved my relationship!", author: "Lisa P.", rating: 5 },
  { text: "Worth every penny. The insights are incredible.", author: "David H.", rating: 5 },
  { text: "I was skeptical but this blew my mind. So accurate!", author: "Rachel W.", rating: 5 },
  { text: "Better than any astrologer I've seen in person.", author: "Tom B.", rating: 5 },
]

// Different stat sets for different steps
const STAT_SETS: Stat[][] = [
  [
    { value: "1,783", label: "Reports today", icon: TrendingUp },
    { value: "4.9", label: "Average rating", icon: Star },
    { value: "217", label: "Reviews", icon: Users },
  ],
  [
    { value: "98%", label: "Accuracy rated", icon: Sparkles },
    { value: "2 min", label: "Average time", icon: Clock },
    { value: "4.9", label: "Star rating", icon: Star },
  ],
  [
    { value: "217", label: "5-star reviews", icon: Star },
    { value: "1,783", label: "Charts today", icon: TrendingUp },
    { value: "98%", label: "Recommend us", icon: Heart },
  ],
  [
    { value: "4.9", label: "User rating", icon: Star },
    { value: "98%", label: "Satisfaction", icon: Sparkles },
    { value: "1,783", label: "Daily users", icon: Users },
  ],
]

// 8 features - one unique per step that uses features
const FEATURES: Feature[] = [
  { title: "AI-Powered Analysis", description: "Advanced algorithms analyze your unique cosmic blueprint", icon: Sparkles },
  { title: "Daily Insights", description: "Personalized horoscopes delivered fresh every morning", icon: Star },
  { title: "Love Compatibility", description: "Deep relationship analysis with any zodiac sign", icon: Heart },
  { title: "Secure & Private", description: "Your birth data is encrypted and never shared", icon: Shield },
  { title: "Instant Results", description: "Get your full birth chart analysis in seconds", icon: Zap },
  { title: "Palm Reading", description: "Unlock deeper insights with our palm scan technology", icon: Sparkles },
  { title: "Life Predictions", description: "Discover what the stars have in store for your future", icon: Star },
  { title: "Expert Accuracy", description: "Calculations verified by professional astrologers", icon: Shield },
]

interface TopBannerProps {
  variant?: BannerVariant
  className?: string
  startIndex?: number // Use different startIndex for each step to show unique content
}

export function TopBanner({ variant = 'testimonial', className = '', startIndex = 0 }: TopBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)

  // Rotate content every 5 seconds (slower to read)
  useEffect(() => {
    const items = variant === 'testimonial' ? TESTIMONIALS : variant === 'feature' ? FEATURES : STAT_SETS
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 5000)
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
    const statSet = STAT_SETS[currentIndex % STAT_SETS.length]
    return (
      <div className={`px-6 py-4 ${className}`}>
        <div className="flex justify-center gap-6">
          {statSet.map((stat, i) => {
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

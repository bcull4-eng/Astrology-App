'use client'

import { Star, BadgeCheck } from 'lucide-react'
import type { Testimonial } from './testimonials-data'

interface TestimonialCardProps {
  testimonial: Testimonial
  variant?: 'default' | 'compact' | 'featured'
}

export function TestimonialCard({ testimonial, variant = 'default' }: TestimonialCardProps) {
  const { name, location, rating, text, highlight, date, verified } = testimonial

  // Get initials for avatar
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  if (variant === 'compact') {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-white text-sm">{name}</span>
              {verified && <BadgeCheck className="w-4 h-4 text-indigo-400" />}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-slate-300 text-sm line-clamp-3">{text}</p>
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
            />
          ))}
        </div>

        {highlight && (
          <p className="text-xl md:text-2xl font-medium text-white mb-4 leading-relaxed">
            &ldquo;{highlight}&rdquo;
          </p>
        )}

        <p className="text-slate-300 mb-6">{text}</p>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{name}</span>
              {verified && <BadgeCheck className="w-5 h-5 text-indigo-400" />}
            </div>
            <span className="text-slate-400 text-sm">{location}</span>
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`}
          />
        ))}
        <span className="text-slate-500 text-xs ml-2">{date}</span>
      </div>

      <p className="text-slate-300 text-sm mb-4 leading-relaxed">{text}</p>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-white text-sm">{name}</span>
            {verified && <BadgeCheck className="w-4 h-4 text-indigo-400" />}
          </div>
          <span className="text-slate-500 text-xs">{location}</span>
        </div>
      </div>
    </div>
  )
}

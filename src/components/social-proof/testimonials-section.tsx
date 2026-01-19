'use client'

import { Star } from 'lucide-react'
import { TestimonialCard } from './testimonial-card'
import { testimonials, stats, getRandomTestimonials, getTestimonialsByFeature, type Testimonial } from './testimonials-data'

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  feature?: Testimonial['feature']
  count?: number
  showStats?: boolean
  variant?: 'grid' | 'carousel' | 'featured'
  className?: string
}

export function TestimonialsSection({
  title = 'What Our Users Say',
  subtitle,
  feature,
  count = 6,
  showStats = true,
  variant = 'grid',
  className = '',
}: TestimonialsSectionProps) {
  const displayTestimonials = feature
    ? getTestimonialsByFeature(feature).slice(0, count)
    : getRandomTestimonials(count)

  return (
    <section className={className}>
      {/* Header */}
      <div className="text-center mb-10">
        {showStats && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-white font-semibold">{stats.averageRating}</span>
            <span className="text-slate-400">from {stats.totalReviews} reviews</span>
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
        {subtitle && <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
      </div>

      {/* Testimonials Grid */}
      {variant === 'grid' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}

      {/* Featured Layout - 1 large + 2 small */}
      {variant === 'featured' && displayTestimonials.length >= 3 && (
        <div className="grid lg:grid-cols-2 gap-6">
          <TestimonialCard testimonial={displayTestimonials[0]} variant="featured" />
          <div className="space-y-4">
            <TestimonialCard testimonial={displayTestimonials[1]} />
            <TestimonialCard testimonial={displayTestimonials[2]} />
          </div>
        </div>
      )}

      {/* Carousel - horizontal scroll on mobile */}
      {variant === 'carousel' && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {displayTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-[300px] md:min-w-[350px] snap-start">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

'use client'

/**
 * Course Preview / Paywall Page
 *
 * Compelling sales page showing what the course offers
 * before users purchase for £49.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  COURSE_PRICE,
  COMPREHENSIVE_COURSE_OUTLINE,
  LEARNING_OUTCOMES,
  TARGET_AUDIENCE,
  COURSE_FEATURES,
  TESTIMONIALS,
  CERTIFICATE_INFO,
} from '@/lib/comprehensive-course'

export default function CoursePreviewPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  const handlePurchase = async () => {
    setLoading(true)
    // TODO: Implement Stripe checkout
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store purchase in sessionStorage for demo
    sessionStorage.setItem('course-purchased', 'true')
    router.push('/learn')
  }

  const getFeatureIcon = (icon: string) => {
    const icons: Record<string, React.ReactNode> = {
      book: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      clock: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      chart: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      quiz: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      certificate: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      teach: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    }
    return icons[icon] || icons.book
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Link */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-indigo-200/50 hover:text-white mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Learn
      </Link>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
          <span className="text-lg">✨</span>
          From curious to confident
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Learn Astrology Properly
        </h1>
        <p className="text-xl text-indigo-200/70 max-w-2xl mx-auto mb-6">
          A complete course that takes you from &quot;what&apos;s a rising sign?&quot; to confidently reading charts for yourself and others. Whether you want personal insight or to start reading professionally.
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-indigo-200/60">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {COMPREHENSIVE_COURSE_OUTLINE.totalLessons} Lessons
          </div>
          <div className="flex items-center gap-2 text-indigo-200/60">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {COMPREHENSIVE_COURSE_OUTLINE.estimatedHours}+ Hours
          </div>
          <div className="flex items-center gap-2 text-indigo-200/60">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {COMPREHENSIVE_COURSE_OUTLINE.totalModules} Modules
          </div>
        </div>
      </div>

      {/* Price Card - Sticky on desktop */}
      <div className="bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl p-8 mb-12 border border-indigo-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-indigo-200/50 text-sm mb-1">One-time purchase</div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">£{COURSE_PRICE}</span>
              <span className="text-indigo-200/50">lifetime access</span>
            </div>
            <p className="text-indigo-200/60 text-sm mt-2">
              Includes certificate upon completion
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                'Enroll Now'
              )}
            </button>
            <div className="flex items-center justify-center gap-4 text-xs text-indigo-300/50">
              <span>30-day guarantee</span>
              <span>•</span>
              <span>Instant access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="bg-indigo-950/30 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-48 h-36 bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-orange-500/20 rounded-xl border-2 border-amber-500/30 flex flex-col items-center justify-center p-4">
              <svg className="w-12 h-12 text-amber-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <div className="text-amber-400 font-semibold text-sm text-center">Certified Astrology Practitioner</div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Earn Your Certificate</h2>
            <p className="text-indigo-200/60 mb-4">
              Complete the course and earn your <span className="text-amber-400 font-medium">{CERTIFICATE_INFO.title}</span> credential.
              Share it on LinkedIn, add it to your website, or use it to establish credibility with clients.
            </p>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATE_INFO.skills.slice(0, 4).map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-indigo-900/50 text-indigo-200/70 text-sm rounded-full">
                  {skill}
                </span>
              ))}
              <span className="px-3 py-1 bg-indigo-900/50 text-indigo-300/50 text-sm rounded-full">
                +{CERTIFICATE_INFO.skills.length - 4} more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">What You&apos;ll Learn</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {LEARNING_OUTCOMES.map((outcome, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-indigo-950/30 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-indigo-200/80">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Course Features</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {COURSE_FEATURES.map((feature, i) => (
            <div key={i} className="p-6 bg-indigo-950/30 rounded-xl text-center">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-400">
                {getFeatureIcon(feature.icon)}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-indigo-200/50 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full Curriculum */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Full Curriculum</h2>
        <div className="space-y-3">
          {COMPREHENSIVE_COURSE_OUTLINE.modules.map((module) => (
            <div key={module.id} className="bg-indigo-950/30 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-indigo-900/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-semibold">
                    {module.number}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{module.title}</h3>
                    <p className="text-indigo-200/50 text-sm">{module.lessons} lessons</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-indigo-300/50 transition-transform ${expandedModule === module.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedModule === module.id && (
                <div className="px-6 pb-4 pt-2 border-t border-indigo-500/10">
                  <p className="text-indigo-200/60 text-sm mb-4">{module.description}</p>
                  <ul className="space-y-2">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-indigo-200/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Who This Is For */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Who This Course Is For</h2>
        <div className="bg-indigo-950/30 rounded-xl p-6">
          <ul className="space-y-3">
            {TARGET_AUDIENCE.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-indigo-200/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">What Students Say</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((testimonial, i) => (
            <div key={i} className="bg-indigo-950/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-indigo-200/50 text-sm">{testimonial.location}</div>
                </div>
              </div>
              <p className="text-indigo-200/70 text-sm italic">&ldquo;{testimonial.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl p-8 text-center border border-indigo-500/20">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to Begin Your Journey?</h2>
        <p className="text-indigo-200/60 mb-6 max-w-xl mx-auto">
          Join thousands of students who have transformed their understanding of astrology.
          Start learning today with lifetime access and earn your certificate.
        </p>
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
        >
          {loading ? 'Processing...' : `Enroll Now - £${COURSE_PRICE}`}
        </button>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-indigo-300/50">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure payment
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            30-day guarantee
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Lifetime access
          </div>
        </div>
      </div>
    </div>
  )
}

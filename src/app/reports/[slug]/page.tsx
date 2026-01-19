'use client'

/**
 * Report Detail Page
 *
 * Shows detailed information about a specific report and allows purchase.
 * Optimized for conversions with sample previews, testimonials, and trust signals.
 */

import { useState, useEffect } from 'react'
import { useParams, useRouter, notFound } from 'next/navigation'
import Link from 'next/link'
import { getReportBySlug } from '@/lib/reports'
import type { ReportDefinition, NatalChart } from '@/types'
import { TestimonialCard } from '@/components/social-proof/testimonial-card'
import { getTestimonialsByFeature, stats } from '@/components/social-proof/testimonials-data'

// Sample report excerpts for each report type
const reportSamples: Record<string, { excerpt: string; insight: string; visualization: string }> = {
  'personality-deep-dive': {
    excerpt: `Your Leo Sun illuminates the very core of who you are—a natural leader with an irresistible warmth that draws others to you like moths to a flame. This isn't mere confidence; it's an authentic radiance that comes from a deep well of creative energy and genuine self-expression.

With your Moon in Pisces, however, beneath that bold exterior lies a deeply sensitive and intuitive soul. You feel the emotions of others as keenly as your own, sometimes struggling to distinguish between the two. This combination creates a fascinating duality—the lion with the heart of a mystic.`,
    insight: `Your Mercury in Virgo gives you a razor-sharp analytical mind that perfectly complements your Leo Sun's creative vision. You don't just dream big—you meticulously plan how to achieve those dreams.`,
    visualization: 'Interactive chart wheel showing your Big Three placements and their relationships',
  },
  'relationship-compatibility': {
    excerpt: `The connection between you and Sarah reveals a profound soul recognition. Your Moons form a harmonious trine, suggesting an intuitive understanding that transcends words. When you're together, there's an unspoken emotional language—a knowing glance, a shared laugh, the comfort of silence.

However, your Mars squares her Venus, creating that classic tension between passion and harmony. This aspect generates undeniable chemistry, but can also manifest as conflicts over how you each express affection and desire.`,
    insight: `Your composite chart shows a stellium in the 7th house—the realm of partnership. This relationship is meant to teach you both about balance, compromise, and the art of true relating.`,
    visualization: 'Side-by-side chart comparison with aspect lines showing your cosmic connections',
  },
  'year-ahead-forecast': {
    excerpt: `March brings a powerful stellium in your 10th house of career and public reputation. This is your moment to step into the spotlight—a promotion, recognition, or major professional breakthrough is highly favored during the New Moon on March 14th.

By late May, Saturn's transit through your 7th house intensifies. If you're in a relationship, expect to face important decisions about commitment and long-term compatibility. Single? You may meet someone with genuine long-term potential.`,
    insight: `The Solar Eclipse in October falls directly on your natal Sun—marking this as one of the most significant years for personal transformation in over a decade. Major life changes are not just possible, they're likely.`,
    visualization: 'Month-by-month transit calendar with highlighted power days and challenging periods',
  },
  'monthly-forecast': {
    excerpt: `Week 1 opens with Mercury entering your sign, sharpening your communication and mental clarity. This is prime time for important conversations, negotiations, and signing contracts. Your words carry extra weight—choose them wisely.

The Full Moon on the 15th illuminates your 5th house of creativity and romance. If you've been working on a creative project, expect a breakthrough moment. In love, emotions surface that have been building for weeks.`,
    insight: `The Venus-Jupiter conjunction on the 22nd is this month's standout aspect—falling in your 2nd house, it could bring unexpected financial opportunities or a boost to your self-worth.`,
    visualization: 'Daily energy chart showing optimal days for career, love, finances, and health decisions',
  },
  'past-life-karma': {
    excerpt: `Your South Node in Capricorn suggests past lives as a figure of authority—perhaps a ruler, military leader, or corporate patriarch. You've mastered discipline, ambition, and the art of climbing hierarchies. In this lifetime, that drive is still present, but your soul is calling for something different.

Your North Node in Cancer beckons you toward emotional vulnerability, nurturing, and creating a true home. The very things that feel uncomfortable—expressing needs, accepting help, building intimate connections—are your soul's curriculum this time around.`,
    insight: `Saturn retrograde in your natal chart indicates unfinished karmic business around boundaries and responsibility. You may have been too harsh in past lives, or perhaps too burdened by others' expectations.`,
    visualization: 'Soul journey timeline showing karmic patterns and your evolutionary path',
  },
  'financial-potential': {
    excerpt: `Your 2nd house ruler Venus sits in Taurus—her home sign—suggesting a natural ability to attract resources and build lasting wealth. You have refined taste and understand value instinctively. However, this placement also warns against over-attachment to material security.

Jupiter in your 8th house expands your potential for shared resources, investments, and other people's money. Strategic partnerships and collaborative ventures could be your path to significant wealth accumulation.`,
    insight: `Pluto transiting your 2nd house over the coming years will completely transform your relationship with money. Old financial patterns must die for new abundance to emerge.`,
    visualization: 'Financial potential chart mapping your money houses, wealth indicators, and timing windows',
  },
  'partner-compatibility': {
    excerpt: `The composite Sun in your combined 5th house reveals a relationship built on joy, creativity, and playfulness. Together, you spark each other's creative potential and remind each other not to take life too seriously.

Your Venus conjunct their Mars creates powerful magnetic attraction—the classic indicator of romantic and physical chemistry. This aspect ensures the spark stays alive, but requires conscious effort to balance desire with tenderness.

The Moon in your composite 4th house suggests this relationship has "home" energy—you feel emotionally safe together, like you've known each other forever.`,
    insight: `Your Vertex connects to their Sun, suggesting this meeting was destined. This is one of the strongest karmic connection indicators in synastry.`,
    visualization: 'Composite chart wheel with relationship strengths highlighted and growth areas identified',
  },
}

// Get report testimonials from shared data
const reportTestimonials = getTestimonialsByFeature('reports').slice(0, 3)

export default function ReportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [report, setReport] = useState<ReportDefinition | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasChart, setHasChart] = useState(false)
  const [partnerName, setPartnerName] = useState('')
  const [partnerBirthDate, setPartnerBirthDate] = useState('')
  const [partnerBirthTime, setPartnerBirthTime] = useState('')
  const [partnerBirthPlace, setPartnerBirthPlace] = useState('')
  const [showFullSample, setShowFullSample] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  useEffect(() => {
    const foundReport = getReportBySlug(slug)
    if (!foundReport) {
      notFound()
    }
    setReport(foundReport)

    // Check if user has birth chart
    const chartData = sessionStorage.getItem('natal-chart')
    setHasChart(!!chartData)
  }, [slug])

  const sample = reportSamples[slug] || reportSamples['personality-deep-dive']

  // FAQs based on report type
  const faqs = [
    {
      question: 'How accurate is this report?',
      answer:
        'Our reports are generated using precise astronomical calculations based on your exact birth time, date, and location. The interpretations are drawn from classical and modern astrological traditions, personalized to your unique chart.',
    },
    {
      question: 'How is this different from free horoscopes?',
      answer:
        "Free horoscopes are based only on your Sun sign—one of 12 possible combinations. Our reports analyze all 10 planets, 12 houses, and dozens of aspects in your birth chart, creating thousands of unique combinations that make your report truly personal.",
    },
    {
      question: 'Do I need my exact birth time?',
      answer:
        "While we can generate a report without exact birth time, having it allows us to calculate your Rising sign and house placements accurately. If you don't know your birth time, check your birth certificate or ask family members.",
    },
    {
      question: 'Can I gift this report to someone?',
      answer:
        "Yes! After purchase, you can choose to gift the report. You'll need the recipient's birth details (date, time, and place) to generate their personalized report.",
    },
  ]

  const handlePurchase = async () => {
    if (!hasChart) {
      router.push('/birth-details')
      return
    }

    if (report?.requiresPartner && (!partnerName || !partnerBirthDate || !partnerBirthPlace)) {
      return
    }

    setLoading(true)

    // TODO: Implement Stripe checkout
    // For now, simulate purchase and redirect to generated report
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store the purchase info for report generation
    const purchaseData = {
      reportSlug: slug,
      purchasedAt: new Date().toISOString(),
      partnerData: report?.requiresPartner
        ? {
            name: partnerName,
            birthDate: partnerBirthDate,
            birthTime: partnerBirthTime,
            birthPlace: partnerBirthPlace,
          }
        : null,
    }
    sessionStorage.setItem('pending-report', JSON.stringify(purchaseData))

    router.push(`/reports/${slug}/view`)
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/reports"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Reports
      </Link>

      {/* Hero Header */}
      <div className="relative mb-8">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${report.gradient} opacity-10 rounded-3xl blur-xl`}
        />

        <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8">
          <div className="flex items-start gap-6">
            <div
              className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${report.gradient} flex items-center justify-center text-5xl shadow-lg flex-shrink-0`}
            >
              {report.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{report.title}</h1>
                {report.price === 0 && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                    Free with Pro
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-lg mb-4">{report.subtitle}</p>
              <p className="text-slate-300 leading-relaxed">{report.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{report.wordCount}</div>
                    <div className="text-slate-500 text-xs">In-depth analysis</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{report.deliveryTime}</div>
                    <div className="text-slate-500 text-xs">Delivery</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-pink-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{report.sampleSections.length} Sections</div>
                    <div className="text-slate-500 text-xs">Comprehensive</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Sample Preview Box */}
          <div id="sample" className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-indigo-500/30 rounded-2xl overflow-hidden scroll-mt-8">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-indigo-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">Sample Preview</h2>
                    <p className="text-slate-400 text-xs">See what your report will include</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-medium rounded">
                  Example Content
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Sample excerpt */}
              <div className="prose prose-invert prose-slate max-w-none">
                <div className={`${showFullSample ? '' : 'line-clamp-6'} text-slate-300 leading-relaxed whitespace-pre-line`}>
                  {sample.excerpt}
                </div>
              </div>

              {/* Expand/collapse button */}
              <button
                onClick={() => setShowFullSample(!showFullSample)}
                className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1"
              >
                {showFullSample ? 'Show less' : 'Read more of this sample'}
                <svg
                  className={`w-4 h-4 transition-transform ${showFullSample ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Key insight callout */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-lg">💡</span>
                  </div>
                  <div>
                    <div className="text-purple-400 font-medium text-sm mb-1">Key Insight Preview</div>
                    <p className="text-slate-300 text-sm">{sample.insight}</p>
                  </div>
                </div>
              </div>

              {/* Visualization preview */}
              <div className="mt-4 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-emerald-400 font-medium text-sm">Interactive Visualization</div>
                    <p className="text-slate-400 text-xs">{sample.visualization}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              What&apos;s Included
            </h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {report.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-xl">
                  <svg
                    className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Report Sections */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              {report.sampleSections.length} Detailed Sections
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {report.sampleSections.map((section, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-300 py-3 px-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-indigo-500/20 text-indigo-400 rounded-lg text-xs font-semibold">
                    {i + 1}
                  </span>
                  {section}
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L14.09 8.26L21 9.27L16 13.97L17.18 20.73L12 17.77L6.82 20.73L8 13.97L3 9.27L9.91 8.26L12 2Z" />
              </svg>
              What Others Say
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Join {stats.totalUsers} happy users with a {stats.averageRating} average rating
            </p>
            <div className="space-y-4">
              {reportTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} variant="compact" />
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-700/50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-white text-sm font-medium">{faq.question}</span>
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-slate-400 text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sticky Purchase Card */}
        <div className="md:col-span-1">
          <div className="sticky top-8 space-y-4">
            {/* Purchase Card */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
              {/* Price */}
              <div className="text-center mb-6">
                {report.price > 0 ? (
                  <>
                    <div className="text-4xl font-bold text-white">£{report.price}</div>
                    <div className="text-slate-500">one-time payment</div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-emerald-400">Free</div>
                    <div className="text-slate-500">with Pro subscription</div>
                  </>
                )}
              </div>

              {/* Value Props */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">{report.wordCount} of personalized content</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Based on your exact birth chart</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Interactive visualizations included</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Printable PDF format</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Lifetime access to your report</span>
                </div>
              </div>

              {/* Requirements */}
              {!hasChart && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <div className="text-amber-400 font-medium text-sm">Birth details required</div>
                      <div className="text-amber-400/80 text-xs mt-1">
                        You&apos;ll need to add your birth details first.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Partner Details Form */}
              {report.requiresPartner && hasChart && (
                <div className="space-y-3 mb-4">
                  <h3 className="text-white font-medium text-sm">Partner&apos;s birth details</h3>
                  <p className="text-slate-500 text-xs">
                    We need your partner&apos;s birth info to compare charts.
                  </p>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="Partner's name"
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Date of birth</label>
                    <input
                      type="date"
                      value={partnerBirthDate}
                      onChange={(e) => setPartnerBirthDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Time of birth (optional)</label>
                    <input
                      type="time"
                      value={partnerBirthTime}
                      onChange={(e) => setPartnerBirthTime(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Place of birth</label>
                    <input
                      type="text"
                      value={partnerBirthPlace}
                      onChange={(e) => setPartnerBirthPlace(e.target.value)}
                      placeholder="City, Country"
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <button
                onClick={handlePurchase}
                disabled={
                  loading ||
                  (report.requiresPartner &&
                    hasChart &&
                    (!partnerName || !partnerBirthDate || !partnerBirthPlace))
                }
                className="w-full py-4 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/25 text-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : !hasChart ? (
                  'Add birth details first'
                ) : report.price > 0 ? (
                  `Get Report - £${report.price}`
                ) : (
                  'Generate Free Report'
                )}
              </button>

              {/* Trust Signals */}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2">
                    <svg
                      className="w-5 h-5 text-slate-400 mx-auto mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <div className="text-slate-500 text-xs">Secure</div>
                  </div>
                  <div className="p-2">
                    <svg
                      className="w-5 h-5 text-slate-400 mx-auto mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div className="text-slate-500 text-xs">Instant</div>
                  </div>
                  <div className="p-2">
                    <svg
                      className="w-5 h-5 text-slate-400 mx-auto mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <div className="text-slate-500 text-xs">Personal</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gift Option */}
            {report.price > 0 && (
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <span className="text-lg">🎁</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">Gift this report</div>
                    <div className="text-slate-500 text-xs">Perfect for birthdays & special occasions</div>
                  </div>
                </div>
              </div>
            )}

            {/* Money Back Guarantee */}
            {report.price > 0 && (
              <div className="text-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="text-emerald-400 font-medium text-sm mb-1">Satisfaction Guaranteed</div>
                <p className="text-slate-400 text-xs">
                  Not happy? Contact us for a full refund, no questions asked.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 border border-indigo-500/20 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-2 text-center">Why Choose Our Reports?</h2>
        <p className="text-slate-400 mb-6 text-center max-w-2xl mx-auto">
          Unlike generic horoscope content, our reports are calculated from your exact birth chart data.
          Every insight is tailored to your unique planetary positions, aspects, and houses.
        </p>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-slate-800/30 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-indigo-400 font-semibold mb-1">Truly Personal</div>
            <p className="text-slate-500 text-sm">
              Not sun-sign only—we analyze all 10 planets and 12 houses
            </p>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-purple-400 font-semibold mb-1">Visual & Interactive</div>
            <p className="text-slate-500 text-sm">
              Charts, graphs, and visual elements to aid understanding
            </p>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-pink-500/20 flex items-center justify-center">
              <span className="text-2xl">💪</span>
            </div>
            <div className="text-pink-400 font-semibold mb-1">Actionable Advice</div>
            <p className="text-slate-500 text-sm">Practical guidance you can apply to your daily life</p>
          </div>
          <div className="bg-slate-800/30 rounded-xl p-5 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="text-emerald-400 font-semibold mb-1">Growth-Focused</div>
            <p className="text-slate-500 text-sm">
              Emphasis on self-improvement and personal development
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

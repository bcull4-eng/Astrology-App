'use client'

import Link from 'next/link'
import type { SEOContent } from '@/types/calculators'
import type { Calculator } from '@/types/calculators'

interface SEOContentProps {
  content: SEOContent
  calculator: Calculator
}

export function SEOContentDisplay({ content, calculator }: SEOContentProps) {
  return (
    <article className="prose prose-invert prose-slate max-w-none">
      {/* Intro Paragraph */}
      <p className="text-lg text-slate-300 leading-relaxed">
        {content.intro}
      </p>

      {/* Key Takeaways */}
      {content.keyTakeaways && content.keyTakeaways.length > 0 && (
        <div className="my-8 bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mt-0 mb-4 flex items-center gap-2">
            <span className="text-indigo-400">Key Takeaways</span>
          </h2>
          <ul className="space-y-3 mb-0">
            {content.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <span className="text-indigo-400 mt-1 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>{takeaway.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Sections */}
      {content.sections.map((section, i) => (
        <div key={i} className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            {section.title}
          </h2>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
          {section.subsections && section.subsections.map((sub, j) => (
            <div key={j} className="mt-6 pl-4 border-l-2 border-indigo-500/30">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">{sub.title}</h3>
              <p className="text-slate-400 leading-relaxed">{sub.content}</p>
            </div>
          ))}
        </div>
      ))}

      {/* How It Works */}
      {content.howItWorks && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-6">
            How the {calculator.title} Works
          </h2>
          <div className="space-y-4">
            {content.howItWorks.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="text-slate-400 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {content.howItWorks.benefits.length > 0 && (
            <div className="mt-8 bg-slate-800/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Benefits of Using This Calculator</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {content.howItWorks.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <span className="text-green-400">+</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Upsell: Reports */}
      <div className="mt-10 bg-gradient-to-r from-violet-900/30 to-indigo-900/30 border border-violet-500/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mt-0 mb-3">
          Go Deeper with Personalized Reports
        </h2>
        <p className="text-slate-300 mb-4">
          This calculator gives you a glimpse of your cosmic blueprint. For a comprehensive, personalized analysis written specifically for you, explore our premium reports.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/reports/personality-deep-dive"
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors no-underline"
          >
            Personality Deep Dive Report
          </Link>
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors no-underline"
          >
            View All Reports
          </Link>
        </div>
      </div>

      {/* FAQs */}
      {content.faqs && content.faqs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <details key={i} className="group bg-slate-800/50 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium list-none">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-slate-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Upsell: Course */}
      <div className="mt-10 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mt-0 mb-3">
          Learn Astrology from the Ground Up
        </h2>
        <p className="text-slate-300 mb-4">
          Want to understand not just what your placements mean, but why? Our comprehensive astrology course takes you from beginner to confident chart reader.
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors no-underline"
        >
          Start Learning Free
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Conclusion */}
      {content.conclusion && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Conclusion</h2>
          <p className="text-slate-300 leading-relaxed">{content.conclusion}</p>
        </div>
      )}

      {/* Related Calculators */}
      {calculator.relatedCalculators.length > 0 && (
        <div className="mt-10 pt-8 border-t border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">More Calculators For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {calculator.relatedCalculators.map((slug) => (
              <Link
                key={slug}
                href={`/charts/${slug}`}
                className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-lg text-sm text-slate-300 hover:text-white transition-all no-underline text-center"
              >
                {formatCalculatorName(slug)}
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/charts"
              className="text-indigo-400 hover:text-indigo-300 text-sm no-underline"
            >
              View all 20 calculators →
            </Link>
          </div>
        </div>
      )}
    </article>
  )
}

function formatCalculatorName(slug: string): string {
  return slug
    .replace('-calculator', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

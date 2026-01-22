import Link from 'next/link'
import Image from 'next/image'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { TestimonialsSection, StatsBar } from '@/components/social-proof'
import { AnimatedUserCount } from '@/components/social-proof/animated-user-count'
import { Star, Sparkles, Calendar, TrendingUp, MessageCircle, FileText, ChevronRight, Play, Shield, Zap } from 'lucide-react'

export default async function Home() {
  const user = await getUser()

  // If already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/orbli-logo.png" alt="Orbli" width={288} height={87} style={{ width: '140px', height: 'auto' }} />
          </div>
          <div className="flex items-center gap-6">
            <Link href="/charts" className="text-slate-400 hover:text-white transition-colors text-sm">
              Free Calculators
            </Link>
            <Link
              href="/auth/sign-in"
              className="text-slate-300 hover:text-white transition-colors text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            {/* Orbli Logo - Front and Center */}
            <div className="mb-10 flex justify-center">
              <Image
                src="/orbli-logo.png"
                alt="Orbli"
                width={288}
                height={87}
                style={{ width: '400px', height: 'auto' }}
                priority
              />
            </div>

            {/* Social proof badge with animated counter */}
            <div className="mb-8">
              <AnimatedUserCount target={237} />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Understand what&apos;s happening
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                in your life right now
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Not a horoscope. A personalised cosmic timing tool that reveals your current life themes,
              when they peak, and exactly what to do about them.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/sign-up"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all text-lg flex items-center justify-center gap-2 group"
              >
                Get started free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/charts"
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
              >
                Try free calculators
              </Link>
            </div>

            <p className="mt-4 text-slate-500 text-sm">
              No credit card required &bull; See your birth chart instantly
            </p>
          </div>

          {/* App Preview */}
          <div className="relative max-w-5xl mx-auto">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10" />

            {/* Dashboard mockup */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser chrome */}
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-700 rounded-md px-3 py-1.5 text-slate-400 text-sm text-center max-w-xs mx-auto">
                    app.astro.com/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard content mockup */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Primary insight card */}
                <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                        Active Now
                      </span>
                      <h3 className="text-xl font-semibold text-white mt-3">Career Transformation</h3>
                      <p className="text-slate-400 mt-1">Saturn conjunct Midheaven</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">78%</div>
                      <div className="text-slate-400 text-sm">Intensity</div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm">
                    A significant period of career restructuring and professional growth. You&apos;re being called to step into greater authority and responsibility...
                  </p>

                  {/* Timeline preview */}
                  <div className="mt-6 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-slate-500">Jan 2024</span>
                      <span className="text-indigo-400 font-medium">Peak: Mar 15</span>
                      <span className="text-slate-500">Jun 2024</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-slate-400 text-sm">Active Transits</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400">+12%</div>
                    <div className="text-slate-400 text-sm">Energy Trend</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">Apr 22</div>
                    <div className="text-slate-400 text-sm">Next Shift</div>
                  </div>
                </div>

                {/* Chart wheel preview */}
                <div className="flex gap-6">
                  <div className="flex-1 bg-slate-800/50 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-4">Your Birth Chart</h4>
                    {/* Simplified chart wheel SVG */}
                    <div className="aspect-square max-w-[200px] mx-auto relative">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {/* Outer circle */}
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#334155" strokeWidth="1" />
                        <circle cx="100" cy="100" r="70" fill="none" stroke="#334155" strokeWidth="1" />
                        <circle cx="100" cy="100" r="50" fill="none" stroke="#1e293b" strokeWidth="1" />

                        {/* Zodiac divisions */}
                        {[...Array(12)].map((_, i) => {
                          const angle = (i * 30 - 90) * (Math.PI / 180)
                          const x1 = 100 + 70 * Math.cos(angle)
                          const y1 = 100 + 70 * Math.sin(angle)
                          const x2 = 100 + 90 * Math.cos(angle)
                          const y2 = 100 + 90 * Math.sin(angle)
                          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="1" />
                        })}

                        {/* Sample planets */}
                        <circle cx="135" cy="60" r="6" fill="#f59e0b" /> {/* Sun */}
                        <circle cx="75" cy="140" r="5" fill="#94a3b8" /> {/* Moon */}
                        <circle cx="160" cy="110" r="4" fill="#ec4899" /> {/* Venus */}
                        <circle cx="50" cy="80" r="4" fill="#ef4444" /> {/* Mars */}

                        {/* Ascendant line */}
                        <line x1="10" y1="100" x2="50" y2="100" stroke="#6366f1" strokeWidth="2" />
                      </svg>

                      {/* Big 3 labels */}
                      <div className="absolute -right-4 top-1/4 text-xs">
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded">Sun in Leo</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 bg-slate-800/50 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-4">Daily Guidance</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Zap className="w-3 h-3 text-emerald-400" />
                        </div>
                        <p className="text-slate-300 text-sm">Schedule important meetings in the morning when your mental clarity peaks.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Shield className="w-3 h-3 text-amber-400" />
                        </div>
                        <p className="text-slate-300 text-sm">Avoid major financial decisions until after the 18th.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-4 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <StatsBar variant="full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm font-medium rounded-full">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              Everything you need to understand your cosmic timing
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              More than just your birth chart - get real-time insights about what&apos;s happening in your life right now.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-Time Transits</h3>
              <p className="text-slate-400">
                See exactly what cosmic events are affecting you right now, with intensity levels and timelines.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Timing Predictions</h3>
              <p className="text-slate-400">
                Know exactly when challenging periods will peak and ease, so you can plan accordingly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Daily Guidance</h3>
              <p className="text-slate-400">
                Actionable advice specific to your chart - what to do, what to avoid, and when.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Astrologist</h3>
              <p className="text-slate-400">
                Ask questions about your chart and get instant, personalised answers from our AI assistant.
              </p>
              <span className="inline-block mt-3 px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs font-medium rounded">
                Pro Feature
              </span>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">In-Depth Reports</h3>
              <p className="text-slate-400">
                Comprehensive 30-50 page reports on personality, relationships, year ahead, and more.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Free Calculators</h3>
              <p className="text-slate-400">
                20+ free calculators for your Sun, Moon, Rising, Venus sign and more - no account needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-slate-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm font-medium rounded-full">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              Get personalised insights in 60 seconds
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Enter your birth details</h3>
              <p className="text-slate-400">
                Date, time, and place of birth. That&apos;s all we need to calculate your unique chart.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">See what&apos;s active now</h3>
              <p className="text-slate-400">
                Instantly see your current life themes, timing, and intensity levels.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Get daily guidance</h3>
              <p className="text-slate-400">
                Receive personalised advice and forecasts to navigate each day with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <TestimonialsSection
            title="Trusted by our growing community"
            subtitle="See why people are choosing Orbli for their cosmic guidance"
            count={6}
            showStats={true}
            variant="grid"
          />
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-indigo-950">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm font-medium rounded-full">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
            Start free, upgrade when you&apos;re ready
          </h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
            See your birth chart and current life theme for free. Upgrade to Pro for daily insights, forecasts, and AI-powered guidance.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free plan */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-left">
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <div className="text-3xl font-bold text-white mb-6">
                £0 <span className="text-base font-normal text-slate-400">forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full birth chart
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Current life theme
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  20+ free calculators
                </li>
              </ul>
              <Link
                href="/auth/sign-up"
                className="block w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors text-center"
              >
                Get started free
              </Link>
            </div>

            {/* Pro plan */}
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/50 rounded-2xl p-8 text-left relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-medium rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-3xl font-bold text-white mb-6">
                £14.99 <span className="text-base font-normal text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Free
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Daily personalised insights
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Weekly & monthly forecasts
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  AI Astrologist assistant
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  2 free reports included
                </li>
              </ul>
              <Link
                href="/auth/sign-up"
                className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors text-center"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          <p className="mt-8 text-slate-500 text-sm">
            Cancel anytime &bull; 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to understand your cosmic timing?
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Join our growing community who use Orbli to navigate their lives with clarity.
          </p>
          <Link
            href="/auth/sign-up"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all text-lg group"
          >
            Get your free birth chart
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <Image src="/orbli-logo.png" alt="Orbli" width={288} height={87} style={{ width: '120px', height: 'auto' }} />
            </div>
            <div className="flex items-center gap-8 text-sm text-slate-400">
              <Link href="/charts" className="hover:text-white transition-colors">Calculators</Link>
              <Link href="/reports" className="hover:text-white transition-colors">Reports</Link>
              <Link href="/learn" className="hover:text-white transition-colors">Learn</Link>
              <Link href="/auth/sign-in" className="hover:text-white transition-colors">Sign In</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Orbli. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

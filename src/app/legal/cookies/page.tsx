import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Orbli',
  description: 'Orbli Cookie Policy - Information about how we use cookies and similar technologies.',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-8 inline-block">
          ← Back to Orbli
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Cookie Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: January 2025</p>

        <div className="prose prose-invert prose-slate max-w-none">
          <div className="space-y-8 text-slate-300">

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
              <p>Orbli uses cookies for the following purposes:</p>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">Essential Cookies (Required)</h3>
              <p>These cookies are necessary for the website to function and cannot be disabled:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Authentication:</strong> To keep you logged in and secure your session</li>
                <li><strong>Security:</strong> To protect against fraudulent activity</li>
                <li><strong>Preferences:</strong> To remember your cookie consent choice</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">Analytics Cookies (Optional)</h3>
              <p>These help us understand how visitors use our website:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Usage patterns:</strong> Which pages are most popular</li>
                <li><strong>Performance:</strong> How fast pages load</li>
                <li><strong>Errors:</strong> Technical issues users encounter</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">Functional Cookies (Optional)</h3>
              <p>These enhance your experience:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Preferences:</strong> Your display and feature preferences</li>
                <li><strong>Recent activity:</strong> Your recent calculations and readings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm mt-4">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 text-white">Cookie Name</th>
                      <th className="text-left py-2 text-white">Purpose</th>
                      <th className="text-left py-2 text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="py-2">sb-*-auth-token</td>
                      <td className="py-2">Authentication (Supabase)</td>
                      <td className="py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="py-2">cookie-consent</td>
                      <td className="py-2">Stores your cookie preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
              <p>We use services from the following third parties who may set their own cookies:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Stripe:</strong> For secure payment processing</li>
                <li><strong>Supabase:</strong> For authentication and database services</li>
                <li><strong>Vercel:</strong> For hosting and analytics</li>
              </ul>
              <p className="mt-3">
                These providers have their own privacy and cookie policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Managing Cookies</h2>
              <p>You can control cookies in several ways:</p>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">Cookie Banner</h3>
              <p>
                When you first visit Orbli, you&apos;ll see a cookie banner where you can accept or customize your preferences.
              </p>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">Browser Settings</h3>
              <p>
                Most browsers allow you to block or delete cookies through their settings. Note that blocking essential cookies may prevent the website from functioning properly.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p>
                Under the UK Privacy and Electronic Communications Regulations (PECR) and UK GDPR, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Be informed about cookies we use</li>
                <li>Choose whether to accept non-essential cookies</li>
                <li>Change your preferences at any time</li>
                <li>Access information about data collected via cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at:
              </p>
              <p className="mt-3">
                Email: support@orbli.app
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

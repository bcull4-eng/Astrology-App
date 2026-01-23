import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Orbli',
  description: 'Orbli Terms of Service - Terms and conditions for using our astrology services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-8 inline-block">
          ← Back to Orbli
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last updated: January 2025</p>

        <div className="prose prose-invert prose-slate max-w-none">
          <div className="space-y-8 text-slate-300">

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using Orbli (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
              </p>
              <p className="mt-3">
                Orbli is operated by Wooden Donkey Ltd, a company registered in England and Wales. These terms are governed by English law.
              </p>
              <p className="mt-3">
                <strong>Registered Office:</strong> 167-169 Great Portland Street, 5th Floor, London, W1W 5PF
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p>
                Orbli provides astrology-related services including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Birth chart calculations and interpretations</li>
                <li>Daily personalized astrological insights</li>
                <li>AI-powered astrological guidance</li>
                <li>Tarot readings</li>
                <li>Relationship compatibility analysis</li>
                <li>Educational astrology content</li>
                <li>Personalized astrology reports</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Entertainment Disclaimer</h2>
              <p className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <strong>Important:</strong> Orbli&apos;s astrological content is provided for entertainment and personal reflection purposes only. Our services do not constitute professional advice of any kind, including but not limited to medical, financial, legal, or psychological advice. You should not make important life decisions based solely on astrological information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Account Registration</h2>
              <p>To access certain features, you must create an account. You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activity under your account</li>
              </ul>
              <p className="mt-3">
                You must be at least 16 years old to create an account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Subscriptions and Payments</h2>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">5.1 Subscription Plans</h3>
              <p>
                We offer monthly, annual, and lifetime subscription plans. Prices are displayed in GBP and are inclusive of VAT where applicable.
              </p>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">5.2 Billing</h3>
              <p>
                Subscriptions are billed in advance. Monthly and annual subscriptions will automatically renew unless cancelled before the renewal date. Payments are processed securely by Stripe.
              </p>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">5.3 Cancellation</h3>
              <p>
                You may cancel your subscription at any time through your account settings. Upon cancellation:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>You will retain access until the end of your current billing period</li>
                <li>No refunds will be provided for partial billing periods</li>
                <li>Lifetime subscriptions are non-refundable after 14 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Cancellation Rights (UK Consumer Rights)</h2>
              <p>
                Under the Consumer Contracts Regulations 2013, you have the right to cancel within 14 days of purchase without giving any reason.
              </p>
              <p className="mt-3">
                <strong>However</strong>, by subscribing and immediately accessing our digital content and services, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>You are requesting immediate access to the digital content</li>
                <li>You acknowledge that you will lose your right to cancel once you begin accessing the premium features</li>
                <li>This is in accordance with Regulation 37 of the Consumer Contracts Regulations 2013</li>
              </ul>
              <p className="mt-3">
                If you have not accessed any premium features within 14 days of purchase, you may request a full refund by contacting support@orbli.app
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. One-Time Purchases</h2>
              <p>
                Individual reports and course purchases are one-time payments. Due to the digital nature of these products, they are non-refundable once the content has been generated or accessed. If you experience technical issues preventing access, please contact support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Share your account with others</li>
                <li>Reproduce, distribute, or resell our content without permission</li>
                <li>Use automated systems to access the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Intellectual Property</h2>
              <p>
                All content, features, and functionality of Orbli are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our written consent.
              </p>
              <p className="mt-3">
                You retain ownership of any personal data you provide (such as birth details), but grant us a licence to use this data to provide the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. AI-Generated Content</h2>
              <p>
                Some features use artificial intelligence to generate personalized content. While we strive for accuracy and quality, AI-generated content may occasionally contain errors or inconsistencies. This content is provided &quot;as is&quot; and should be considered alongside your own judgement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>We provide the Service on an &quot;as is&quot; and &quot;as available&quot; basis</li>
                <li>We do not guarantee uninterrupted or error-free access</li>
                <li>We are not liable for any indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim</li>
              </ul>
              <p className="mt-3">
                Nothing in these terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Orbli and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">13. Modifications to Service</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time. We will provide reasonable notice of any material changes that affect your subscription.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">14. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you of material changes by email or through the Service. Continued use after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">15. Governing Law and Disputes</h2>
              <p>
                These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
              <p className="mt-3">
                If you are a consumer, you may also be entitled to use the EU Online Dispute Resolution platform at ec.europa.eu/odr
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">16. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">17. Contact Us</h2>
              <p>
                For questions about these Terms, please contact us at:
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

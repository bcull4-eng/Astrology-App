import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Orbli',
  description: 'Orbli Privacy Policy - How we collect, use, and protect your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-8 inline-block">
          ← Back to Orbli
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: January 2025</p>

        <div className="prose prose-invert prose-slate max-w-none">
          <div className="space-y-8 text-slate-300">

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                Orbli (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services at orbli.app.
              </p>
              <p className="mt-3">
                We are based in the United Kingdom and comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">Personal Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Email address and password when you create an account</li>
                <li><strong>Birth Data:</strong> Date, time, and location of birth for astrological calculations</li>
                <li><strong>Payment Information:</strong> Processed securely by Stripe; we do not store card details</li>
                <li><strong>Communications:</strong> Messages you send to our support team</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">Information Collected Automatically</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Usage Data:</strong> Pages visited, features used, and interactions with our service</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
                <li><strong>Cookies:</strong> See our Cookie Policy for details</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>To provide and maintain our astrological services</li>
                <li>To calculate your birth chart and personalized insights</li>
                <li>To process payments and manage your subscription</li>
                <li>To send service-related communications</li>
                <li>To respond to your enquiries and support requests</li>
                <li>To improve and develop our services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Legal Basis for Processing</h2>
              <p>Under UK GDPR, we process your data based on:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Contract:</strong> To provide the services you&apos;ve requested</li>
                <li><strong>Consent:</strong> Where you&apos;ve given explicit consent (e.g., marketing emails)</li>
                <li><strong>Legitimate Interests:</strong> To improve our services and prevent fraud</li>
                <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Data Sharing</h2>
              <p>We share your information only with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Supabase:</strong> Our database and authentication provider (EU-based)</li>
                <li><strong>Stripe:</strong> For payment processing (PCI-DSS compliant)</li>
                <li><strong>Vercel:</strong> Our hosting provider</li>
                <li><strong>xAI:</strong> For AI-powered features (data anonymized where possible)</li>
              </ul>
              <p className="mt-3">
                We do not sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Data Retention</h2>
              <p>
                We retain your personal data for as long as your account is active or as needed to provide services. If you delete your account, we will delete or anonymize your data within 30 days, unless we&apos;re required to retain it for legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Your Rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your data</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Object:</strong> Object to certain processing activities</li>
                <li><strong>Withdraw Consent:</strong> Where processing is based on consent</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us at support@orbli.app
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your data, including encryption in transit (TLS/SSL) and at rest, secure authentication, and regular security assessments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. International Transfers</h2>
              <p>
                Some of our service providers may process data outside the UK. Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses or adequacy decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for individuals under 16 years of age. We do not knowingly collect personal data from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">12. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:
              </p>
              <p className="mt-3">
                Email: support@orbli.app
              </p>
              <p className="mt-3">
                You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at ico.org.uk
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

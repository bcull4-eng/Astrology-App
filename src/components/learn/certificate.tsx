'use client'

/**
 * Certificate Component
 *
 * Displays a shareable certificate when a user completes the course.
 */

import { useRef } from 'react'
import { CERTIFICATE_INFO } from '@/lib/comprehensive-course'

interface CertificateProps {
  userName: string
  completedAt: string
  credentialId: string
}

export function Certificate({ userName, completedAt, credentialId }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  const formattedDate = new Date(completedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const handleDownload = () => {
    // In production, this would generate a PDF
    // For now, we'll just alert
    alert('Certificate download would be implemented with a PDF generator like html2canvas + jsPDF')
  }

  const handleShare = () => {
    // Share to LinkedIn or copy link
    const shareText = `I just earned my ${CERTIFICATE_INFO.title} certificate! 🌟 #astrology #certification`
    if (navigator.share) {
      navigator.share({
        title: CERTIFICATE_INFO.title,
        text: shareText,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Share text copied to clipboard!')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Certificate Card */}
      <div
        ref={certificateRef}
        className="bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-orange-500/5 rounded-2xl border-2 border-amber-500/30 p-8 md:p-12 mb-6"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <p className="text-amber-400/70 text-sm uppercase tracking-wider mb-2">Certificate of Completion</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {CERTIFICATE_INFO.title}
          </h1>
          <p className="text-indigo-200/50">Astro Learning Academy</p>
        </div>

        {/* Recipient */}
        <div className="text-center mb-8">
          <p className="text-indigo-200/60 mb-2">This certificate is proudly presented to</p>
          <p className="text-4xl font-serif text-white">{userName}</p>
        </div>

        {/* Description */}
        <div className="text-center mb-8">
          <p className="text-indigo-200/70 max-w-lg mx-auto">
            {CERTIFICATE_INFO.description}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mb-8">
          <p className="text-center text-indigo-200/50 text-sm mb-4">Demonstrated Proficiency In</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CERTIFICATE_INFO.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-amber-500/10 text-amber-300 text-sm rounded-full border border-amber-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-amber-500/20">
          <div>
            <p className="text-indigo-200/50 text-xs">Date Issued</p>
            <p className="text-white font-medium">{formattedDate}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-1">✨</div>
            <p className="text-indigo-200/50 text-xs">Verified</p>
          </div>
          <div className="text-right">
            <p className="text-indigo-200/50 text-xs">Credential ID</p>
            <p className="text-white font-mono text-sm">{credentialId}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-950/50 hover:bg-indigo-950/70 text-white font-medium rounded-xl transition-colors border border-indigo-500/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  )
}

/**
 * Certificate Preview (locked state)
 * Shows what the certificate looks like before completion
 */
export function CertificatePreview() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-orange-500/5 rounded-2xl border-2 border-amber-500/20 p-6 blur-[2px] select-none">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 mx-auto mb-3" />
          <div className="h-4 w-32 bg-amber-500/20 rounded mx-auto mb-2" />
          <div className="h-6 w-48 bg-amber-500/20 rounded mx-auto mb-4" />
          <div className="h-8 w-40 bg-amber-500/20 rounded mx-auto mb-4" />
          <div className="h-3 w-64 bg-amber-500/20 rounded mx-auto" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 text-amber-400/50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-amber-400/70 text-sm">Complete all lessons to earn</p>
        </div>
      </div>
    </div>
  )
}

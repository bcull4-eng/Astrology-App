'use client'

/**
 * PalmReadingStep (Step 13)
 *
 * Palm reading with camera capture and scanning animation.
 */

import { useState } from 'react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { PalmCameraCapture } from '../shared/PalmCameraCapture'
import { PalmScanAnimation } from '../shared/PalmScanAnimation'

type PalmState = 'capture' | 'scanning' | 'complete'

export function PalmReadingStep() {
  const { setPalmReadingData, goToNextStep } = useOnboardingV2Store()
  const [state, setState] = useState<PalmState>('capture')
  const [palmImage, setPalmImage] = useState<string | null>(null)

  const handleCapture = (imageDataUrl: string) => {
    setPalmImage(imageDataUrl)
    setState('scanning')
  }

  const handleScanComplete = () => {
    // Generate mock palm reading results
    // In production, this could call an API for actual analysis
    setPalmReadingData({
      imageUrl: palmImage,
      lifeLineScore: 78 + Math.floor(Math.random() * 15),
      heartLineScore: 72 + Math.floor(Math.random() * 20),
      headLineScore: 80 + Math.floor(Math.random() * 15),
      fateLineScore: 65 + Math.floor(Math.random() * 25),
      predictions: {
        marriage: 'A significant romantic connection is indicated within 2 years',
        children: 'Strong family energy suggests 1-2 children',
        bigChange: 'A major life transformation is approaching around age 32',
        money: 'Financial prosperity increases steadily after 30',
      },
    })

    setState('complete')
    goToNextStep()
  }

  const handleSkip = () => {
    // Allow skipping palm reading
    setPalmReadingData({
      imageUrl: null,
      lifeLineScore: 75,
      heartLineScore: 75,
      headLineScore: 75,
      fateLineScore: 75,
      predictions: {
        marriage: 'Unable to analyze - palm scan skipped',
        children: 'Unable to analyze - palm scan skipped',
        bigChange: 'Unable to analyze - palm scan skipped',
        money: 'Unable to analyze - palm scan skipped',
      },
    })
    goToNextStep()
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        {state === 'capture' ? 'Scan Your Palm' : 'Analyzing Your Palm'}
      </h1>
      <p className="text-white/60 text-center mb-8">
        {state === 'capture'
          ? 'Your palm lines reveal hidden aspects of your destiny'
          : 'Please wait while we analyze your unique palm patterns'}
      </p>

      {/* Camera capture view */}
      {state === 'capture' && (
        <>
          <PalmCameraCapture onCapture={handleCapture} />
          <button
            onClick={handleSkip}
            className="mt-6 text-white/40 text-sm hover:text-white/60 transition-colors"
          >
            Skip this step
          </button>
        </>
      )}

      {/* Scanning animation */}
      {state === 'scanning' && palmImage && (
        <PalmScanAnimation
          palmImage={palmImage}
          onComplete={handleScanComplete}
        />
      )}
    </div>
  )
}

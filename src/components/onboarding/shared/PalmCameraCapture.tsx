'use client'

/**
 * PalmCameraCapture
 *
 * WebRTC camera component for capturing palm images.
 * Falls back to file upload if camera not available.
 */

import { useRef, useState, useCallback, useEffect } from 'react'
import { Camera, Upload, X } from 'lucide-react'
import { HandOutlineSVG } from './HandOutlineSVG'

interface PalmCameraCaptureProps {
  onCapture: (imageDataUrl: string) => void
  onCancel?: () => void
}

export function PalmCameraCapture({ onCapture, onCancel }: PalmCameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [hasCamera, setHasCamera] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Prefer back camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setIsReady(true)
      }
    } catch {
      setHasCamera(false)
      setError('Camera not available. Please upload an image instead.')
    }
  }, [])

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  // Start camera on mount
  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  // Capture image from camera
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    // Set canvas size to video dimensions
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0)

    // Get image data URL
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8)

    // Stop camera and send image
    stopCamera()
    onCapture(imageDataUrl)
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string
      onCapture(imageDataUrl)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Camera view */}
      {hasCamera && (
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
          />

          {/* Hand outline overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <HandOutlineSVG className="w-3/4 h-3/4 text-white/50" />
          </div>

          {/* Instructions */}
          <div className="absolute top-4 left-0 right-0 text-center">
            <p className="text-white/80 text-sm bg-black/40 inline-block px-4 py-2 rounded-full">
              Align your palm within the outline
            </p>
          </div>

          {/* Loading overlay */}
          {!isReady && !error && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2 mx-auto" />
                <p className="text-white/60 text-sm">Starting camera...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error / No camera fallback */}
      {(!hasCamera || error) && (
        <div className="aspect-[3/4] rounded-2xl bg-white/5 border border-white/20 flex flex-col items-center justify-center p-6">
          <Upload className="w-12 h-12 text-white/40 mb-4" />
          <p className="text-white/60 text-center mb-4">
            {error || 'Upload a photo of your palm'}
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 transition-colors"
          >
            Choose Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Controls */}
      {hasCamera && isReady && (
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Cancel button */}
          {onCancel && (
            <button
              onClick={onCancel}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          {/* Capture button */}
          <button
            onClick={handleCapture}
            className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-4 border-white animate-ring-pulse" />
            <Camera className="w-8 h-8 text-[#1a1a2e]" />
          </button>

          {/* Upload alternative */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
          >
            <Upload className="w-6 h-6" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}

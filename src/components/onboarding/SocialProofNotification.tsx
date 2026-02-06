'use client'

/**
 * SocialProofNotification
 *
 * Slide-in notification showing "[Name] just got their report!"
 * Shows randomly with country flags for social proof.
 */

import { useState, useEffect, useCallback } from 'react'

interface Notification {
  id: number
  name: string
  country: string
  flag: string
}

const NAMES = [
  'Emma', 'Olivia', 'Sophia', 'Ava', 'Isabella', 'Mia', 'Luna', 'Aria',
  'James', 'William', 'Oliver', 'Benjamin', 'Elijah', 'Lucas', 'Mason', 'Ethan',
  'Sakura', 'Yuki', 'Min-jun', 'Ji-eun', 'Wei', 'Chen', 'Priya', 'Arjun',
  'Maria', 'Sofia', 'Martina', 'Luisa', 'Anna', 'Hans', 'Pierre', 'Claude',
]

const COUNTRIES = [
  { name: 'USA', flag: '🇺🇸' },
  { name: 'UK', flag: '🇬🇧' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Korea', flag: '🇰🇷' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Sweden', flag: '🇸🇪' },
]

export function SocialProofNotification() {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const generateNotification = useCallback(() => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)]
    const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]

    return {
      id: Date.now(),
      name,
      country: country.name,
      flag: country.flag,
    }
  }, [])

  const showNotification = useCallback(() => {
    const newNotification = generateNotification()
    setNotification(newNotification)
    setIsVisible(true)

    // Hide after 3 seconds
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }, [generateNotification])

  // Show notifications at random intervals
  useEffect(() => {
    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showNotification()
    }, 2000)

    // Recurring notifications every 5-8 seconds
    const interval = setInterval(() => {
      const randomDelay = 5000 + Math.random() * 3000
      setTimeout(showNotification, randomDelay)
    }, 8000)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [showNotification])

  if (!notification) return null

  return (
    <div
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
        <span className="text-lg animate-bounce">{notification.flag}</span>
        <span className="text-white text-sm">
          <span className="font-medium">{notification.name}</span>
          <span className="text-white/60"> from {notification.country} just got their report!</span>
        </span>
      </div>
    </div>
  )
}

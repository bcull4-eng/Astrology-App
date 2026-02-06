'use client'

/**
 * BirthPlaceStep (Step 4)
 *
 * Birth place input with geocoding autocomplete
 */

import { useState, useEffect, useCallback } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import { useOnboardingV2Store } from '@/store/onboarding-v2'
import { geocodeLocation, getTimezoneFromCoords } from '@/lib/geocoding'
import { useDebounce } from '@/hooks/useDebounce'
import { TopBanner } from '../shared/TopBanner'

interface LocationSuggestion {
  display_name: string
  lat: string
  lon: string
}

export function BirthPlaceStep() {
  const { birthPlace, setBirthPlace, goToNextStep } = useOnboardingV2Store()

  const [query, setQuery] = useState(birthPlace.city || '')
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const debouncedQuery = useDebounce(query, 300)

  const searchLocations = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    setIsSearching(true)
    try {
      const encoded = encodeURIComponent(searchQuery)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encoded}&limit=5`,
        { headers: { 'User-Agent': 'Orbli/1.0' } }
      )
      const data = await response.json()
      setSuggestions(data)
    } catch {
      setSuggestions([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    if (debouncedQuery) {
      searchLocations(debouncedQuery)
    }
  }, [debouncedQuery, searchLocations])

  const handleSelectLocation = async (suggestion: LocationSuggestion) => {
    const lat = parseFloat(suggestion.lat)
    const lon = parseFloat(suggestion.lon)
    const timezone = getTimezoneFromCoords(lat, lon)

    // Parse city and country from display_name
    const parts = suggestion.display_name.split(', ')
    const city = parts[0]
    const country = parts[parts.length - 1]

    setBirthPlace({
      city,
      country,
      latitude: lat,
      longitude: lon,
      timezone,
    })

    setQuery(suggestion.display_name)
    setShowSuggestions(false)

    // Auto-advance after selection
    setTimeout(() => {
      goToNextStep()
    }, 300)
  }

  const isComplete = birthPlace.latitude !== null && birthPlace.longitude !== null

  const handleContinue = () => {
    if (isComplete) {
      goToNextStep()
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-8">
      <TopBanner variant="feature" className="mb-6" />

      <h1 className="text-2xl font-serif font-semibold text-white text-center mb-2">
        Where were you born?
      </h1>
      <p className="text-white/60 text-center mb-8">
        Your birth location affects house cusps and local time
      </p>

      <div className="w-full max-w-sm relative">
        {/* Search input */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Enter city or town"
            className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          {isSearching && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 animate-spin" />
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#2a2a4a] border border-white/20 rounded-xl overflow-hidden shadow-xl z-10">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSelectLocation(suggestion)}
                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
              >
                <span className="line-clamp-1">{suggestion.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected location display */}
      {isComplete && (
        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            Selected: <span className="text-white">{birthPlace.city}, {birthPlace.country}</span>
          </p>
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={!isComplete}
        className={`
          w-full max-w-sm py-4 rounded-xl font-semibold text-lg transition-all mt-8
          ${
            isComplete
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }
        `}
      >
        Continue
      </button>
    </div>
  )
}

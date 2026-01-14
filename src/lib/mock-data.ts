/**
 * Mock Data for Development
 *
 * Replace with real data from astrology API and synthesis engine.
 */

import { addDays, subDays } from 'date-fns'
import type {
  SynthesisedTheme,
  DailyGuidance,
  UpcomingWindow,
  FocusArea,
  IntensityLevel,
} from '@/types'

const today = new Date()

export const mockPrimaryTheme: SynthesisedTheme = {
  id: '1',
  theme_name: 'Relationship Recalibration',
  description:
    "You're in a period of re-evaluating your closest connections. Saturn is forming a challenging aspect to your natal Venus, bringing relationship dynamics into sharp focus. This isn't about endings—it's about understanding what you truly need from partnerships.",
  start_date: subDays(today, 12),
  peak_window: {
    start: addDays(today, 3),
    end: addDays(today, 8),
  },
  end_date: addDays(today, 23),
  intensity_today: 4 as IntensityLevel,
  primary_focus_area: 'relationships' as FocusArea,
  contributing_transits: ['transit-1', 'transit-2'],
  last_updated_at: today,
}

export const mockSecondaryThemes: SynthesisedTheme[] = [
  {
    id: '2',
    theme_name: 'Career Momentum',
    description:
      'Jupiter is supporting your professional endeavors, bringing opportunities for growth and recognition. Stay open to unexpected offers.',
    start_date: subDays(today, 5),
    peak_window: {
      start: addDays(today, 10),
      end: addDays(today, 15),
    },
    end_date: addDays(today, 45),
    intensity_today: 3 as IntensityLevel,
    primary_focus_area: 'career' as FocusArea,
    contributing_transits: ['transit-3'],
    last_updated_at: today,
  },
  {
    id: '3',
    theme_name: 'Financial Review',
    description:
      'Mercury retrograde in your money sector suggests reviewing budgets and past financial decisions. Not ideal for new investments.',
    start_date: subDays(today, 3),
    peak_window: {
      start: today,
      end: addDays(today, 5),
    },
    end_date: addDays(today, 18),
    intensity_today: 2 as IntensityLevel,
    primary_focus_area: 'money' as FocusArea,
    contributing_transits: ['transit-4'],
    last_updated_at: today,
  },
]

export const mockDailyGuidance: DailyGuidance = {
  date: today,
  tone: 'reflective',
  short_advice:
    'Today favors honest conversations about what you need. Avoid making permanent decisions about relationships.',
  do_list: [
    "Have that conversation you've been postponing",
    'Journal about your relationship patterns',
    'Set one clear boundary',
    'Reach out to a trusted friend',
  ],
  avoid_list: [
    'Making ultimatums',
    'Starting new romantic connections',
    'Ignoring your feelings to keep the peace',
  ],
  intensity_level: 4 as IntensityLevel,
}

export const mockUpcomingWindows: UpcomingWindow[] = [
  {
    start_date: addDays(today, 3),
    end_date: addDays(today, 8),
    summary: 'Peak intensity for relationship themes. Important conversations likely.',
    key_focus: 'relationships' as FocusArea,
    intensity_trend: 'peaking',
  },
  {
    start_date: addDays(today, 9),
    end_date: addDays(today, 16),
    summary: 'Energy shifts toward career matters. Good time for professional moves.',
    key_focus: 'career' as FocusArea,
    intensity_trend: 'rising',
  },
  {
    start_date: addDays(today, 17),
    end_date: addDays(today, 24),
    summary: 'Relationship intensity eases. Focus on self-care and integration.',
    key_focus: 'growth' as FocusArea,
    intensity_trend: 'easing',
  },
  {
    start_date: addDays(today, 25),
    end_date: addDays(today, 32),
    summary: 'Financial opportunities emerge. Review investments and income streams.',
    key_focus: 'money' as FocusArea,
    intensity_trend: 'rising',
  },
]

// Generate intensity curve data points for visualization
export function generateIntensityCurve(
  startDate: Date,
  peakStart: Date,
  peakEnd: Date,
  endDate: Date
): { date: Date; intensity: number }[] {
  const points: { date: Date; intensity: number }[] = []
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  for (let i = 0; i <= totalDays; i++) {
    const currentDate = addDays(startDate, i)
    let intensity: number

    if (currentDate < peakStart) {
      // Rising phase
      const daysUntilPeak = Math.ceil((peakStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      intensity = 1 + (4 * i) / daysUntilPeak
    } else if (currentDate <= peakEnd) {
      // Peak phase
      intensity = 5
    } else {
      // Easing phase
      const daysFromPeakEnd = Math.ceil((currentDate.getTime() - peakEnd.getTime()) / (1000 * 60 * 60 * 24))
      const totalEasingDays = Math.ceil((endDate.getTime() - peakEnd.getTime()) / (1000 * 60 * 60 * 24))
      intensity = 5 - (4 * daysFromPeakEnd) / totalEasingDays
    }

    points.push({
      date: currentDate,
      intensity: Math.max(1, Math.min(5, intensity)),
    })
  }

  return points
}

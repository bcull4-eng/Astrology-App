/**
 * Central type exports
 */

// User & Onboarding
export type {
  User,
  SubscriptionStatus,
  BirthData,
  BirthTimeConfidence,
  BirthPlace,
  UserPreferences,
  FocusArea,
  Location,
  NotificationPreferences,
} from './user'

// Astrology Entities
export type {
  NatalChart,
  NatalPlacement,
  Planet,
  ZodiacSign,
  ZodiacPosition,
  HouseCusp,
  TransitSignal,
  NatalTarget,
  AspectType,
  SynastryData,
  SynastryAspect,
  AspectNature,
  DateRange,
  DateWindow,
} from './astrology'

// Scored & Synthesised Insights
export type {
  ScoredTransit,
  ThemeType,
  IntensityPoint,
  IntensityLevel,
  SynthesisedTheme,
  DailyGuidance,
  GuidanceTone,
  UpcomingWindow,
  IntensityTrend,
  ScoredSynastryAspect,
  SynastryCategory,
  SynthesisedSynastry,
  SynastryInsight,
} from './insights'

// Dashboard State
export type {
  DashboardState,
  FreeInsightState,
  SynastryDashboardState,
  UpdateDecision,
  DashboardElement,
} from './dashboard'

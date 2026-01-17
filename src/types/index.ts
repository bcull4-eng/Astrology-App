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
  RelationshipStatus,
  LifePhase,
  PrimaryConcern,
  PersonalizationData,
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

// Learning/Courses
export type {
  Course,
  Module,
  Lesson,
  LessonBlock,
  PersonalizedDataKey,
  QuizQuestion,
  LearningProgress,
  ChatMessage,
  ComparisonItem,
  InteractiveOption,
} from './learning'

// Reports
export type {
  ReportSlug,
  ReportDefinition,
  ReportSection,
  GeneratedReport,
  ReportPurchase,
} from './reports'

// AI Astrologist
export type {
  CharacterId,
  Character,
  AstrologistMessage,
  AstrologistConversation,
  AstrologistState,
} from './astrologist'

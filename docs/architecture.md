# Technical Architecture Breakdown

---

## 1. Core Domain Data Models

### User & Onboarding Data

```typescript
interface User {
  id: string
  email: string
  created_at: Date
  subscription_status: SubscriptionStatus
  subscription_expires_at: Date | null
}

type SubscriptionStatus = 'free' | 'pro' | 'expired'

interface BirthData {
  user_id: string
  birth_date: Date
  birth_time: string | null
  birth_time_confidence: BirthTimeConfidence
  birth_place: BirthPlace
}

type BirthTimeConfidence = 'exact' | 'approximate' | 'unknown'

interface BirthPlace {
  city: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

interface UserPreferences {
  user_id: string
  current_location: Location | null
  focus_areas: FocusArea[]
  notification_preferences: NotificationPreferences
}

type FocusArea = 'career' | 'relationships' | 'money' | 'growth'

interface Location {
  city: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

interface NotificationPreferences {
  email_enabled: boolean
  push_enabled: boolean
  daily_guidance_enabled: boolean
  theme_change_enabled: boolean
}
```

### Astrology Entities

```typescript
interface NatalChart {
  user_id: string
  calculated_at: Date
  placements: NatalPlacement[]
  houses: HouseCusp[]
  ascendant: ZodiacPosition
  midheaven: ZodiacPosition
}

interface NatalPlacement {
  planet: Planet
  sign: ZodiacSign
  degree: number
  house: number
  is_retrograde: boolean
}

type Planet =
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars'
  | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto'
  | 'north_node' | 'chiron'

type ZodiacSign =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

interface ZodiacPosition {
  sign: ZodiacSign
  degree: number
}

interface HouseCusp {
  house: number
  sign: ZodiacSign
  degree: number
}

interface TransitSignal {
  id: string
  transiting_planet: Planet
  natal_target: NatalTarget
  aspect: AspectType
  orb: number
  start_date: Date
  peak_date: Date
  end_date: Date
}

interface NatalTarget {
  type: 'planet' | 'angle' | 'house_cusp'
  planet?: Planet
  angle?: 'ascendant' | 'midheaven' | 'descendant' | 'ic'
  house?: number
}

type AspectType =
  | 'conjunction' | 'opposition' | 'trine'
  | 'square' | 'sextile' | 'quincunx'

interface SynastryData {
  user_a_id: string
  user_b_id: string
  calculated_at: Date
  aspects: SynastryAspect[]
}

interface SynastryAspect {
  id: string
  planet_a: Planet
  planet_b: Planet
  aspect: AspectType
  orb: number
  nature: AspectNature
}

type AspectNature = 'harmonious' | 'challenging' | 'neutral'
```

### Scored and Synthesised Insight Objects

```typescript
interface ScoredTransit {
  transit_signal_id: string
  score: number // 0-100
  primary_theme: ThemeType
  secondary_themes: ThemeType[]
  intensity_curve: IntensityPoint[]
}

type ThemeType =
  | 'relationship_recalibration' | 'career_transformation'
  | 'financial_restructuring' | 'identity_evolution'
  | 'communication_shift' | 'emotional_processing'
  | 'expansion_opportunity' | 'discipline_required'
  | 'unexpected_change' | 'spiritual_growth'
  | 'healing_journey' | 'power_dynamics'

interface IntensityPoint {
  date: Date
  intensity: number // 1-5
}

interface SynthesisedTheme {
  id: string
  theme_name: string
  description: string
  start_date: Date
  peak_window: DateWindow
  end_date: Date
  intensity_today: IntensityLevel
  primary_focus_area: FocusArea
  contributing_transits: string[] // transit_signal_ids
  last_updated_at: Date
}

interface DateWindow {
  start: Date
  end: Date
}

type IntensityLevel = 1 | 2 | 3 | 4 | 5

interface DailyGuidance {
  date: Date
  tone: GuidanceTone
  short_advice: string
  do_list: string[]
  avoid_list: string[]
  intensity_level: IntensityLevel
}

type GuidanceTone =
  | 'encouraging' | 'cautious' | 'reflective'
  | 'action_oriented' | 'restorative'

interface UpcomingWindow {
  start_date: Date
  end_date: Date
  summary: string
  key_focus: FocusArea
  intensity_trend: IntensityTrend
}

type IntensityTrend = 'rising' | 'peaking' | 'easing'

interface ScoredSynastryAspect {
  synastry_aspect_id: string
  score: number // 0-100
  category: SynastryCategory
  life_area_manifestation: string
}

type SynastryCategory =
  | 'supportive_connection' | 'friction_point' | 'growth_lesson'

interface SynthesisedSynastry {
  id: string
  user_a_id: string
  user_b_id: string
  overall_dynamic: string
  supportive_connections: SynastryInsight[] // max 3
  friction_points: SynastryInsight[] // max 2
  growth_lesson: SynastryInsight
  practical_guidance: string[]
  calculated_at: Date
}

interface SynastryInsight {
  title: string
  explanation: string
  real_life_manifestation: string
  contributing_aspects: string[] // synastry_aspect_ids
}
```

### Dashboard State Models

```typescript
interface DashboardState {
  user_id: string
  active_theme: SynthesisedTheme | null
  secondary_influences: SynthesisedTheme[] // max 3
  daily_guidance: DailyGuidance | null
  upcoming_windows: UpcomingWindow[] // 90 days rolling
  active_filter: FocusArea | 'all'
  last_fetched_at: Date
}

interface FreeInsightState {
  user_id: string
  primary_theme_name: string
  primary_theme_explanation: string
  theme_end_date: Date
  has_seen_paywall: boolean
}

interface SynastryDashboardState {
  user_id: string
  partner_birth_data: BirthData | null
  synthesised_synastry: SynthesisedSynastry | null
  is_loading: boolean
}
```

---

## 2. Pure Logic Services

### Transit Scoring Engine

**Purpose:** Score raw transit signals based on astrological significance factors.

**Input:**
- `TransitSignal`
- `NatalChart`
- `UserPreferences` (for focus area weighting)

**Output:**
- `ScoredTransit`

**Scoring Factors (all deterministic):**
- Transiting planet importance weight (outer planets > inner planets)
- Natal target importance weight (luminaries and angles highest)
- Aspect type weight (conjunction/opposition/square > trine/sextile > quincunx)
- Orb tightness (inverse relationship: tighter orb = higher score)
- House relevance to user's focus areas
- Theme overlap multiplier (transits reinforcing same theme)

**Score Threshold:**
- Signals below 40/100 are filtered out

**Methods:**
- `scoreTransit(transit: TransitSignal, natalChart: NatalChart, preferences: UserPreferences): ScoredTransit`
- `calculatePlanetWeight(planet: Planet): number`
- `calculateTargetWeight(target: NatalTarget, natalChart: NatalChart): number`
- `calculateAspectWeight(aspect: AspectType): number`
- `calculateOrbScore(orb: number, aspect: AspectType): number`
- `calculateHouseRelevance(house: number, focusAreas: FocusArea[]): number`
- `deriveThemes(transit: TransitSignal, natalChart: NatalChart): { primary: ThemeType, secondary: ThemeType[] }`
- `generateIntensityCurve(transit: TransitSignal): IntensityPoint[]`
- `filterBelowThreshold(transits: ScoredTransit[], threshold: number): ScoredTransit[]`

---

### Theme Synthesis Engine

**Purpose:** Combine multiple scored transits into coherent synthesised themes, selecting one primary theme.

**Input:**
- `ScoredTransit[]`
- `Date` (current date)
- `UserPreferences`

**Output:**
- `SynthesisedTheme` (primary, exactly one)
- `SynthesisedTheme[]` (secondary, max 3)

**Synthesis Rules (deterministic):**
- Group transits by overlapping theme types
- Weight grouped themes by combined transit scores
- Select highest weighted theme as primary
- Remaining themes ranked by score become secondary (max 3)
- Calculate composite date ranges from contributing transits
- Derive intensity_today from intensity curves of contributing transits

**Methods:**
- `synthesiseThemes(scoredTransits: ScoredTransit[], currentDate: Date, preferences: UserPreferences): { primary: SynthesisedTheme, secondary: SynthesisedTheme[] }`
- `groupTransitsByTheme(transits: ScoredTransit[]): Map<ThemeType, ScoredTransit[]>`
- `calculateGroupScore(transits: ScoredTransit[]): number`
- `selectPrimaryTheme(groupedThemes: Map<ThemeType, ScoredTransit[]>): ThemeType`
- `calculateCompositeDateRange(transits: ScoredTransit[]): { start: Date, peak: DateWindow, end: Date }`
- `calculateIntensityToday(transits: ScoredTransit[], currentDate: Date): IntensityLevel`
- `generateThemeDescription(themeType: ThemeType, contributingTransits: ScoredTransit[]): string`
- `mapThemeToFocusArea(themeType: ThemeType): FocusArea`

---

### Update Cadence Resolver

**Purpose:** Determine when dashboard elements should be refreshed based on defined cadence rules.

**Input:**
- `DashboardState`
- `Date` (current date/time)

**Output:**
- `UpdateDecision` (which elements need refresh)

**Cadence Rules (from PRD):**

| Element | Update Frequency |
|---------|------------------|
| Primary Theme | 7-14 days |
| Intensity Meter | 1-2 days |
| Daily Guidance | Daily |
| Secondary Influences | 5-10 days |
| Upcoming Forecast | Weekly |

**Methods:**
- `resolveUpdatesNeeded(state: DashboardState, currentDate: Date): UpdateDecision`
- `shouldUpdatePrimaryTheme(lastUpdated: Date, currentDate: Date): boolean`
- `shouldUpdateIntensity(lastUpdated: Date, currentDate: Date): boolean`
- `shouldUpdateDailyGuidance(guidanceDate: Date, currentDate: Date): boolean`
- `shouldUpdateSecondaryInfluences(lastUpdated: Date, currentDate: Date): boolean`
- `shouldUpdateUpcomingForecast(lastUpdated: Date, currentDate: Date): boolean`
- `calculateNextUpdateTime(element: DashboardElement, lastUpdated: Date): Date`

**Types:**
```typescript
interface UpdateDecision {
  primary_theme: boolean
  intensity_meter: boolean
  daily_guidance: boolean
  secondary_influences: boolean
  upcoming_forecast: boolean
}

type DashboardElement =
  | 'primary_theme' | 'intensity_meter' | 'daily_guidance'
  | 'secondary_influences' | 'upcoming_forecast'
```

---

### Synastry Scoring Service

**Purpose:** Score synastry aspects and synthesise into relationship insights.

**Input:**
- `SynastryData`
- `NatalChart` (user A)
- `NatalChart` (user B)

**Output:**
- `SynthesisedSynastry`

**Scoring Factors (deterministic):**
- Planet pair significance (Venus-Mars, Sun-Moon, etc. weighted higher)
- Aspect type (harmonious vs challenging)
- Orb tightness
- Aspect repetition (multiple aspects between same planets)

**Synthesis Rules:**
- Score all aspects
- Categorise into supportive/friction/growth
- Select top 3 supportive connections by score
- Select top 2 friction points by score
- Derive growth lesson from challenging aspects with highest transformation potential
- Generate practical guidance based on friction points

**Methods:**
- `scoreSynastryAspects(synastry: SynastryData, chartA: NatalChart, chartB: NatalChart): ScoredSynastryAspect[]`
- `calculatePlanetPairWeight(planetA: Planet, planetB: Planet): number`
- `categoriseAspect(aspect: SynastryAspect, score: number): SynastryCategory`
- `synthesiseSynastry(scoredAspects: ScoredSynastryAspect[], synastryData: SynastryData): SynthesisedSynastry`
- `selectTopSupportive(aspects: ScoredSynastryAspect[], limit: number): ScoredSynastryAspect[]`
- `selectTopFriction(aspects: ScoredSynastryAspect[], limit: number): ScoredSynastryAspect[]`
- `deriveGrowthLesson(challengingAspects: ScoredSynastryAspect[]): SynastryInsight`
- `generateOverallDynamic(scoredAspects: ScoredSynastryAspect[]): string`
- `generatePracticalGuidance(frictionPoints: ScoredSynastryAspect[]): string[]`
- `generateLifeAreaManifestation(aspect: ScoredSynastryAspect): string`

---

### Daily Guidance Generator

**Purpose:** Generate daily actionable guidance from current theme and intensity state.

**Input:**
- `SynthesisedTheme` (primary)
- `IntensityLevel` (today)
- `Date`

**Output:**
- `DailyGuidance`

**Generation Rules (deterministic):**
- Tone derived from theme type + intensity level
- Do/avoid lists derived from theme type (predefined mappings)
- Short advice composed from theme + intensity + phase (rising/peaking/easing)

**Methods:**
- `generateDailyGuidance(primaryTheme: SynthesisedTheme, currentDate: Date): DailyGuidance`
- `deriveTone(themeType: ThemeType, intensity: IntensityLevel): GuidanceTone`
- `generateDoList(themeType: ThemeType, intensity: IntensityLevel): string[]`
- `generateAvoidList(themeType: ThemeType, intensity: IntensityLevel): string[]`
- `generateShortAdvice(theme: SynthesisedTheme, currentDate: Date): string`
- `determinePhase(theme: SynthesisedTheme, currentDate: Date): IntensityTrend`

---

### Upcoming Window Calculator

**Purpose:** Generate 90-day rolling forecast windows.

**Input:**
- `ScoredTransit[]`
- `Date` (current date)

**Output:**
- `UpcomingWindow[]`

**Calculation Rules:**
- Group transits into weekly windows
- Summarise dominant themes per window
- Calculate intensity trend per window

**Methods:**
- `calculateUpcomingWindows(scoredTransits: ScoredTransit[], currentDate: Date, dayRange: number): UpcomingWindow[]`
- `groupTransitsIntoWeeks(transits: ScoredTransit[], startDate: Date, weeks: number): Map<DateWindow, ScoredTransit[]>`
- `calculateWindowIntensityTrend(transits: ScoredTransit[], window: DateWindow): IntensityTrend`
- `generateWindowSummary(transits: ScoredTransit[]): string`
- `determineKeyFocus(transits: ScoredTransit[]): FocusArea`

---

## 3. External Provider Interfaces

### Astrology Data Provider

```typescript
interface AstrologyProvider {
  /**
   * Calculate natal chart for given birth data
   */
  getNatalChart(birthData: BirthData): Promise<NatalChart>

  /**
   * Get transit signals for user within date range
   */
  getTransits(
    natalChart: NatalChart,
    dateRange: DateRange
  ): Promise<TransitSignal[]>

  /**
   * Calculate synastry aspects between two natal charts
   */
  getSynastry(
    chartA: NatalChart,
    chartB: NatalChart
  ): Promise<SynastryData>
}

interface DateRange {
  start: Date
  end: Date
}

interface AstrologyProviderError {
  code: AstrologyErrorCode
  message: string
  retryable: boolean
}

type AstrologyErrorCode =
  | 'INVALID_BIRTH_DATA'
  | 'CALCULATION_ERROR'
  | 'PROVIDER_UNAVAILABLE'
  | 'RATE_LIMITED'
```

---

### Notification Provider

```typescript
interface NotificationProvider {
  /**
   * Send email notification to user
   */
  sendEmail(
    userId: string,
    template: EmailTemplate,
    data: NotificationData
  ): Promise<NotificationResult>

  /**
   * Send push notification to user (Phase 2)
   */
  sendPush(
    userId: string,
    notification: PushNotification
  ): Promise<NotificationResult>

  /**
   * Schedule notification for future delivery
   */
  scheduleNotification(
    userId: string,
    notification: ScheduledNotification
  ): Promise<ScheduleResult>

  /**
   * Cancel scheduled notification
   */
  cancelScheduledNotification(
    scheduleId: string
  ): Promise<void>
}

type EmailTemplate =
  | 'daily_guidance'
  | 'theme_change'
  | 'weekly_forecast'
  | 'subscription_reminder'

interface NotificationData {
  subject?: string
  body: string
  metadata: Record<string, string>
}

interface PushNotification {
  title: string
  body: string
  data?: Record<string, string>
}

interface ScheduledNotification {
  type: 'email' | 'push'
  template?: EmailTemplate
  notification?: PushNotification
  scheduledFor: Date
}

interface NotificationResult {
  success: boolean
  messageId?: string
  error?: string
}

interface ScheduleResult {
  scheduleId: string
  scheduledFor: Date
}
```

---

### Payment Provider

```typescript
interface PaymentProvider {
  /**
   * Create checkout session for subscription
   */
  createCheckoutSession(
    userId: string,
    plan: SubscriptionPlan,
    successUrl: string,
    cancelUrl: string
  ): Promise<CheckoutSession>

  /**
   * Get subscription status for user
   */
  getSubscriptionStatus(
    userId: string
  ): Promise<SubscriptionInfo>

  /**
   * Cancel subscription
   */
  cancelSubscription(
    subscriptionId: string
  ): Promise<CancellationResult>

  /**
   * Handle webhook event from payment provider
   */
  handleWebhookEvent(
    payload: unknown,
    signature: string
  ): Promise<WebhookResult>

  /**
   * Create customer portal session for subscription management
   */
  createPortalSession(
    userId: string,
    returnUrl: string
  ): Promise<PortalSession>
}

interface SubscriptionPlan {
  id: string
  name: string
  priceInPence: number // £20/month = 2000
  interval: 'month' | 'year'
}

interface CheckoutSession {
  sessionId: string
  checkoutUrl: string
}

interface SubscriptionInfo {
  status: SubscriptionStatus
  currentPeriodEnd: Date | null
  cancelAtPeriodEnd: boolean
  plan: SubscriptionPlan | null
}

interface CancellationResult {
  success: boolean
  effectiveDate: Date
}

interface WebhookResult {
  eventType: WebhookEventType
  userId?: string
  handled: boolean
}

type WebhookEventType =
  | 'checkout.completed'
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.cancelled'
  | 'payment.failed'

interface PortalSession {
  sessionId: string
  portalUrl: string
}
```

---

## 4. UI Screen Boundaries

### Onboarding Flow Screens

**Screen: Birth Details**
- Collects: birth date, birth time, birth time confidence, birth place
- Requires: geocoding/location lookup for birth place
- Validation: date in past, valid location selected
- Navigation: proceeds to Focus Areas

**Screen: Focus Areas**
- Collects: focus area selections (multi-select from: career, relationships, money, growth)
- Optional: all selections optional
- Navigation: proceeds to Calculation

**Screen: Calculation**
- Displays: loading state with copy ("We're identifying the most important themes...")
- Triggers: natal chart calculation, transit calculation, theme synthesis
- Navigation: proceeds to Free Insight on completion

**Screen: Free Insight**
- Displays: primary theme name, explanation of why active, end date
- Read-only: no user input
- Navigation: proceeds to Paywall

---

### Paywall Screen

**Screen: Paywall**
- Displays: Pro subscription offer (£20/month), feature list
- Features listed: Full transit dashboard, daily guidance, intensity tracking, synastry, upcoming windows, notifications, early access
- Actions: subscribe (triggers payment flow), dismiss/skip
- Navigation:
  - Subscribe → Payment provider checkout → Dashboard (on success)
  - Skip → Limited dashboard or exit (based on business rules)

---

### Transit Dashboard Screens

**Screen: Dashboard Main**
- Sections:
  - Header: "Today: [Theme Name]", intensity indicator, "Active until: [date]"
  - Primary Insight Card: theme explanation, date range, peak window, do/avoid lists
  - Intensity Timeline: visual curve (rise/peak/ease)
  - Secondary Influences: collapsed list (max 3), expandable
  - Life Area Filters: All | Career | Relationships | Money | Growth
  - Update indicator: "Updated today" / "Active until..."
- Interactions: expand secondary influences, change filter
- Refresh: pull-to-refresh or automatic based on cadence

**Screen: Upcoming View**
- Displays: 90-day rolling forecast as list/timeline of UpcomingWindow entries
- Grouped: by week
- Each window shows: date range, summary, key focus, intensity trend
- Navigation: accessible from Dashboard Main

**Screen: Secondary Influence Detail**
- Displays: expanded view of single secondary theme
- Content: theme explanation, date range, contributing factors
- Navigation: modal or drill-down from Dashboard Main

---

### Synastry Screens

**Screen: Synastry Input**
- Collects: partner birth data (date, time, time confidence, place)
- Reuses: birth data input components from onboarding
- Navigation: proceeds to Synastry Calculation

**Screen: Synastry Calculation**
- Displays: loading state
- Triggers: partner natal chart calculation, synastry calculation, synthesis
- Navigation: proceeds to Synastry Results

**Screen: Synastry Results**
- Sections:
  - Overall Dynamic: plain-English summary paragraph
  - Supportive Connections: list of 3 insights (title, explanation, real-life manifestation)
  - Friction Points: list of 2 insights with context (title, explanation, manifestation)
  - Growth Lesson: single insight (what this relationship teaches)
  - Practical Guidance: bulleted list of navigational advice
- Interactions: expand/collapse sections
- Navigation: back to dashboard, start new synastry

---

### Settings Screens (Implied)

**Screen: Account Settings**
- Displays: user email, subscription status
- Actions: manage subscription (portal), update notification preferences
- Navigation: accessible from dashboard

**Screen: Notification Preferences**
- Collects: email enabled, push enabled, daily guidance enabled, theme change enabled
- Navigation: sub-screen of Account Settings

---

## 5. State Management Boundaries

### Global State (App-Wide, Persisted)

- **User authentication state**
  - User ID
  - Email
  - Auth token/session

- **Subscription state**
  - Subscription status (free/pro/expired)
  - Subscription expiry date
  - Has seen paywall flag

- **User birth data**
  - Birth date, time, time confidence
  - Birth place (with coordinates)

- **User preferences**
  - Focus areas
  - Current location
  - Notification preferences

- **Natal chart**
  - Full calculated natal chart
  - Calculation timestamp

---

### Cached State (Persisted, Refreshed on Cadence)

- **Primary synthesised theme**
  - Cache duration: 7-14 days (or until theme naturally ends)
  - Invalidation: cadence resolver determines refresh needed

- **Secondary synthesised themes**
  - Cache duration: 5-10 days
  - Max items: 3

- **Daily guidance**
  - Cache duration: 24 hours (daily)
  - Keyed by date

- **Upcoming windows**
  - Cache duration: 7 days (weekly)
  - Range: 90 days rolling

- **Raw transit signals**
  - Cache duration: aligned with calculation provider recommendations
  - Range: current date + 90 days

- **Scored transits**
  - Cache duration: same as raw transit signals
  - Derived from raw signals (recalculate if signals refresh)

- **Synastry results** (per partner)
  - Cache duration: indefinite (until partner data changes)
  - Keyed by partner birth data hash

- **Intensity meter value**
  - Cache duration: 1-2 days
  - Derived from primary theme intensity curve

---

### Recomputed State (Derived, Not Persisted)

- **Dashboard display state**
  - Active filter selection (transient UI state)
  - Expanded/collapsed secondary influences (transient UI state)
  - Filtered theme list based on focus area filter

- **Intensity timeline visualization data**
  - Computed from primary theme intensity curve
  - Recomputed on theme change or date change

- **Update needed flags**
  - Computed by cadence resolver on each dashboard load
  - Determines which cached data needs refresh

- **Current phase indicator**
  - Computed: compare current date to theme peak window
  - Values: rising / peaking / easing

- **Free insight display data**
  - Subset of primary theme for paywall preview
  - Computed once during onboarding flow

- **Synastry input validation state**
  - Form validity
  - Geocoding lookup results

---

### State Refresh Triggers

| Trigger | State Affected |
|---------|----------------|
| App launch | All cached state checked against cadence |
| Pull-to-refresh | All cached state |
| Date change (midnight) | Daily guidance, intensity meter |
| Focus area filter change | Dashboard display state (refilter) |
| Subscription status change | Subscription state |
| New synastry partner entered | Synastry cached state (new entry) |
| Partner birth data edited | Synastry cached state (invalidate entry) |

---

### State Dependencies (Computation Order)

```
Birth Data
    ↓
Natal Chart (from provider)
    ↓
Raw Transit Signals (from provider)
    ↓
Scored Transits (scoring engine)
    ↓
Synthesised Themes (synthesis engine)
    ↓
├── Primary Theme
├── Secondary Themes
├── Daily Guidance (guidance generator)
└── Upcoming Windows (window calculator)
    ↓
Dashboard Display State (UI layer)
```

```
Birth Data (User A) + Birth Data (User B)
    ↓
Natal Charts (both, from provider)
    ↓
Synastry Data (from provider)
    ↓
Scored Synastry Aspects (synastry scoring)
    ↓
Synthesised Synastry (synastry synthesis)
    ↓
Synastry Display State (UI layer)
```

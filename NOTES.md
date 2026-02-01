# Orbli App - Project Notes

## Overview

Orbli is a full-featured astrology platform at **orbli.app** built with Next.js 16 App Router. It offers natal charts, daily horoscopes, AI chat, tarot readings, compatibility reports, learning courses, and calculators — all behind a freemium subscription model.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.1 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4, Headless UI, Heroicons, Lucide |
| State | Zustand 5 |
| Database | Supabase (PostgreSQL + Auth) |
| Payments | Stripe (subscriptions + one-time) |
| AI Chat | xAI Grok 4-1-fast-reasoning (streaming) |
| Astrology Data | Astrology-API.io v3 (Swiss Ephemeris) |
| Email | Resend (from support@orbli.app to orblingai@gmail.com) |
| Validation | Zod 4 |

---

## Project Structure

```
src/
  app/                  # Next.js pages & API routes
    (onboarding)/       # Birth details, focus areas, paywall, calculating, free-insight
    api/                # 21 API endpoints
    auth/               # Sign in, sign up, callback
    charts/             # Calculator pages (dynamic [calculatorSlug])
    checkout/           # Success/cancel pages
    dashboard/          # Main dashboard + upcoming forecasts
    astrologist/        # AI chat interface
    tarot/              # Tarot reading interface
    learn/              # Courses, lessons, quizzes
    reports/            # Report catalog, viewer, bundles
    settings/           # User settings
    synastry/           # Compatibility input + results
    legal/              # Privacy, terms, cookies
  components/           # React components organized by feature
    dashboard/          # daily-insights, weekly-forecast, monthly-forecast
    feedback-widget.tsx # Floating support/feedback popup (logged-in users only)
  lib/                  # Core business logic & utilities
    astrology-api.ts    # Astrology-API.io client (natal, transits, synastry, composite, solar/lunar return, daily sky)
    synthesis.ts        # Theme + guidance generation from natal/transit data
    daily-horoscope.ts  # Daily horoscope generation
    calculators.ts      # Calculator logic (Saturn return, solar return, lunar return, moon phase, etc.)
    report-generator-v2.ts  # Report generation with composite chart support
    transit-cache.ts    # In-memory TTL cache (daily 24h, user 24h, lunar 30d, solar 1y)
    rate-limit.ts       # Sliding window rate limiter (strict/standard/checkout/admin tiers)
    stripe.ts           # Stripe client, checkout, portal, price IDs
    geocoding.ts        # Location name -> lat/lng
    supabase/           # Client, server, admin Supabase clients
    tarot/              # Cards DB (78), spreads, prompt builders
    astrologist/        # Character definitions (Sage, Mystic, Guide)
    courses.ts          # Learning content
  types/                # TypeScript type definitions
    astrology.ts        # NatalChart, Planet, ZodiacSign, TransitSignal, AspectType
    user.ts             # User, BirthData, SubscriptionStatus, FocusArea
    insights.ts         # ScoredTransit, SynthesisedTheme, DailyGuidance
    calculators.ts      # Calculator result types (Saturn, Solar, Lunar, etc.)
    reports.ts          # ReportSlug, GeneratedReport
    tarot.ts            # TarotCard, DrawnCard, SpreadConfig
    astrologist.ts      # CharacterId, Character
    ai-assistant.ts     # AIContext, AIMessage
    dashboard.ts        # DashboardState
    learning.ts         # Course, Module, Lesson
  hooks/                # Custom React hooks
  providers/            # Context providers
  store/                # Zustand stores
  services/             # Domain-specific services
```

---

## API Routes

| Endpoint | Method | Purpose | Rate Limit |
|---|---|---|---|
| `/api/natal-chart` | POST | Calculate natal chart | - |
| `/api/transits` | POST | Personal transit aspects (24h cached) | - |
| `/api/daily-sky` | GET | Global planetary positions + lunar metrics (24h shared) | - |
| `/api/synastry` | POST | Relationship compatibility | - |
| `/api/composite-chart` | POST | Composite chart between two people | - |
| `/api/solar-return` | POST | Solar return chart for a year | - |
| `/api/lunar-return` | POST | Lunar return chart | - |
| `/api/dashboard` | GET | Personalized themes + guidance | - |
| `/api/astrologist/chat` | POST | AI chat (streaming, xAI Grok) | 20/min |
| `/api/ai-assistant` | POST | Context-aware Q&A (streaming) | 20/min |
| `/api/tarot/interpret` | POST | Tarot interpretation (streaming) | 20/min |
| `/api/reports` | GET/POST | List or save reports | - |
| `/api/stripe/checkout` | POST | Create Stripe checkout session | 10/min |
| `/api/stripe/portal` | POST | Stripe customer portal | - |
| `/api/webhooks/stripe` | POST | Stripe webhook handler | - |
| `/api/user/birth-data` | GET/POST | User birth data CRUD | - |
| `/api/user/purchases` | GET | User purchases + credits | - |
| `/api/user/subscription` | GET | Subscription status (syncs Stripe) | - |
| `/api/admin/grant-pro` | POST | Grant pro by email (admin secret) | 30/min |
| `/api/admin/revoke-pro` | POST | Revoke pro by email (admin secret) | 30/min |
| `/api/support` | POST | Send feedback email via Resend | 5/min |

---

## Subscription Model

| Plan | Price | Perks |
|---|---|---|
| Free | £0 | 1 AI message, limited features |
| Weekly Intro | £2 (one-time first week) | Full pro, auto-transitions to weekly |
| Weekly | £4.99/week | Full pro |
| Annual | £99/year | Full pro + 2 free reports |
| Lifetime | £149 | Full pro + 6 free reports |

**Report pricing:** £29 single, £49 for 3-pack, £49 for 6-pack

**Subscription status values:** `'free'` | `'pro'` | `'expired'`

---

## Astrology API Integration

- **Provider:** Astrology-API.io v3 (Pro Plus plan, $21/month)
- **Auth:** Bearer token via `ASTROLOGY_IO_API_KEY`
- **Response formats (two different patterns):**
  - `/api/v3/data/*` endpoints: `{ success, data, metadata }` envelope — unwrap `data`
  - `/api/v3/charts/*` endpoints: raw `{ subject_data, chart_data }` — no envelope
- **Endpoints used:**
  - `POST /api/v3/charts/natal` — natal chart
  - `POST /api/v3/charts/synastry` — synastry aspects
  - `POST /api/v3/charts/composite` — composite chart
  - `POST /api/v3/charts/solar-return` — solar return chart
  - `POST /api/v3/charts/lunar-return` — lunar return chart
  - `POST /api/v3/data/transits` — current transits to natal
  - `POST /api/v3/data/lunar-metrics/enhanced` — moon phase, void-of-course, next full/new moon
  - `GET /api/v3/data/daily-sky` — current planetary positions

---

## Caching Strategy

All in-memory `Map<string, CacheEntry<T>>` with TTL:

| Cache | TTL | Scope |
|---|---|---|
| Daily sky | 24 hours | Shared (all users) |
| User transits | 24 hours | Per user |
| Lunar return | 30 days | Per user |
| Solar return | 1 year | Per user |

Expired entries cleaned hourly via `cleanExpiredEntries()` in `transit-cache.ts`.

---

## Security

- **Headers:** X-Frame-Options DENY, HSTS, nosniff, Permissions-Policy (in `next.config.ts`)
- **Rate limiting:** In-memory sliding window per IP (`src/lib/rate-limit.ts`)
- **Auth middleware:** Token refresh + route protection (`src/middleware.ts`)
- **Admin routes:** Protected by `ADMIN_SECRET_KEY` bearer token
- **Stripe webhooks:** Signature verification
- **Middleware matcher** excludes: `_next/static`, `_next/image`, `favicon.ico`, `api/` routes, static assets

---

## Key Patterns

- **Streaming AI responses:** xAI Grok SSE -> ReadableStream transform -> plain text to client
- **Chart mapping:** All chart endpoints (natal, solar return, lunar return, composite) reuse the same `chart_data` -> `NatalChart` mapping logic in `astrology-api.ts`
- **Composite chart fallback:** `report-generator-v2.ts` accepts optional `compositeChart` param; falls back to `getMidpointSign()` averaging when not provided
- **Null safety pattern:** All `dailySky.moonPhase.name` and `dailySky.voidOfCourse.isVoid` accesses use optional chaining + nullish coalescing fallbacks across 6 consumer files
- **Calculator pages:** Dynamic `[calculatorSlug]` route with switch/case handlers per calculator type, each POSTing to its own API route

---

## Database Tables

| Table | Purpose |
|---|---|
| `users` | Supabase auth (synced) |
| `user_birth_data` | Birth date, time, place, natal chart JSON |
| `subscriptions` | Stripe subscription records |
| `purchases` | One-time purchases (reports, courses) |
| `generated_reports` | Saved report content + word count |
| `tarot_readings` | Saved tarot cards + interpretations |

---

## Recent Changes Log

### Session 1 (Jan 2026)
1. **Enhanced Lunar Metrics** — Switched `/api/v3/data/lunar-metrics` to `/enhanced` endpoint. Extended `APILunarMetricsResponse` with void-of-course + next moon dates. Replaced hardcoded stubs in `getDailySkyData()`.
2. **Solar Return Calculator** — New API method, calculator logic, API route (`/api/solar-return`), page handler, and display block in CalculatorResult.
3. **Lunar Return Calculator** — New type `LunarReturnResult`, API method, calculator logic, calculator definition in data, API route (`/api/lunar-return`), page handler, display block, and cache in transit-cache.
4. **Composite Charts via API** — New `getCompositeChart()` method, API route (`/api/composite-chart`), updated report-generator-v2 to use real composite data with midpoint fallback.
5. **Feedback Widget** — Floating bottom-left popup for logged-in users. Type selection (issue/idea/other) -> compose -> submit to `/api/support`. Added to root layout.
6. **Runtime null safety fixes** — Comprehensive sweep of `dailySky.moonPhase.name` and `dailySky.voidOfCourse.isVoid` across 6 files with optional chaining + fallback defaults.
7. **Security headers** — Added to `next.config.ts`: X-Frame-Options, HSTS, nosniff, Referrer-Policy, Permissions-Policy.
8. **Rate limiting** — Created `src/lib/rate-limit.ts` with 4 tiers. Applied to 7 API routes (support, AI chat x2, tarot, checkout, admin x2).
9. **Fixed API response format handling** — The `request()` method in `astrology-api.ts` assumed all endpoints use `{success, data, metadata}` envelope. Chart endpoints (`/api/v3/charts/*`) return raw `{subject_data, chart_data}` without envelope. Fixed to detect format dynamically. Also corrected `APILunarMetricsResponse` type to match actual enhanced endpoint response (`phase_info.phase_name`, `phase_info.illumination_percent`, boolean `void_of_course`).

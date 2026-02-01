# Claude Code - Mistakes & Lessons

This file tracks mistakes made during development so they are not repeated.

---

## 1. Always guard against undefined when changing API data sources

**What happened:** Switched the lunar metrics endpoint from `/api/v3/data/lunar-metrics` to `/api/v3/data/lunar-metrics/enhanced`. The enhanced endpoint can return `moonPhase` or `voidOfCourse` as undefined/null in some cases. This caused two separate runtime TypeErrors (`Cannot read properties of undefined (reading 'toLowerCase')`) in `daily-horoscope.ts` and `daily-insights.tsx`.

**The fix required a sweep of 6 files:** `daily-horoscope.ts`, `daily-insights.tsx`, `weekly-forecast.tsx`, `monthly-forecast.tsx`, `synthesis.ts`, and `CalculatorResult.tsx`. Every `dailySky.moonPhase.name` needed `dailySky.moonPhase?.name ?? 'Waxing Crescent'` and every `dailySky.voidOfCourse.isVoid` needed `dailySky.voidOfCourse?.isVoid`.

**Rule:** When changing an API endpoint or data source, always:
1. Search ALL consumers of that data (grep for the field names)
2. Add optional chaining (`?.`) and fallback defaults (`??`) to every access point
3. Do this proactively in the same change, not after crashes are reported

---

## 2. Do a comprehensive sweep on the first error, not the second

**What happened:** The first crash was reported in `calculateEnergyFromTransits` (`daily-horoscope.ts`). I fixed only that file. Then the same crash appeared in `generateCosmicScore` (`daily-insights.tsx`). Only then did I do a full codebase sweep and fix all 6 files at once.

**Rule:** When fixing a pattern-based bug (like missing optional chaining on API response fields), immediately grep for ALL occurrences of that pattern across the entire codebase and fix them all in one pass. Don't wait for a second crash report.

---

## 3. Google Fonts can fail during build — don't panic

**What happened:** `npm run build` failed with "Failed to fetch `Fraunces` from Google Fonts" and "Failed to fetch `Geist` from Google Fonts". This is a network issue, not a code error.

**Rule:** If the build fails only on Google Fonts fetch errors, verify code correctness with `npx tsc --noEmit` instead. The fonts error is transient and network-dependent — it does not indicate a problem with the code changes.

---

## 4. Always verify actual API response shapes — never trust comments or assumed schemas

**What happened:** The `request()` method in `astrology-api.ts` assumed ALL endpoints return a `{success, data, metadata}` envelope. In reality:
- `/api/v3/data/*` endpoints (global-positions, lunar-metrics) **do** use the envelope
- `/api/v3/charts/*` endpoints (natal, synastry, composite, solar-return, lunar-return) return raw `{subject_data, chart_data}` with **no envelope**

This meant every chart calculation (synastry, calculators, natal charts) threw "Astrology API error: Unknown API error" because `envelope.success` was `undefined`.

Additionally, the `APILunarMetricsResponse` type was wrong. The enhanced endpoint returns `phase_info.phase_name` (not `moon_phase`), `phase_info.illumination_percent` (not `moon_illumination`), and `void_of_course` as a boolean (not an object with `is_void/starts_at/ends_at`).

**Rule:** Before writing integration code for ANY external API:
1. `curl` every endpoint and save the actual JSON response
2. Build types from the real response, not from documentation or assumptions
3. Different endpoint families (charts vs data) may use completely different response formats
4. Test with real data before assuming a shared response wrapper works for all endpoints

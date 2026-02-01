/**
 * Google Analytics 4 Event Tracking
 *
 * Utility functions for tracking custom events and conversions.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export const GA_MEASUREMENT_ID = "G-Z9M696VKJT"

/**
 * Track a custom event
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

/**
 * Track a page view (for SPAs)
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    })
  }
}

/**
 * Track sign up event
 */
export function trackSignUp(method: "email" | "google") {
  trackEvent("sign_up", "engagement", method)
}

/**
 * Track sign in event
 */
export function trackSignIn(method: "email" | "google") {
  trackEvent("login", "engagement", method)
}

/**
 * Track purchase/subscription event
 */
export function trackPurchase(
  transactionId: string,
  value: number,
  currency: string,
  itemName: string
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: [{ item_name: itemName }],
    })
  }
}

/**
 * Track subscription started
 */
export function trackSubscription(plan: "weekly_intro" | "weekly" | "annual" | "lifetime", value: number) {
  trackEvent("subscribe", "conversion", plan, value)
  trackPurchase(`sub_${Date.now()}`, value, "GBP", `${plan}_subscription`)
}

/**
 * Track feature usage
 */
export function trackFeatureUse(feature: string) {
  trackEvent("feature_use", "engagement", feature)
}

/**
 * Track report generation
 */
export function trackReportGenerated(reportType: string) {
  trackEvent("generate_report", "engagement", reportType)
}

/**
 * Track tarot reading
 */
export function trackTarotReading(readingType: string) {
  trackEvent("tarot_reading", "engagement", readingType)
}

/**
 * Track AI chat message
 */
export function trackAIChat() {
  trackEvent("ai_chat_message", "engagement", "astrologist")
}

/**
 * Track course progress
 */
export function trackLessonComplete(courseId: string, lessonId: string) {
  trackEvent("lesson_complete", "learning", `${courseId}/${lessonId}`)
}

/**
 * Track paywall view
 */
export function trackPaywallView(source: string) {
  trackEvent("view_paywall", "monetization", source)
}

/**
 * Track checkout started
 */
export function trackCheckoutStarted(plan: string, value: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", {
      value: value,
      currency: "GBP",
      items: [{ item_name: plan }],
    })
  }
}

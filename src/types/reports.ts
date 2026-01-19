/**
 * Report Types
 *
 * Defines types for purchasable astrology reports
 */

export type ReportSlug = 'personality-deep-dive' | 'relationship-compatibility' | 'year-ahead-forecast' | 'monthly-forecast'

export interface ReportDefinition {
  slug: ReportSlug
  title: string
  subtitle: string
  description: string
  price: number
  wordCount: string
  deliveryTime: string
  icon: string
  gradient: string
  features: string[]
  sampleSections: string[]
  requiresPartner?: boolean
}

export interface ReportSection {
  id: string
  title: string
  icon?: string
  content: string
  subsections?: {
    title: string
    content: string
  }[]
}

export interface GeneratedReport {
  id: string
  slug: ReportSlug
  title: string
  generatedAt: string
  userName: string
  partnerName?: string
  birthData: {
    date: string
    time?: string
    place: string
  }
  partnerBirthData?: {
    date: string
    time?: string
    place: string
  }
  sections: ReportSection[]
  wordCount: number
}

export interface ReportPurchase {
  id: string
  reportSlug: ReportSlug
  userId: string
  purchasedAt: string
  status: 'pending' | 'generating' | 'completed' | 'failed'
  generatedReport?: GeneratedReport
}

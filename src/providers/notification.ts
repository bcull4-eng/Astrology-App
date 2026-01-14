/**
 * Notification Provider Interface
 *
 * Abstract interface for user notifications.
 * Phase 1: Email only
 * Phase 2: Push notifications when wrapped as app
 */

export interface NotificationProvider {
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
  sendPush(userId: string, notification: PushNotification): Promise<NotificationResult>

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
  cancelScheduledNotification(scheduleId: string): Promise<void>
}

export type EmailTemplate =
  | 'daily_guidance'
  | 'theme_change'
  | 'weekly_forecast'
  | 'subscription_reminder'

export interface NotificationData {
  subject?: string
  body: string
  metadata: Record<string, string>
}

export interface PushNotification {
  title: string
  body: string
  data?: Record<string, string>
}

export interface ScheduledNotification {
  type: 'email' | 'push'
  template?: EmailTemplate
  notification?: PushNotification
  scheduledFor: Date
}

export interface NotificationResult {
  success: boolean
  messageId?: string
  error?: string
}

export interface ScheduleResult {
  scheduleId: string
  scheduledFor: Date
}

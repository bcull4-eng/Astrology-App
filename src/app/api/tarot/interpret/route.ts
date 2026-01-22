/**
 * Tarot Interpretation API Route
 *
 * Handles tarot reading requests with streaming responses from xAI Grok API.
 * Pro users get 1 reading per day.
 * POST /api/tarot/interpret
 */

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { buildInterpretationPrompt } from '@/lib/tarot/prompts'
import type { ReadingType, DrawnCard } from '@/types/tarot'
import type { NatalChart, SubscriptionStatus } from '@/types'

interface InterpretRequest {
  readingType: ReadingType
  cards: DrawnCard[]
  question?: string
  natalChart?: NatalChart | null
}

// Check if user has an active Pro subscription
async function checkSubscription(): Promise<{ isPro: boolean; userId: string | null }> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { isPro: false, userId: null }

    const metadata = user.user_metadata || {}
    const status = (metadata.subscription_status as SubscriptionStatus) || 'free'
    const expiresAtStr = metadata.subscription_expires_at as string | undefined
    const expiresAt = expiresAtStr ? new Date(expiresAtStr) : null

    if (status === 'pro') {
      // Check if not expired (lifetime users have no expiration)
      if (!expiresAt || expiresAt > new Date()) {
        return { isPro: true, userId: user.id }
      }
    }

    return { isPro: false, userId: user.id }
  } catch {
    return { isPro: false, userId: null }
  }
}

// Check if user has already used this specific reading type today
async function checkDailyLimitForType(userId: string, readingType: ReadingType): Promise<boolean> {
  try {
    const supabase = await createClient()

    // Get start of today in UTC
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const { count } = await supabase
      .from('tarot_readings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('reading_type', readingType)
      .gte('created_at', today.toISOString())

    return (count || 0) > 0
  } catch {
    return false
  }
}

// Save reading to database
async function saveReading(
  userId: string,
  readingType: ReadingType,
  cards: DrawnCard[],
  interpretation: string,
  question?: string
): Promise<void> {
  try {
    const supabase = await createClient()

    await supabase.from('tarot_readings').insert({
      user_id: userId,
      reading_type: readingType,
      question: question || null,
      cards: cards,
      interpretation: interpretation,
    })
  } catch (error) {
    console.error('Failed to save tarot reading:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: InterpretRequest = await request.json()

    // Validate required fields
    if (!body.readingType || !body.cards || body.cards.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Reading type and cards are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check subscription status
    const { isPro, userId } = await checkSubscription()

    if (!isPro) {
      return new Response(
        JSON.stringify({
          error: 'Pro subscription required',
          code: 'PRO_REQUIRED',
          message: 'Tarot readings are available for Pro subscribers only',
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check daily limit for this specific reading type
    const hasUsedThisType = await checkDailyLimitForType(userId, body.readingType)
    if (hasUsedThisType) {
      return new Response(
        JSON.stringify({
          error: 'Daily limit reached',
          code: 'DAILY_LIMIT_REACHED',
          message: `You have already completed your ${body.readingType.replace('_', ' ')} reading today. Try a different reading type or come back tomorrow!`,
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check for API key
    const apiKey = process.env.XAI_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'xAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Build the interpretation prompt
    const prompt = buildInterpretationPrompt({
      readingType: body.readingType,
      cards: body.cards,
      question: body.question,
      natalChart: body.natalChart,
    })

    // Call xAI API with streaming
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-4-1-fast-reasoning',
        messages: [
          { role: 'user', content: prompt },
        ],
        stream: true,
        max_tokens: 1500,
        temperature: 0.8,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('xAI API error:', errorText)
      return new Response(
        JSON.stringify({ error: 'Failed to get response from AI' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Transform the SSE stream to plain text stream
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    let fullInterpretation = ''

    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        let buffer = ''

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')

            // Keep the last potentially incomplete line in the buffer
            buffer = lines.pop() || ''

            for (const line of lines) {
              const trimmedLine = line.trim()
              if (trimmedLine.startsWith('data: ')) {
                const data = trimmedLine.slice(6)
                if (data === '[DONE]') continue
                if (!data) continue

                try {
                  const parsed = JSON.parse(data)
                  const content = parsed.choices?.[0]?.delta?.content
                  if (content) {
                    fullInterpretation += content
                    controller.enqueue(encoder.encode(content))
                  }
                } catch {
                  // Skip invalid JSON chunks
                }
              }
            }
          }

          // Process any remaining buffer
          if (buffer.trim().startsWith('data: ')) {
            const data = buffer.trim().slice(6)
            if (data && data !== '[DONE]') {
              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content
                if (content) {
                  fullInterpretation += content
                  controller.enqueue(encoder.encode(content))
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }

          // Save the reading to the database after streaming completes
          await saveReading(
            userId,
            body.readingType,
            body.cards,
            fullInterpretation,
            body.question
          )

          controller.close()
        } catch (error) {
          console.error('Stream processing error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Tarot interpret error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process tarot reading request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

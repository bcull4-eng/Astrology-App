/**
 * AI Astrologist Chat API Route
 *
 * Handles chat requests with streaming responses from xAI Grok API.
 * Pro users get unlimited access, free users get 1 message.
 * POST /api/astrologist/chat
 */

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { standardLimiter } from '@/lib/rate-limit'
import { getCharacter } from '@/lib/astrologist/characters'
import type { CharacterId, NatalChart, NatalPlacement, SubscriptionStatus } from '@/types'

interface ChatRequest {
  characterId: CharacterId
  message: string
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
  natalChart?: NatalChart | null
  freeMessagesUsed?: number
}

const FREE_MESSAGE_LIMIT = 1

// Check if user has an active Pro subscription
async function checkSubscription(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return false

    const metadata = user.user_metadata || {}
    const status = (metadata.subscription_status as SubscriptionStatus) || 'free'
    const expiresAtStr = metadata.subscription_expires_at as string | undefined
    const expiresAt = expiresAtStr ? new Date(expiresAtStr) : null

    if (status === 'pro') {
      // Check if not expired (lifetime users have no expiration)
      if (!expiresAt || expiresAt > new Date()) {
        return true
      }
    }

    return false
  } catch {
    return false
  }
}

function formatNatalChartContext(chart: NatalChart): string {
  const placements = chart.placements
    .map((p: NatalPlacement) => `${p.planet}: ${p.sign} (${p.house ? `${p.house} house` : 'house unknown'})`)
    .join('\n')

  let context = `\n\nThe user has provided their natal chart. Here are their placements:\n${placements}`

  if (chart.ascendant) {
    context += `\nAscendant/Rising: ${chart.ascendant}`
  }

  context += '\n\nUse this information to personalize your responses when relevant. Reference their specific placements to make the reading more meaningful.'

  return context
}

export async function POST(request: NextRequest) {
  const limited = standardLimiter(request)
  if (limited) return limited

  try {
    const body: ChatRequest = await request.json()

    // Validate required fields
    if (!body.characterId || !body.message) {
      return new Response(
        JSON.stringify({ error: 'Character ID and message are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check subscription status
    const isPro = await checkSubscription()

    // If not Pro, check if they've exceeded their free message limit
    if (!isPro) {
      const freeMessagesUsed = body.freeMessagesUsed || 0
      if (freeMessagesUsed >= FREE_MESSAGE_LIMIT) {
        return new Response(
          JSON.stringify({
            error: 'Free message limit reached',
            code: 'FREE_LIMIT_REACHED',
            message: 'Upgrade to Pro for unlimited AI Astrologist chats'
          }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
      }
    }

    // Get character
    const character = getCharacter(body.characterId)
    if (!character) {
      return new Response(
        JSON.stringify({ error: 'Invalid character ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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

    // Build system prompt with natal chart context
    let systemPrompt = character.systemPrompt
    if (body.natalChart) {
      systemPrompt += formatNatalChartContext(body.natalChart)
    }

    // Build messages array for OpenAI-compatible format
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...body.conversationHistory.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: body.message },
    ]

    // Call xAI API with streaming
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-4-1-fast-reasoning',
        messages,
        stream: true,
        max_tokens: 1024,
        temperature: 0.7,
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
                  controller.enqueue(encoder.encode(content))
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }

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
    console.error('Astrologist chat error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

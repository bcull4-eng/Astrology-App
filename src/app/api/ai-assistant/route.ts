/**
 * AI Assistant API Route
 *
 * Handles contextual questions about astrology content with streaming responses.
 * Requires Pro subscription.
 * POST /api/ai-assistant
 */

import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { AIContext, AIMessage } from '@/types/ai-assistant'
import type { SubscriptionStatus } from '@/types/user'

interface AssistantRequest {
  question: string
  context: AIContext
  conversationHistory: AIMessage[]
  selectedText?: string
}

async function checkSubscription(): Promise<boolean> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return false

  const metadata = user.user_metadata || {}
  const status = metadata.subscription_status as SubscriptionStatus || 'free'
  const expiresAt = metadata.subscription_expires_at
    ? new Date(metadata.subscription_expires_at)
    : null

  // Check if pro and not expired
  if (status === 'pro') {
    if (!expiresAt || expiresAt > new Date()) {
      return true
    }
  }

  return false
}

function buildSystemPrompt(context: AIContext, selectedText?: string): string {
  let prompt = `You are a helpful astrology assistant integrated into an astrology app. Your role is to explain astrological concepts, interpret chart placements, and help users understand their astrological information.

Guidelines:
- Be concise but thorough - aim for 2-4 sentences for simple questions, more for complex topics
- Use accessible language while maintaining astrological accuracy
- When explaining placements, include both the general meaning and practical life implications
- If the user asks about something you can see in their context, reference it specifically
- Be warm and encouraging but not overly effusive
- If you're unsure about something, say so rather than making things up

Current context:
- Page: ${context.pageName}${context.pageDescription ? `\n- Description: ${context.pageDescription}` : ''}`

  if (context.viewingContext) {
    prompt += `\n- Currently viewing: ${context.viewingContext.type}`
    if (context.viewingContext.details) {
      prompt += `\n- Details: ${context.viewingContext.details}`
    }
    if (context.viewingContext.data) {
      prompt += `\n- Data: ${JSON.stringify(context.viewingContext.data, null, 2)}`
    }
  }

  if (selectedText) {
    prompt += `\n\nThe user has highlighted the following text and is asking about it:\n"${selectedText}"`
  }

  return prompt
}

export async function POST(request: NextRequest) {
  try {
    // Check subscription status first
    const isPro = await checkSubscription()
    if (!isPro) {
      return new Response(
        JSON.stringify({ error: 'Pro subscription required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const body: AssistantRequest = await request.json()

    // Validate required fields
    if (!body.question) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
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

    // Build system prompt with context
    const systemPrompt = buildSystemPrompt(body.context, body.selectedText)

    // Build messages array
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...body.conversationHistory.slice(-10).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: body.question },
    ]

    // Call xAI API with streaming
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-3-fast-latest',
        messages,
        stream: true,
        max_tokens: 512,
        temperature: 0.6,
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
    console.error('AI Assistant error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

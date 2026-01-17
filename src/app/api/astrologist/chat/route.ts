/**
 * AI Astrologist Chat API Route
 *
 * Handles chat requests with streaming responses from xAI Grok API.
 * POST /api/astrologist/chat
 */

import { NextRequest } from 'next/server'
import { getCharacter } from '@/lib/astrologist/characters'
import type { CharacterId, NatalChart, NatalPlacement } from '@/types'

interface ChatRequest {
  characterId: CharacterId
  message: string
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
  natalChart?: NatalChart | null
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
  try {
    const body: ChatRequest = await request.json()

    // Validate required fields
    if (!body.characterId || !body.message) {
      return new Response(
        JSON.stringify({ error: 'Character ID and message are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
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

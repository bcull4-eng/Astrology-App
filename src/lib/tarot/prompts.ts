/**
 * Tarot Prompt Builder
 *
 * Constructs AI prompts for tarot card interpretations.
 */

import { getCard } from './cards'
import { getSpread } from './spreads'
import type { ReadingType, DrawnCard } from '@/types/tarot'
import type { NatalChart, NatalPlacement } from '@/types'

interface PromptParams {
  readingType: ReadingType
  cards: DrawnCard[]
  question?: string
  natalChart?: NatalChart | null
}

function formatCardForPrompt(drawnCard: DrawnCard): string {
  const card = getCard(drawnCard.cardId)
  if (!card) return ''

  const orientation = drawnCard.isReversed ? 'Reversed' : 'Upright'
  const meaning = drawnCard.isReversed ? card.reversedMeaning : card.uprightMeaning

  return `
**${card.name}** (${orientation}) - Position: ${drawnCard.position}
Keywords: ${card.keywords.join(', ')}
Meaning: ${meaning}
`.trim()
}

function formatNatalChartContext(chart: NatalChart): string {
  const placements = chart.placements
    .map((p: NatalPlacement) => `${p.planet}: ${p.sign}${p.house ? ` (${p.house} house)` : ''}`)
    .join('\n')

  let context = `\n\nThe querent has provided their natal chart:\n${placements}`

  if (chart.ascendant) {
    context += `\nAscendant/Rising: ${chart.ascendant}`
  }

  context += '\n\nIncorporate relevant placements to personalize the reading.'

  return context
}

export function buildInterpretationPrompt(params: PromptParams): string {
  const { readingType, cards, question, natalChart } = params
  const spread = getSpread(readingType)

  const cardsDescription = cards.map(formatCardForPrompt).join('\n\n')

  let prompt = `You are a skilled and intuitive tarot reader providing a personalized reading. Your interpretations are insightful, empowering, and practical.

## Reading Type: ${spread.name}
${spread.description}

## Cards Drawn:
${cardsDescription}
`

  if (question) {
    prompt += `\n## Question:
"${question}"
`
  }

  if (natalChart) {
    prompt += formatNatalChartContext(natalChart)
  }

  // Reading-type specific instructions
  switch (readingType) {
    case 'daily':
      prompt += `
## Instructions:
Provide guidance for the querent's day ahead. Focus on:
- The main energy or theme for the day
- Practical advice for navigating the day
- Areas to pay attention to or be mindful of
- An encouraging closing message

Keep the reading warm, practical, and actionable. Aim for 3-4 paragraphs.
`
      break

    case 'yes_no':
      prompt += `
## Instructions:
Interpret this card as an answer to a yes/no question. Consider:
- Whether the card energy leans toward yes or no (upright typically leans yes, reversed may lean no, but context matters)
- Nuances and conditions that might affect the answer
- Additional insight the card offers about the situation

Start with a clear indication of the answer (Yes, No, or "The cards suggest..."), then explain the reasoning. Keep it concise but insightful. 2-3 paragraphs.
`
      break

    case 'one_card':
      prompt += `
## Instructions:
Provide focused insight based on this single card. Cover:
- The core message and energy of the card
- How this applies to the querent's current situation or question
- Actionable guidance or reflection points
- Any warnings or encouragements the card offers

Make it personal and practical. 3-4 paragraphs.
`
      break

    case 'three_card':
      prompt += `
## Instructions:
Provide a comprehensive Past/Present/Future reading. For each position:
- **Past**: What energies or events have led to the current situation
- **Present**: The current state of affairs and immediate influences
- **Future**: Likely outcomes if current trajectory continues

Then synthesize all three cards to show the narrative arc and overall message. End with practical guidance. 4-5 paragraphs total.
`
      break
  }

  prompt += `
## Style Guidelines:
- Be warm and personable, but not overly mystical or vague
- Offer specific, actionable insights
- Acknowledge both challenges and opportunities the cards present
- If reversed cards appear, treat them as redirected energy or internal work, not purely negative
- Avoid doom and gloom - empower the querent
${natalChart ? '- Reference their natal placements where relevant to personalize the reading' : ''}
`

  return prompt
}

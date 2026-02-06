/**
 * Tarot Card Data
 *
 * Complete data for all 78 tarot cards (22 Major Arcana + 56 Minor Arcana).
 */

export type TarotSuit = 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'

export interface TarotCard {
  id: string
  name: string
  number: number | string
  suit: TarotSuit
  keywords: string[]
  uprightMeaning: string
  reversedMeaning: string
  description: string
  symbolism: string
  loveReading: string
  careerReading: string
  yesOrNo: 'yes' | 'no' | 'maybe'
  element?: string
  astrologicalSign?: string
  planet?: string
}

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'the-fool',
    name: 'The Fool',
    number: 0,
    suit: 'major',
    keywords: ['New beginnings', 'Innocence', 'Spontaneity', 'Free spirit'],
    uprightMeaning: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
    reversedMeaning: 'When reversed, The Fool can indicate recklessness, risk-taking, and being held back by fear. You may be on the verge of something but hesitating.',
    description: 'The Fool stands at the edge of a cliff, about to step into the unknown. He carries a small pack and a white rose, symbolizing purity and innocence.',
    symbolism: 'The cliff represents the leap of faith. The small dog at his heels represents loyalty and protection. The white sun shines behind him, symbolizing the divine.',
    loveReading: 'A new romance or fresh start in love. Be open to unexpected connections. If single, someone new may enter your life.',
    careerReading: 'New job opportunities, career changes, or starting your own business. Take a leap of faith on that new venture.',
    yesOrNo: 'yes',
    element: 'Air',
    planet: 'Uranus',
  },
  {
    id: 'the-magician',
    name: 'The Magician',
    number: 1,
    suit: 'major',
    keywords: ['Manifestation', 'Power', 'Action', 'Resourcefulness'],
    uprightMeaning: 'The Magician signifies that you have all the skills and resources needed to succeed. It\'s a card of manifestation, willpower, and taking action to create your reality.',
    reversedMeaning: 'Reversed, The Magician can suggest manipulation, untapped talents, or feeling like you\'re not using your full potential.',
    description: 'The Magician stands with one arm pointed to the sky and one to the earth, channeling divine energy. Before him are the four suits of the tarot.',
    symbolism: 'The infinity symbol above his head represents unlimited potential. The four elements on the table show mastery over all aspects of life.',
    loveReading: 'You have the power to attract love. Take initiative in romance. A powerful connection based on true chemistry.',
    careerReading: 'Use your skills to advance your career. You have everything needed to succeed. Time to take action on your goals.',
    yesOrNo: 'yes',
    element: 'Air',
    planet: 'Mercury',
  },
  {
    id: 'the-high-priestess',
    name: 'The High Priestess',
    number: 2,
    suit: 'major',
    keywords: ['Intuition', 'Mystery', 'Subconscious', 'Inner knowledge'],
    uprightMeaning: 'The High Priestess urges you to trust your intuition and look beyond the surface. She represents hidden knowledge, mystery, and the power of the subconscious mind.',
    reversedMeaning: 'Reversed, she suggests secrets, disconnection from intuition, or information being withheld. Trust issues may be present.',
    description: 'The High Priestess sits between two pillars, one black and one white, representing duality. She holds the Torah scroll, symbolizing hidden wisdom.',
    symbolism: 'The moon at her feet represents intuition and the unconscious. The veil behind her hides deeper mysteries yet to be revealed.',
    loveReading: 'Listen to your intuition about a relationship. Something may be hidden. Wait for more information before making decisions.',
    careerReading: 'Trust your gut feelings at work. Hidden information may come to light. Use intuition to guide career decisions.',
    yesOrNo: 'maybe',
    element: 'Water',
    planet: 'Moon',
  },
  {
    id: 'the-empress',
    name: 'The Empress',
    number: 3,
    suit: 'major',
    keywords: ['Femininity', 'Abundance', 'Nature', 'Nurturing'],
    uprightMeaning: 'The Empress represents abundance, fertility, and the beauty of nature. She encourages you to connect with your feminine side and nurture yourself and others.',
    reversedMeaning: 'Reversed, The Empress may indicate creative blocks, dependence on others, or neglecting self-care and personal needs.',
    description: 'The Empress sits on a throne in a lush garden, wearing a crown of stars. She embodies mother earth and the creative force of nature.',
    symbolism: 'The wheat at her feet represents abundance. Her scepter shows her power. The shield with Venus symbol emphasizes love and beauty.',
    loveReading: 'A nurturing, loving relationship. Possible pregnancy or fertility. Deep emotional and sensual connection.',
    careerReading: 'Creative projects flourish. Abundance in business. Nurture your work and watch it grow.',
    yesOrNo: 'yes',
    element: 'Earth',
    planet: 'Venus',
  },
  {
    id: 'the-emperor',
    name: 'The Emperor',
    number: 4,
    suit: 'major',
    keywords: ['Authority', 'Structure', 'Father figure', 'Control'],
    uprightMeaning: 'The Emperor represents authority, structure, and solid foundations. He encourages you to take control, establish order, and assert your power responsibly.',
    reversedMeaning: 'Reversed, The Emperor can indicate excessive control, rigidity, or lack of discipline. There may be power struggles or authority issues.',
    description: 'The Emperor sits on a stone throne carved with ram heads, symbolizing Aries. He holds an ankh scepter and orb, representing life and dominion.',
    symbolism: 'The armor under his robes shows readiness to fight. The barren mountains behind him represent stability and unwavering strength.',
    loveReading: 'A stable, committed relationship. Someone protective and loyal. Traditional values in romance.',
    careerReading: 'Leadership opportunities. Build solid structures at work. Authority figures support you.',
    yesOrNo: 'yes',
    element: 'Fire',
    astrologicalSign: 'Aries',
  },
  {
    id: 'the-hierophant',
    name: 'The Hierophant',
    number: 5,
    suit: 'major',
    keywords: ['Tradition', 'Conformity', 'Spiritual wisdom', 'Institutions'],
    uprightMeaning: 'The Hierophant represents tradition, conventional wisdom, and spiritual guidance. He encourages learning from established systems and following traditional paths.',
    reversedMeaning: 'Reversed, The Hierophant suggests challenging traditions, unconventional approaches, or feeling restricted by rules and expectations.',
    description: 'The Hierophant sits between two pillars, blessing two acolytes. He wears a triple crown and holds a scepter with a triple cross.',
    symbolism: 'The crossed keys at his feet represent the keys to heaven. His raised hand offers blessing and spiritual guidance.',
    loveReading: 'Traditional relationship values. Possible marriage or commitment. Shared beliefs strengthen the bond.',
    careerReading: 'Follow established procedures. Mentorship and traditional learning. Work within existing structures.',
    yesOrNo: 'maybe',
    element: 'Earth',
    astrologicalSign: 'Taurus',
  },
  {
    id: 'the-lovers',
    name: 'The Lovers',
    number: 6,
    suit: 'major',
    keywords: ['Love', 'Harmony', 'Relationships', 'Choices'],
    uprightMeaning: 'The Lovers represents love, harmony, and important choices about relationships. It speaks to the alignment of values and the power of authentic connection.',
    reversedMeaning: 'Reversed, The Lovers can indicate disharmony, imbalance in relationships, or difficulty making important decisions.',
    description: 'A man and woman stand beneath an angel who blesses their union. Behind them are the Tree of Knowledge and the Tree of Life.',
    symbolism: 'The angel Raphael represents healing. The snake represents temptation. The sun above symbolizes warmth and vitality.',
    loveReading: 'Deep, soulmate connection. Important relationship decision. Love based on mutual respect and attraction.',
    careerReading: 'Important career choice ahead. Partnerships at work. Align your career with your values.',
    yesOrNo: 'yes',
    element: 'Air',
    astrologicalSign: 'Gemini',
  },
  {
    id: 'the-chariot',
    name: 'The Chariot',
    number: 7,
    suit: 'major',
    keywords: ['Willpower', 'Victory', 'Determination', 'Control'],
    uprightMeaning: 'The Chariot represents victory through determination and willpower. It encourages you to stay focused, maintain control, and push through obstacles.',
    reversedMeaning: 'Reversed, The Chariot may indicate lack of direction, aggression, or feeling out of control. Obstacles may be blocking progress.',
    description: 'A warrior rides a chariot pulled by two sphinxes, one black and one white. He wears armor decorated with crescent moons.',
    symbolism: 'The opposing sphinxes represent duality that must be controlled. The starry canopy represents celestial influence.',
    loveReading: 'Take charge in love. Overcome relationship obstacles. Victory in pursuing someone.',
    careerReading: 'Career success through determination. Overcome work challenges. Promotion or advancement.',
    yesOrNo: 'yes',
    element: 'Water',
    astrologicalSign: 'Cancer',
  },
  {
    id: 'strength',
    name: 'Strength',
    number: 8,
    suit: 'major',
    keywords: ['Inner strength', 'Courage', 'Patience', 'Compassion'],
    uprightMeaning: 'Strength represents inner power, courage, and patience. It shows that true strength comes from compassion and gentle persuasion, not force.',
    reversedMeaning: 'Reversed, Strength can indicate self-doubt, weakness, or using force instead of patience. You may be lacking confidence.',
    description: 'A woman gently closes a lion\'s mouth, showing mastery over animal nature through love rather than force. She wears a white robe.',
    symbolism: 'The infinity symbol above her head represents infinite potential. The lion represents our raw passions and desires.',
    loveReading: 'Patience and compassion in love. Taming difficult relationship dynamics. Inner confidence attracts love.',
    careerReading: 'Use soft skills to succeed. Patience leads to career growth. Handle difficult colleagues with grace.',
    yesOrNo: 'yes',
    element: 'Fire',
    astrologicalSign: 'Leo',
  },
  {
    id: 'the-hermit',
    name: 'The Hermit',
    number: 9,
    suit: 'major',
    keywords: ['Introspection', 'Solitude', 'Inner guidance', 'Wisdom'],
    uprightMeaning: 'The Hermit represents introspection, solitude, and seeking inner truth. Take time alone to reflect and find answers within yourself.',
    reversedMeaning: 'Reversed, The Hermit may indicate isolation, loneliness, or refusing to listen to inner wisdom. You may be withdrawing too much.',
    description: 'An old man stands alone on a mountain peak, holding a lantern containing a six-pointed star. He leans on a staff.',
    symbolism: 'The lantern represents the light of wisdom. The mountain represents spiritual achievement. The staff represents authority.',
    loveReading: 'Time for self-reflection in love. A period of solitude may be needed. Look within for relationship answers.',
    careerReading: 'Take time to plan your next move. Seek mentorship. Solo projects are favored.',
    yesOrNo: 'maybe',
    element: 'Earth',
    astrologicalSign: 'Virgo',
  },
  {
    id: 'wheel-of-fortune',
    name: 'Wheel of Fortune',
    number: 10,
    suit: 'major',
    keywords: ['Change', 'Cycles', 'Fate', 'Luck'],
    uprightMeaning: 'The Wheel of Fortune represents the cycles of life, karma, and turning points. Good luck and positive change are coming your way.',
    reversedMeaning: 'Reversed, the Wheel suggests bad luck, resistance to change, or feeling stuck in negative cycles. Accept that change is inevitable.',
    description: 'A giant wheel turns with figures rising and falling. The four corners show the four fixed signs of the zodiac.',
    symbolism: 'The sphinx at the top represents wisdom. The snake represents descent into the material world. The wheel itself represents karma.',
    loveReading: 'A turning point in love. Fate brings someone special. Relationship cycles shifting.',
    careerReading: 'Lucky career break coming. Change is on the horizon. Embrace new opportunities.',
    yesOrNo: 'yes',
    element: 'Fire',
    planet: 'Jupiter',
  },
  {
    id: 'justice',
    name: 'Justice',
    number: 11,
    suit: 'major',
    keywords: ['Justice', 'Fairness', 'Truth', 'Law'],
    uprightMeaning: 'Justice represents fairness, truth, and the law of cause and effect. It encourages you to take responsibility and make balanced decisions.',
    reversedMeaning: 'Reversed, Justice may indicate unfairness, dishonesty, or avoiding accountability. Legal matters may not go in your favor.',
    description: 'A figure sits between two pillars, holding a sword in one hand and scales in the other. She wears a red robe.',
    symbolism: 'The scales represent balance and fairness. The sword represents truth cutting through deception. The pillars represent structure.',
    loveReading: 'Fair treatment in relationships. Karmic connections. Honesty is essential.',
    careerReading: 'Legal matters favor you. Fair outcomes at work. Contracts and agreements.',
    yesOrNo: 'maybe',
    element: 'Air',
    astrologicalSign: 'Libra',
  },
  {
    id: 'the-hanged-man',
    name: 'The Hanged Man',
    number: 12,
    suit: 'major',
    keywords: ['Surrender', 'New perspective', 'Sacrifice', 'Letting go'],
    uprightMeaning: 'The Hanged Man represents surrender, sacrifice, and seeing things from a new perspective. Sometimes we must let go to move forward.',
    reversedMeaning: 'Reversed, The Hanged Man suggests resistance, stalling, or meaningless sacrifice. You may be delaying the inevitable.',
    description: 'A man hangs upside down from a tree by one foot, appearing peaceful. His other leg is bent, forming a figure four.',
    symbolism: 'The halo around his head shows enlightenment through sacrifice. The tree represents the world tree connecting realms.',
    loveReading: 'Pause and reflect on love. See your relationship from a new angle. Sacrifice may be needed.',
    careerReading: 'Career on hold. Use this time for reflection. A new perspective changes everything.',
    yesOrNo: 'maybe',
    element: 'Water',
    planet: 'Neptune',
  },
  {
    id: 'death',
    name: 'Death',
    number: 13,
    suit: 'major',
    keywords: ['Transformation', 'Endings', 'Change', 'Transition'],
    uprightMeaning: 'Death represents transformation, endings, and major change. It rarely means physical death—instead, it signifies the end of one chapter and the beginning of another.',
    reversedMeaning: 'Reversed, Death suggests resistance to change, stagnation, or fear of the unknown. You may be holding onto something that needs to end.',
    description: 'A skeleton in black armor rides a white horse. Before him, figures of all ages kneel or lay. A sun rises between two towers.',
    symbolism: 'The white horse represents purity. The flag shows a five-petaled rose, symbolizing life after death. The rising sun indicates rebirth.',
    loveReading: 'A relationship transforms or ends. Let go of what no longer serves you. Make room for new love.',
    careerReading: 'Career transformation. One door closes, another opens. Embrace change.',
    yesOrNo: 'no',
    element: 'Water',
    astrologicalSign: 'Scorpio',
  },
  {
    id: 'temperance',
    name: 'Temperance',
    number: 14,
    suit: 'major',
    keywords: ['Balance', 'Moderation', 'Patience', 'Harmony'],
    uprightMeaning: 'Temperance represents balance, moderation, and patience. It encourages finding the middle path and bringing together opposing forces in harmony.',
    reversedMeaning: 'Reversed, Temperance suggests imbalance, excess, or lack of long-term vision. You may be going to extremes.',
    description: 'An angel pours water between two cups. One foot rests on land, one in water. A path leads to mountains crowned with a sun.',
    symbolism: 'The triangle on the angel\'s chest represents earth bound by divine law. The path shows the long journey to enlightenment.',
    loveReading: 'Balanced, harmonious love. Patience brings relationship rewards. Blend differences together.',
    careerReading: 'Find work-life balance. Moderate your approach. Long-term career planning.',
    yesOrNo: 'yes',
    element: 'Fire',
    astrologicalSign: 'Sagittarius',
  },
  {
    id: 'the-devil',
    name: 'The Devil',
    number: 15,
    suit: 'major',
    keywords: ['Bondage', 'Materialism', 'Shadow self', 'Addiction'],
    uprightMeaning: 'The Devil represents bondage, materialism, and confronting your shadow self. It shows where you may be trapped by unhealthy attachments or limiting beliefs.',
    reversedMeaning: 'Reversed, The Devil suggests breaking free from chains, overcoming addiction, or refusing to face your shadow.',
    description: 'A winged devil sits on a pedestal. Before him, a naked man and woman are chained loosely. They have small horns and tails.',
    symbolism: 'The loose chains show bondage is an illusion. The inverted pentagram represents the dominance of matter over spirit.',
    loveReading: 'Unhealthy attachments in love. Obsessive relationships. Confront relationship patterns.',
    careerReading: 'Feeling trapped at work. Materialism driving decisions. Time to break free.',
    yesOrNo: 'no',
    element: 'Earth',
    astrologicalSign: 'Capricorn',
  },
  {
    id: 'the-tower',
    name: 'The Tower',
    number: 16,
    suit: 'major',
    keywords: ['Upheaval', 'Sudden change', 'Revelation', 'Chaos'],
    uprightMeaning: 'The Tower represents sudden upheaval, revelation, and the destruction of false structures. Though disruptive, it clears the way for truth and rebuilding.',
    reversedMeaning: 'Reversed, The Tower may indicate avoiding disaster, fear of change, or prolonging inevitable transformation.',
    description: 'A tower is struck by lightning, flames bursting from the windows. Two figures fall from the tower against a dark sky.',
    symbolism: 'The crown being knocked off represents the fall of false pride. The 22 flames represent the 22 paths of the Kabbalistic Tree of Life.',
    loveReading: 'Sudden relationship changes. Revelations rock the boat. Rebuilding after upheaval.',
    careerReading: 'Unexpected job changes. Business disruption. Rebuild stronger.',
    yesOrNo: 'no',
    planet: 'Mars',
  },
  {
    id: 'the-star',
    name: 'The Star',
    number: 17,
    suit: 'major',
    keywords: ['Hope', 'Faith', 'Renewal', 'Inspiration'],
    uprightMeaning: 'The Star represents hope, faith, and renewal after difficulty. It brings inspiration, serenity, and a connection to the divine.',
    reversedMeaning: 'Reversed, The Star suggests despair, disconnection from faith, or feeling uninspired. Hope may feel distant.',
    description: 'A naked woman kneels by a pool, pouring water from two jugs. Above her shines a large star surrounded by seven smaller stars.',
    symbolism: 'The large star represents hope. The seven smaller stars represent the chakras. Water poured on land fertilizes the earth.',
    loveReading: 'Hope for love renewed. Healing after heartbreak. A beautiful new connection.',
    careerReading: 'Career inspiration returns. Follow your dreams. Creative success.',
    yesOrNo: 'yes',
    element: 'Air',
    astrologicalSign: 'Aquarius',
  },
  {
    id: 'the-moon',
    name: 'The Moon',
    number: 18,
    suit: 'major',
    keywords: ['Illusion', 'Fear', 'Anxiety', 'Subconscious'],
    uprightMeaning: 'The Moon represents illusion, fear, and the need to navigate through uncertainty. Trust your intuition to find your way through the darkness.',
    reversedMeaning: 'Reversed, The Moon suggests releasing fear, seeing through illusions, or repressed emotions coming to surface.',
    description: 'A full moon shines down on a path between two towers. A dog and wolf howl at the moon. A crayfish emerges from water.',
    symbolism: 'The two towers represent the passage between conscious and subconscious. The dog and wolf show tamed and wild aspects of mind.',
    loveReading: 'Hidden emotions in love. Things are not as they seem. Trust intuition over appearances.',
    careerReading: 'Unclear work situation. Don\'t trust surface appearances. Navigate carefully.',
    yesOrNo: 'no',
    element: 'Water',
    astrologicalSign: 'Pisces',
  },
  {
    id: 'the-sun',
    name: 'The Sun',
    number: 19,
    suit: 'major',
    keywords: ['Joy', 'Success', 'Vitality', 'Positivity'],
    uprightMeaning: 'The Sun represents joy, success, and vitality. It\'s one of the most positive cards, bringing warmth, clarity, and celebration.',
    reversedMeaning: 'Reversed, The Sun may indicate temporary sadness, delayed success, or dimmed enthusiasm. The light is still there, just temporarily clouded.',
    description: 'A child rides a white horse beneath a brilliant sun. Sunflowers bloom behind a wall. The child holds a red banner.',
    symbolism: 'The naked child represents innocence and freedom. The white horse represents purity. The sunflowers turn toward the light.',
    loveReading: 'Joyful, vibrant love. Happiness in relationships. Celebration and warmth.',
    careerReading: 'Career success and recognition. Everything going well. Bask in achievement.',
    yesOrNo: 'yes',
    planet: 'Sun',
  },
  {
    id: 'judgement',
    name: 'Judgement',
    number: 20,
    suit: 'major',
    keywords: ['Rebirth', 'Inner calling', 'Absolution', 'Self-evaluation'],
    uprightMeaning: 'Judgement represents rebirth, answering a higher calling, and self-evaluation. It\'s time to rise up and embrace your true purpose.',
    reversedMeaning: 'Reversed, Judgement suggests self-doubt, failure to learn from the past, or ignoring your calling.',
    description: 'An angel blows a trumpet from the clouds. Below, naked figures rise from coffins with arms outstretched.',
    symbolism: 'The trumpet calls the dead to rise. The flag with the red cross represents resurrection. The mountains show obstacles overcome.',
    loveReading: 'A relationship reaches a new level. Past loves may return. Judge your choices wisely.',
    careerReading: 'Career calling becomes clear. Time for self-evaluation. Rise to new heights.',
    yesOrNo: 'yes',
    element: 'Fire',
    planet: 'Pluto',
  },
  {
    id: 'the-world',
    name: 'The World',
    number: 21,
    suit: 'major',
    keywords: ['Completion', 'Achievement', 'Travel', 'Wholeness'],
    uprightMeaning: 'The World represents completion, achievement, and wholeness. You have reached a major milestone. Celebrate your accomplishments!',
    reversedMeaning: 'Reversed, The World suggests incomplete goals, shortcuts, or delayed completion. You\'re close but not quite there.',
    description: 'A naked figure dances within a laurel wreath, holding two wands. In the corners are the four fixed signs of the zodiac.',
    symbolism: 'The wreath represents success and victory. The four figures represent the four elements in balance. The wands show evolution.',
    loveReading: 'Relationship completion and fulfillment. Soul mate union. Love goals achieved.',
    careerReading: 'Career goals achieved. International opportunities. Complete success.',
    yesOrNo: 'yes',
    element: 'Earth',
    planet: 'Saturn',
  },
]

// Generate Minor Arcana
function generateMinorArcana(): TarotCard[] {
  const suits: { name: TarotSuit; element: string; theme: string }[] = [
    { name: 'wands', element: 'Fire', theme: 'passion, creativity, action' },
    { name: 'cups', element: 'Water', theme: 'emotions, relationships, intuition' },
    { name: 'swords', element: 'Air', theme: 'intellect, conflict, truth' },
    { name: 'pentacles', element: 'Earth', theme: 'material, career, finances' },
  ]

  const numberMeanings: Record<number, { keywords: string[]; theme: string }> = {
    1: { keywords: ['New beginnings', 'Potential', 'Opportunity'], theme: 'new start' },
    2: { keywords: ['Balance', 'Partnership', 'Decisions'], theme: 'duality' },
    3: { keywords: ['Growth', 'Creativity', 'Collaboration'], theme: 'expansion' },
    4: { keywords: ['Stability', 'Foundation', 'Structure'], theme: 'stability' },
    5: { keywords: ['Challenge', 'Change', 'Conflict'], theme: 'conflict' },
    6: { keywords: ['Harmony', 'Cooperation', 'Generosity'], theme: 'harmony' },
    7: { keywords: ['Reflection', 'Assessment', 'Patience'], theme: 'reflection' },
    8: { keywords: ['Movement', 'Progress', 'Action'], theme: 'movement' },
    9: { keywords: ['Culmination', 'Attainment', 'Wisdom'], theme: 'near completion' },
    10: { keywords: ['Completion', 'End of cycle', 'Legacy'], theme: 'completion' },
  }

  const courtCards: { rank: string; keywords: string[]; theme: string }[] = [
    { rank: 'Page', keywords: ['Messenger', 'Student', 'New ideas'], theme: 'youthful energy' },
    { rank: 'Knight', keywords: ['Action', 'Adventure', 'Pursuit'], theme: 'dynamic energy' },
    { rank: 'Queen', keywords: ['Nurturing', 'Mastery', 'Understanding'], theme: 'mature feminine' },
    { rank: 'King', keywords: ['Authority', 'Leadership', 'Mastery'], theme: 'mature masculine' },
  ]

  const cards: TarotCard[] = []

  for (const suit of suits) {
    // Number cards 1-10
    for (let num = 1; num <= 10; num++) {
      const numData = numberMeanings[num]
      const cardName = num === 1 ? `Ace of ${capitalize(suit.name)}` : `${num} of ${capitalize(suit.name)}`

      cards.push({
        id: `${num === 1 ? 'ace' : num}-of-${suit.name}`,
        name: cardName,
        number: num === 1 ? 'Ace' : num,
        suit: suit.name,
        keywords: [...numData.keywords],
        element: suit.element,
        uprightMeaning: `The ${cardName} brings ${numData.theme} energy to ${suit.theme}. This card indicates ${numData.keywords.join(', ').toLowerCase()} in matters related to ${suit.theme}.`,
        reversedMeaning: `Reversed, the ${cardName} suggests blocked or delayed ${numData.theme} in ${suit.theme}. There may be obstacles or resistance.`,
        description: `The ${cardName} represents ${numData.theme} within the realm of ${suit.theme}. As a ${suit.element} card, it connects to the energetic qualities of that element.`,
        symbolism: `The ${suit.name} represent ${suit.theme}. The number ${num} brings the energy of ${numData.theme}.`,
        loveReading: generateLoveReading(suit.name, numData.theme),
        careerReading: generateCareerReading(suit.name, numData.theme),
        yesOrNo: num <= 4 || num === 6 || num === 9 || num === 10 ? 'yes' : num === 5 || num === 7 ? 'maybe' : 'yes',
      })
    }

    // Court cards
    for (const court of courtCards) {
      const cardName = `${court.rank} of ${capitalize(suit.name)}`

      cards.push({
        id: `${court.rank.toLowerCase()}-of-${suit.name}`,
        name: cardName,
        number: court.rank,
        suit: suit.name,
        keywords: [...court.keywords],
        element: suit.element,
        uprightMeaning: `The ${cardName} represents ${court.theme} applied to ${suit.theme}. This card may indicate a person with these qualities or this energy manifesting in your life.`,
        reversedMeaning: `Reversed, the ${cardName} may indicate immature or blocked ${court.theme} in ${suit.theme}. The positive qualities may be distorted.`,
        description: `The ${cardName} embodies ${court.theme} within the realm of ${suit.theme}. This court card may represent a person or an aspect of yourself.`,
        symbolism: `Court cards represent people or personality aspects. The ${court.rank} shows ${court.theme} while ${suit.name} connect to ${suit.theme}.`,
        loveReading: generateLoveReading(suit.name, court.theme),
        careerReading: generateCareerReading(suit.name, court.theme),
        yesOrNo: court.rank === 'King' || court.rank === 'Queen' ? 'yes' : 'maybe',
      })
    }
  }

  return cards
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function generateLoveReading(suit: TarotSuit, theme: string): string {
  const readings: Record<TarotSuit, string> = {
    major: '',
    wands: `Passion and excitement in love. ${capitalize(theme)} brings dynamic energy to romance.`,
    cups: `Emotional depth and connection. ${capitalize(theme)} influences your heart matters.`,
    swords: `Mental clarity in relationships. ${capitalize(theme)} affects how you communicate in love.`,
    pentacles: `Stability and commitment. ${capitalize(theme)} brings grounding to your love life.`,
  }
  return readings[suit]
}

function generateCareerReading(suit: TarotSuit, theme: string): string {
  const readings: Record<TarotSuit, string> = {
    major: '',
    wands: `Creative and entrepreneurial energy. ${capitalize(theme)} drives your career ambitions.`,
    cups: `Emotional fulfillment at work. ${capitalize(theme)} shapes your work relationships.`,
    swords: `Strategic thinking required. ${capitalize(theme)} influences workplace decisions.`,
    pentacles: `Financial and material matters. ${capitalize(theme)} affects your career growth and income.`,
  }
  return readings[suit]
}

export const MINOR_ARCANA = generateMinorArcana()

export const ALL_TAROT_CARDS = [...MAJOR_ARCANA, ...MINOR_ARCANA]

export function getTarotCard(id: string): TarotCard | undefined {
  return ALL_TAROT_CARDS.find((card) => card.id === id)
}

export function getAllTarotCardIds(): string[] {
  return ALL_TAROT_CARDS.map((card) => card.id)
}

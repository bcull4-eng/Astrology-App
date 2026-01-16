/**
 * Report Generator
 *
 * Generates personalized astrology reports based on natal chart data.
 * Each report type has specific generation logic tailored to its content.
 */

import type { NatalChart, ReportSlug, GeneratedReport, ReportSection, NatalPlacement } from '@/types'

// Helper to get sign characteristics
const signCharacteristics: Record<string, { element: string; modality: string; ruler: string; traits: string[] }> = {
  Aries: { element: 'Fire', modality: 'Cardinal', ruler: 'Mars', traits: ['pioneering', 'courageous', 'impulsive', 'direct'] },
  Taurus: { element: 'Earth', modality: 'Fixed', ruler: 'Venus', traits: ['patient', 'reliable', 'sensual', 'determined'] },
  Gemini: { element: 'Air', modality: 'Mutable', ruler: 'Mercury', traits: ['curious', 'adaptable', 'communicative', 'versatile'] },
  Cancer: { element: 'Water', modality: 'Cardinal', ruler: 'Moon', traits: ['nurturing', 'protective', 'emotional', 'intuitive'] },
  Leo: { element: 'Fire', modality: 'Fixed', ruler: 'Sun', traits: ['confident', 'generous', 'dramatic', 'creative'] },
  Virgo: { element: 'Earth', modality: 'Mutable', ruler: 'Mercury', traits: ['analytical', 'practical', 'helpful', 'detail-oriented'] },
  Libra: { element: 'Air', modality: 'Cardinal', ruler: 'Venus', traits: ['diplomatic', 'harmonious', 'fair-minded', 'social'] },
  Scorpio: { element: 'Water', modality: 'Fixed', ruler: 'Pluto', traits: ['intense', 'transformative', 'passionate', 'perceptive'] },
  Sagittarius: { element: 'Fire', modality: 'Mutable', ruler: 'Jupiter', traits: ['adventurous', 'optimistic', 'philosophical', 'freedom-loving'] },
  Capricorn: { element: 'Earth', modality: 'Cardinal', ruler: 'Saturn', traits: ['ambitious', 'disciplined', 'responsible', 'practical'] },
  Aquarius: { element: 'Air', modality: 'Fixed', ruler: 'Uranus', traits: ['innovative', 'humanitarian', 'independent', 'original'] },
  Pisces: { element: 'Water', modality: 'Mutable', ruler: 'Neptune', traits: ['compassionate', 'artistic', 'intuitive', 'dreamy'] },
}

const houseThemes: Record<number, { theme: string; lifeArea: string }> = {
  1: { theme: 'Self & Identity', lifeArea: 'personal appearance, self-expression, first impressions' },
  2: { theme: 'Values & Resources', lifeArea: 'money, possessions, self-worth, personal values' },
  3: { theme: 'Communication & Mind', lifeArea: 'learning, siblings, short trips, daily communication' },
  4: { theme: 'Home & Roots', lifeArea: 'family, ancestry, emotional foundations, private life' },
  5: { theme: 'Creativity & Joy', lifeArea: 'romance, children, creative expression, pleasure' },
  6: { theme: 'Health & Service', lifeArea: 'daily routines, work, health habits, service to others' },
  7: { theme: 'Partnerships', lifeArea: 'marriage, business partners, open enemies, contracts' },
  8: { theme: 'Transformation', lifeArea: 'shared resources, intimacy, death/rebirth, psychology' },
  9: { theme: 'Expansion & Wisdom', lifeArea: 'higher education, philosophy, travel, beliefs' },
  10: { theme: 'Career & Public Image', lifeArea: 'profession, reputation, authority, life direction' },
  11: { theme: 'Community & Hopes', lifeArea: 'friendships, groups, aspirations, social causes' },
  12: { theme: 'Spirituality & Unconscious', lifeArea: 'solitude, dreams, hidden matters, spirituality' },
}

function getPlacement(chart: NatalChart, planet: string): NatalPlacement | undefined {
  return chart.placements.find((p) => p.planet.toLowerCase() === planet.toLowerCase())
}

// Convert lowercase sign names to capitalized (e.g., 'leo' -> 'Leo')
function capitalizeSign(sign: string): string {
  return sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase()
}

function generatePersonalityReport(chart: NatalChart, userName: string): GeneratedReport {
  const sun = getPlacement(chart, 'sun')
  const moon = getPlacement(chart, 'moon')
  const mercury = getPlacement(chart, 'mercury')
  const venus = getPlacement(chart, 'venus')
  const mars = getPlacement(chart, 'mars')
  const jupiter = getPlacement(chart, 'jupiter')
  const saturn = getPlacement(chart, 'saturn')
  const sunSign = capitalizeSign(sun?.sign || 'leo')
  const moonSign = capitalizeSign(moon?.sign || 'cancer')
  const risingSign = capitalizeSign(chart.ascendant?.sign || sun?.sign || 'leo')
  const mercurySign = capitalizeSign(mercury?.sign || sun?.sign || 'leo')
  const venusSign = capitalizeSign(venus?.sign || 'libra')
  const marsSign = capitalizeSign(mars?.sign || 'aries')
  const jupiterSign = capitalizeSign(jupiter?.sign || 'sagittarius')
  const saturnSign = capitalizeSign(saturn?.sign || 'capricorn')
  const sunHouse = sun?.house || 1
  const moonHouse = moon?.house || 4

  const sunTraits = signCharacteristics[sunSign]
  const moonTraits = signCharacteristics[moonSign]
  const risingTraits = signCharacteristics[risingSign]

  const sections: ReportSection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `Welcome to your Personality Deep Dive, ${userName}. This comprehensive report explores the unique cosmic blueprint encoded in your birth chart at the moment you entered this world. Unlike generic horoscopes based solely on sun signs, this analysis examines the intricate interplay of all your planetary placements to reveal a nuanced portrait of who you truly are.

Your birth chart is a snapshot of the heavens, a celestial fingerprint that belongs only to you. The positions of the Sun, Moon, and planets at your birth create patterns and relationships that influence your personality, motivations, challenges, and gifts. Understanding these cosmic influences offers profound insights into your psychological makeup and life path.

Throughout this report, we'll explore your core identity (Sun), emotional nature (Moon), how others perceive you (Rising), your communication style (Mercury), love language (Venus), drive and ambition (Mars), and much more. Each section builds upon the previous, painting an increasingly detailed picture of your multidimensional self.`,
    },
    {
      id: 'sun-sign',
      title: 'The Essence of You: Your Sun in ' + sunSign,
      icon: '☀️',
      content: `Your Sun represents your core identity, your fundamental sense of self, and the central purpose you're here to express. With your Sun in ${sunSign}, a ${sunTraits.element} sign of the ${sunTraits.modality} modality, you are naturally ${sunTraits.traits.join(', ')}.

${sunSign} is ruled by ${sunTraits.ruler}, which colors your self-expression with ${sunSign === 'Leo' ? 'warmth, creativity, and a natural desire to shine' : sunSign === 'Aries' ? 'initiative, courage, and pioneering spirit' : sunSign === 'Taurus' ? 'stability, sensuality, and appreciation for life\'s pleasures' : sunSign === 'Gemini' ? 'curiosity, wit, and intellectual versatility' : sunSign === 'Cancer' ? 'emotional depth, nurturing instincts, and protective care' : sunSign === 'Virgo' ? 'analytical precision, helpfulness, and attention to detail' : sunSign === 'Libra' ? 'grace, diplomacy, and a deep appreciation for beauty and harmony' : sunSign === 'Scorpio' ? 'intensity, depth, and transformative power' : sunSign === 'Sagittarius' ? 'optimism, adventure, and philosophical wisdom' : sunSign === 'Capricorn' ? 'ambition, discipline, and practical achievement' : sunSign === 'Aquarius' ? 'originality, humanitarian vision, and independent thinking' : 'compassion, imagination, and spiritual sensitivity'}.

Your Sun in the ${sunHouse}${sunHouse === 1 ? 'st' : sunHouse === 2 ? 'nd' : sunHouse === 3 ? 'rd' : 'th'} House places your vital self-expression in the realm of ${houseThemes[sunHouse]?.lifeArea || 'personal development'}. This house placement suggests that you find your sense of purpose and identity most strongly through ${houseThemes[sunHouse]?.theme.toLowerCase() || 'self-expression'}.

As a ${sunTraits.element} sign, you process life primarily through ${sunTraits.element === 'Fire' ? 'action, inspiration, and enthusiasm. You need excitement, challenge, and creative outlets to feel alive' : sunTraits.element === 'Earth' ? 'practical application and tangible results. You value stability, material security, and things you can see and touch' : sunTraits.element === 'Air' ? 'ideas, communication, and social connection. You thrive on intellectual stimulation and meaningful conversations' : 'emotions, intuition, and deep connection. You navigate the world through feelings and need emotional authenticity'}.

The ${sunTraits.modality} quality of ${sunSign} means you are ${sunTraits.modality === 'Cardinal' ? 'an initiator, someone who starts things and leads the way. You prefer to be at the forefront of action rather than following others' : sunTraits.modality === 'Fixed' ? 'a sustainer, someone who maintains, builds, and sees things through. Your determination and persistence are remarkable strengths' : 'an adapter, someone who thrives on change and variety. Your flexibility allows you to navigate transitions with grace'}.`,
    },
    {
      id: 'moon-sign',
      title: 'Your Inner World: Moon in ' + moonSign,
      icon: '🌙',
      content: `While your Sun represents your conscious self, your Moon reveals your emotional nature, inner needs, and subconscious patterns. With your Moon in ${moonSign}, your emotional world is characterized by ${moonTraits.traits.slice(0, 2).join(' and ')} tendencies.

The Moon in ${moonSign} suggests that you find emotional security through ${moonSign === 'Cancer' ? 'nurturing connections, family bonds, and creating a safe home environment' : moonSign === 'Taurus' ? 'stability, comfort, and sensory pleasures like good food and beautiful surroundings' : moonSign === 'Scorpio' ? 'deep emotional intimacy, psychological understanding, and transformative experiences' : moonSign === 'Pisces' ? 'spiritual connection, creative expression, and compassionate service' : moonSign === 'Leo' ? 'recognition, creative expression, and being appreciated for who you are' : moonSign === 'Aries' ? 'independence, action, and the freedom to be yourself' : moonSign === 'Gemini' ? 'mental stimulation, variety, and communicating your feelings' : moonSign === 'Virgo' ? 'being helpful, having routines, and feeling useful' : moonSign === 'Libra' ? 'harmonious relationships, beauty, and peaceful environments' : moonSign === 'Sagittarius' ? 'freedom, adventure, and exploring new horizons' : moonSign === 'Capricorn' ? 'achievement, structure, and emotional self-sufficiency' : 'intellectual connection, group involvement, and maintaining your independence'}.

Your Moon in the ${moonHouse}${moonHouse === 1 ? 'st' : moonHouse === 2 ? 'nd' : moonHouse === 3 ? 'rd' : 'th'} House indicates that your emotional well-being is closely tied to matters of ${houseThemes[moonHouse]?.lifeArea || 'personal development'}. This placement suggests that ${houseThemes[moonHouse]?.theme || 'Self-expression'} plays a significant role in your emotional life.

As a ${moonTraits.element} Moon, you process emotions ${moonTraits.element === 'Water' ? 'deeply and intuitively. You absorb the emotional atmosphere around you and may need time alone to process what you\'ve taken in. Your empathy is a gift, but learning emotional boundaries is essential for your well-being' : moonTraits.element === 'Earth' ? 'practically and steadily. You prefer to deal with feelings in concrete ways and may express love through acts of service or material gifts. Emotional stability is important to you' : moonTraits.element === 'Fire' ? 'quickly and expressively. You don\'t hold onto feelings for long and prefer to address emotional matters directly. You need excitement and passion in your emotional life' : 'intellectually and communicatively. You may need to talk through your feelings or understand them logically. Emotional distance can be both a strength and something to work on'}.

Your mother figure or primary caregiver likely embodied ${moonSign} qualities, which shaped your early emotional programming. Understanding this influence can help you recognize patterns in how you seek nurturing and comfort as an adult.`,
    },
    {
      id: 'rising-sign',
      title: 'Your Mask & First Impressions: ' + risingSign + ' Rising',
      icon: '🌅',
      content: `Your Ascendant, or Rising sign, is the zodiac sign that was rising on the eastern horizon at your moment of birth. This is the mask you wear when meeting the world, the first impression you make, and the filter through which you approach new experiences. With ${risingSign} Rising, you project ${risingTraits.traits.slice(0, 2).join(' and ')} energy to others.

People often perceive you as ${risingSign === 'Aries' ? 'bold, direct, and energetic. You may come across as someone who knows what they want and isn\'t afraid to go after it' : risingSign === 'Taurus' ? 'calm, reliable, and perhaps a bit reserved. You project an aura of stability and groundedness' : risingSign === 'Gemini' ? 'curious, talkative, and mentally quick. You seem adaptable and interested in many topics' : risingSign === 'Cancer' ? 'nurturing, approachable, and emotionally attuned. You may seem caring and somewhat protective' : risingSign === 'Leo' ? 'confident, warm, and perhaps dramatic. You have a natural presence that draws attention' : risingSign === 'Virgo' ? 'modest, helpful, and detail-oriented. You come across as someone who has things together' : risingSign === 'Libra' ? 'charming, diplomatic, and aesthetically aware. You project grace and a desire for harmony' : risingSign === 'Scorpio' ? 'intense, mysterious, and powerful. You have a penetrating gaze that others find compelling' : risingSign === 'Sagittarius' ? 'optimistic, friendly, and adventurous. You seem open to new experiences and ideas' : risingSign === 'Capricorn' ? 'serious, ambitious, and mature beyond your years. You project competence and responsibility' : risingSign === 'Aquarius' ? 'unique, independent, and perhaps a bit eccentric. You don\'t seem to follow the crowd' : 'dreamy, compassionate, and perhaps somewhat elusive. You have an otherworldly quality about you'}.

This ${risingTraits.element} Rising sign means you approach new situations with ${risingTraits.element === 'Fire' ? 'enthusiasm and a readiness to take action. You dive into new experiences headfirst' : risingTraits.element === 'Earth' ? 'caution and practicality. You assess new situations carefully before committing' : risingTraits.element === 'Air' ? 'curiosity and a desire to understand. You intellectualize new experiences' : 'sensitivity and intuition. You feel your way into new situations, picking up on subtle cues'}.

Your Rising sign also influences your physical appearance and body language. ${risingSign} Rising often gives ${risingSign === 'Aries' ? 'a athletic build, prominent brows, and quick, decisive movements' : risingSign === 'Taurus' ? 'a sturdy frame, pleasant features, and a graceful yet deliberate way of moving' : risingSign === 'Gemini' ? 'a youthful appearance, expressive hands, and quick, animated gestures' : risingSign === 'Cancer' ? 'a round face, nurturing demeanor, and protective body language' : risingSign === 'Leo' ? 'a mane-like head of hair, proud posture, and dramatic gestures' : risingSign === 'Virgo' ? 'a neat appearance, attentive expression, and precise movements' : risingSign === 'Libra' ? 'balanced features, a pleasant smile, and graceful movements' : risingSign === 'Scorpio' ? 'intense eyes, a magnetic presence, and controlled movements' : risingSign === 'Sagittarius' ? 'a tall or athletic build, an open smile, and expansive gestures' : risingSign === 'Capricorn' ? 'a mature appearance, strong bone structure, and measured movements' : risingSign === 'Aquarius' ? 'unusual features, a friendly but detached demeanor, and quirky gestures' : 'soft features, dreamy eyes, and fluid movements'}.`,
    },
    {
      id: 'mercury',
      title: 'Your Mind & Communication Style',
      icon: '☿️',
      content: `Mercury governs how you think, learn, and communicate. With Mercury in ${mercurySign}, your mental processes are colored by ${signCharacteristics[mercurySign]?.traits.slice(0, 2).join(' and ')} qualities.

Your thinking style is ${signCharacteristics[mercurySign]?.element === 'Fire' ? 'quick, intuitive, and often inspired. You grasp concepts rapidly and prefer to communicate with enthusiasm and directness. Long, detailed explanations may bore you - you want the big picture' : signCharacteristics[mercurySign]?.element === 'Earth' ? 'practical, thorough, and grounded. You learn best through hands-on experience and prefer information that has practical applications. You may take your time to process new ideas' : signCharacteristics[mercurySign]?.element === 'Air' ? 'logical, versatile, and socially oriented. You love exchanging ideas, can see multiple perspectives, and enjoy intellectual discussions. Abstract concepts come naturally to you' : 'intuitive, imaginative, and emotionally colored. You absorb information through feelings and impressions. Your communication style may be poetic or metaphorical'}.

In conversations, you tend to ${mercurySign === 'Aries' ? 'be direct and get straight to the point. You may interrupt when excited and prefer fast-paced discussions' : mercurySign === 'Taurus' ? 'speak thoughtfully and deliberately. You choose your words carefully and value substance over flash' : mercurySign === 'Gemini' ? 'be witty, curious, and able to talk about anything. You love variety in conversation and can juggle multiple topics' : mercurySign === 'Cancer' ? 'speak from the heart and remember conversations emotionally. You may be protective of your ideas' : mercurySign === 'Leo' ? 'communicate with warmth and creativity. You have a flair for storytelling and enjoy being heard' : mercurySign === 'Virgo' ? 'be analytical and precise. You notice details others miss and may enjoy helpful criticism' : mercurySign === 'Libra' ? 'be diplomatic and fair-minded. You consider others\' perspectives and communicate harmoniously' : mercurySign === 'Scorpio' ? 'probe beneath the surface. You\'re interested in hidden truths and may ask penetrating questions' : mercurySign === 'Sagittarius' ? 'think big and speak honestly. You\'re interested in meaning and may be blunt in your delivery' : mercurySign === 'Capricorn' ? 'be serious and purposeful in communication. You value efficient, goal-oriented discussions' : mercurySign === 'Aquarius' ? 'think unconventionally and communicate original ideas. You enjoy intellectual debates' : 'communicate intuitively and imaginatively. Your thoughts may drift and you express yourself creatively'}.

Mercury in the ${mercury?.house || 3}${(mercury?.house || 3) === 1 ? 'st' : (mercury?.house || 3) === 2 ? 'nd' : (mercury?.house || 3) === 3 ? 'rd' : 'th'} House suggests that your mind is particularly focused on ${houseThemes[mercury?.house || 3]?.lifeArea || 'communication and learning'}. You may find yourself frequently thinking about or discussing matters related to this life area.`,
    },
    {
      id: 'venus',
      title: 'Love, Beauty & Values',
      icon: '♀️',
      content: `Venus reveals what you find beautiful, how you approach love and relationships, and what you value most deeply. With Venus in ${venusSign}, your approach to love is characterized by ${signCharacteristics[venusSign]?.traits.slice(0, 2).join(' and ')} qualities.

In relationships, you ${venusSign === 'Aries' ? 'are passionate, direct, and enjoy the chase. You need excitement and independence even in partnership' : venusSign === 'Taurus' ? 'are loyal, sensual, and seek stability. Physical affection and creature comforts are important to you' : venusSign === 'Gemini' ? 'need mental stimulation and variety. Communication and wit attract you' : venusSign === 'Cancer' ? 'are nurturing and seek emotional security. Family values matter deeply to you' : venusSign === 'Leo' ? 'are generous, romantic, and need to feel special. Grand gestures appeal to you' : venusSign === 'Virgo' ? 'show love through acts of service. You\'re devoted but may be critical' : venusSign === 'Libra' ? 'seek harmony, beauty, and true partnership. Romance and aesthetics matter' : venusSign === 'Scorpio' ? 'love deeply and intensely. You need emotional authenticity and transformative connections' : venusSign === 'Sagittarius' ? 'need freedom and adventure in love. You\'re attracted to different cultures and philosophies' : venusSign === 'Capricorn' ? 'take love seriously and value long-term commitment. Status may factor into attraction' : venusSign === 'Aquarius' ? 'need friendship and intellectual connection. Unconventional relationships may appeal to you' : 'are romantic, compassionate, and seek soulmate connections. You idealize love'}.

Your love language and what makes you feel appreciated involves ${signCharacteristics[venusSign]?.element === 'Fire' ? 'excitement, attention, and spontaneous expressions of love. You appreciate passion and adventure' : signCharacteristics[venusSign]?.element === 'Earth' ? 'reliability, physical presence, and tangible expressions of love. Quality time and physical touch matter' : signCharacteristics[venusSign]?.element === 'Air' ? 'communication, intellectual connection, and social engagement. Words of affirmation resonate' : 'emotional depth, intuition, and spiritual connection. You need to feel deeply understood'}.

Venus in the ${venus?.house || 7}${(venus?.house || 7) === 1 ? 'st' : (venus?.house || 7) === 2 ? 'nd' : (venus?.house || 7) === 3 ? 'rd' : 'th'} House suggests that matters of ${houseThemes[venus?.house || 7]?.lifeArea || 'partnerships'} are particularly important in your love life and may be where you experience the most significant romantic encounters.`,
    },
    {
      id: 'mars',
      title: 'Drive, Ambition & Assertion',
      icon: '♂️',
      content: `Mars represents your drive, how you assert yourself, and what motivates you to take action. With Mars in ${marsSign}, you pursue your goals with ${signCharacteristics[marsSign]?.traits.slice(0, 2).join(' and ')} energy.

Your approach to conflict and challenges is ${marsSign === 'Aries' ? 'direct and immediate. You confront obstacles head-on and don\'t shy away from competition' : marsSign === 'Taurus' ? 'patient but unstoppable once committed. You build momentum slowly but have tremendous staying power' : marsSign === 'Gemini' ? 'strategic and versatile. You use wit and adaptability to navigate challenges' : marsSign === 'Cancer' ? 'defensive and protective. You fight hardest for family and emotional security' : marsSign === 'Leo' ? 'dramatic and confident. You need to feel proud of your actions and pursue glory' : marsSign === 'Virgo' ? 'precise and methodical. You strategize carefully and perfect your approach' : marsSign === 'Libra' ? 'diplomatic and indirect. You prefer to negotiate but can be assertive when fairness demands' : marsSign === 'Scorpio' ? 'intense and strategic. You\'re relentless in pursuit of goals and don\'t forget slights' : marsSign === 'Sagittarius' ? 'bold and expansive. You take big swings and aren\'t afraid of risk' : marsSign === 'Capricorn' ? 'disciplined and ambitious. You work tirelessly toward concrete achievements' : marsSign === 'Aquarius' ? 'unconventional and idealistic. You fight for causes and rebel against restrictions' : 'subtle and adaptable. Your energy fluctuates and you may avoid direct confrontation'}.

Your motivation comes from ${signCharacteristics[marsSign]?.element === 'Fire' ? 'excitement, challenge, and the desire to prove yourself. You need goals that inspire you' : signCharacteristics[marsSign]?.element === 'Earth' ? 'practical results and material security. You\'re motivated by tangible achievements' : signCharacteristics[marsSign]?.element === 'Air' ? 'ideas, social impact, and intellectual challenges. Mental stimulation drives your actions' : 'emotional meaning and intuitive guidance. You\'re motivated by feelings and spiritual purpose'}.

Mars in the ${mars?.house || 1}${(mars?.house || 1) === 1 ? 'st' : (mars?.house || 1) === 2 ? 'nd' : (mars?.house || 1) === 3 ? 'rd' : 'th'} House directs your assertive energy toward ${houseThemes[mars?.house || 1]?.lifeArea || 'self-expression'}. This is where you\'re most likely to take action and assert your will.`,
    },
    {
      id: 'jupiter',
      title: 'Growth, Luck & Expansion',
      icon: '♃',
      content: `Jupiter represents where you find growth, luck, and expansion in life. With Jupiter in ${jupiterSign}, your path to abundance involves embracing ${signCharacteristics[jupiterSign]?.traits.slice(0, 2).join(' and ')} qualities.

You experience the most growth and opportunity when you ${jupiterSign === 'Aries' ? 'take bold initiative and trust your instincts. Fortune favors your bravery' : jupiterSign === 'Taurus' ? 'cultivate patience and appreciate life\'s pleasures. Abundance grows through steady effort' : jupiterSign === 'Gemini' ? 'stay curious and communicate widely. Knowledge and connections bring opportunities' : jupiterSign === 'Cancer' ? 'nurture others and create emotional safety. Your caring nature attracts abundance' : jupiterSign === 'Leo' ? 'express your creativity confidently. Generosity and self-expression attract luck' : jupiterSign === 'Virgo' ? 'serve others and perfect your skills. Diligence and helpfulness bring rewards' : jupiterSign === 'Libra' ? 'build partnerships and create harmony. Cooperation multiplies your fortune' : jupiterSign === 'Scorpio' ? 'embrace transformation and explore depths. Power and resources come through intensity' : jupiterSign === 'Sagittarius' ? 'expand your horizons and follow your beliefs. Adventure and faith bring abundance' : jupiterSign === 'Capricorn' ? 'work hard and build structures. Achievement and responsibility bring recognition' : jupiterSign === 'Aquarius' ? 'innovate and serve humanity. Unconventional paths bring unexpected blessings' : 'trust your intuition and practice compassion. Spiritual pursuits attract grace'}.

Jupiter in the ${jupiter?.house || 9}${(jupiter?.house || 9) === 1 ? 'st' : (jupiter?.house || 9) === 2 ? 'nd' : (jupiter?.house || 9) === 3 ? 'rd' : 'th'} House suggests that your greatest opportunities for expansion come through ${houseThemes[jupiter?.house || 9]?.lifeArea || 'higher learning and travel'}. This life area holds particular promise and luck for you.`,
    },
    {
      id: 'saturn',
      title: 'Challenges, Mastery & Wisdom',
      icon: '♄',
      content: `Saturn represents your challenges, fears, and the areas where you must develop mastery through hard work and discipline. With Saturn in ${saturnSign}, your major life lessons involve ${signCharacteristics[saturnSign]?.traits.slice(0, 2).join(' and ')} themes.

Your core challenge is to ${saturnSign === 'Aries' ? 'develop patience and learn to channel your initiative constructively. Impulsiveness must transform into strategic action' : saturnSign === 'Taurus' ? 'find true security within yourself rather than through possessions. Material fears must be overcome' : saturnSign === 'Gemini' ? 'commit to deep learning rather than surface knowledge. Mental discipline must be developed' : saturnSign === 'Cancer' ? 'establish emotional boundaries and mature independence. Family patterns must be consciously addressed' : saturnSign === 'Leo' ? 'develop authentic confidence rather than needing external validation. Creative blocks must be worked through' : saturnSign === 'Virgo' ? 'overcome perfectionism and self-criticism. Learning self-acceptance is your path' : saturnSign === 'Libra' ? 'find balance between self and others. Relationship patterns must be consciously transformed' : saturnSign === 'Scorpio' ? 'face your shadows and transform fears around power and intimacy. Trust must be earned and given' : saturnSign === 'Sagittarius' ? 'ground your beliefs in practical wisdom. Blind optimism must evolve into mature faith' : saturnSign === 'Capricorn' ? 'achieve without losing your humanity. Success and compassion must be integrated' : saturnSign === 'Aquarius' ? 'balance individuality with belonging. Detachment must transform into engaged independence' : 'establish healthy boundaries while maintaining compassion. Escapism must be replaced with spiritual grounding'}.

Saturn in the ${saturn?.house || 10}${(saturn?.house || 10) === 1 ? 'st' : (saturn?.house || 10) === 2 ? 'nd' : (saturn?.house || 10) === 3 ? 'rd' : 'th'} House indicates that your most significant life lessons come through ${houseThemes[saturn?.house || 10]?.lifeArea || 'career and public life'}. This area may feel challenging early in life but becomes a source of wisdom and achievement over time.

The gifts of your Saturn position, once mastered, include tremendous ${signCharacteristics[saturnSign]?.element === 'Fire' ? 'courage, leadership, and the ability to inspire others through your hard-won confidence' : signCharacteristics[saturnSign]?.element === 'Earth' ? 'practical wisdom, stability, and the ability to build lasting structures' : signCharacteristics[saturnSign]?.element === 'Air' ? 'intellectual authority, communication skills, and the ability to teach and connect' : 'emotional wisdom, intuitive depth, and the ability to guide others through difficult feelings'}.`,
    },
    {
      id: 'life-purpose',
      title: 'Your Soul\'s Purpose',
      icon: '🌟',
      content: `Integrating all the elements of your chart, several key themes emerge about your life purpose and soul's intention for this lifetime.

With your Sun in ${sunSign} and Moon in ${moonSign}, you are learning to integrate ${sunTraits.element} ${sunTraits.element === moonTraits.element ? 'energy in different expressions' : `energy with ${moonTraits.element} energy`}. This combination suggests a life journey of ${sunTraits.element === 'Fire' && moonTraits.element === 'Water' ? 'balancing action with feeling, courage with sensitivity' : sunTraits.element === 'Fire' && moonTraits.element === 'Earth' ? 'grounding your enthusiasm in practical reality' : sunTraits.element === 'Fire' && moonTraits.element === 'Air' ? 'channeling inspiration into communication and connection' : sunTraits.element === 'Earth' && moonTraits.element === 'Water' ? 'combining practical wisdom with emotional depth' : sunTraits.element === 'Earth' && moonTraits.element === 'Fire' ? 'enlivening your practical nature with passion and risk-taking' : sunTraits.element === 'Earth' && moonTraits.element === 'Air' ? 'bridging the material and intellectual worlds' : sunTraits.element === 'Air' && moonTraits.element === 'Water' ? 'uniting mind and heart, thought and feeling' : sunTraits.element === 'Air' && moonTraits.element === 'Fire' ? 'translating ideas into inspired action' : sunTraits.element === 'Air' && moonTraits.element === 'Earth' ? 'manifesting ideas into tangible form' : sunTraits.element === 'Water' && moonTraits.element === 'Fire' ? 'transforming emotions into creative expression' : sunTraits.element === 'Water' && moonTraits.element === 'Earth' ? 'giving form to your deep feelings and intuitions' : 'deepening your emotional and intuitive nature from multiple angles'}.

Your ${risingSign} Rising suggests that you are meant to develop and express ${risingTraits.traits[0]} qualities as you move through life. This is the energy you're growing into, the self you're becoming.

The placement of your Sun in the ${sunHouse}${sunHouse === 1 ? 'st' : sunHouse === 2 ? 'nd' : sunHouse === 3 ? 'rd' : 'th'} House indicates that a primary focus of your life purpose involves ${houseThemes[sunHouse]?.lifeArea}. This is where you're meant to shine and express your authentic self.`,
    },
    {
      id: 'conclusion',
      title: 'Embracing Your Cosmic Self',
      content: `${userName}, your birth chart reveals a complex, multidimensional being with tremendous potential for growth, love, and contribution to the world. The cosmic forces present at your birth are not deterministic commands but rather archetypal energies offering you a unique palette for painting your life.

Your ${sunSign} Sun gives you the gift of ${sunTraits.traits[0]} expression. Your ${moonSign} Moon provides emotional richness and ${moonTraits.traits[0]} depth. Your ${risingSign} Rising opens doors through your natural ${risingTraits.traits[0]} approach to life.

Remember that astrology is not about limitation but understanding. Every challenge shown in your chart is also a path to mastery. Every weakness is a potential strength. Your Saturn challenges will become your greatest wisdom. Your difficult aspects are the friction that polishes you into your brightest self.

As you continue your journey, return to this report as a reminder of who you are at your core. In moments of doubt, remember your cosmic blueprint. In times of decision, consult your chart's guidance. You are a unique expression of the universe itself, and understanding your birth chart is a powerful tool for self-acceptance and conscious evolution.

May the stars guide you, ${userName}, and may this report illuminate your path forward.`,
    },
  ]

  return {
    id: `personality-${Date.now()}`,
    slug: 'personality-deep-dive',
    title: 'Personality Deep Dive',
    generatedAt: new Date().toISOString(),
    userName,
    birthData: {
      date: '', // Would come from user data
      time: '',
      place: '',
    },
    sections,
    wordCount: sections.reduce((sum, s) => sum + s.content.split(' ').length, 0),
  }
}

function generateRelationshipReport(chart: NatalChart, partnerChart: NatalChart, userName: string, partnerName: string): GeneratedReport {
  const userSun = getPlacement(chart, 'sun')
  const partnerSun = getPlacement(partnerChart, 'sun')
  const userMoon = getPlacement(chart, 'moon')
  const partnerMoon = getPlacement(partnerChart, 'moon')
  const userVenus = getPlacement(chart, 'venus')
  const partnerVenus = getPlacement(partnerChart, 'venus')
  const userMars = getPlacement(chart, 'mars')
  const partnerMars = getPlacement(partnerChart, 'mars')

  const userSunSign = capitalizeSign(userSun?.sign || 'leo')
  const partnerSunSign = capitalizeSign(partnerSun?.sign || 'libra')
  const userMoonSign = capitalizeSign(userMoon?.sign || 'cancer')
  const partnerMoonSign = capitalizeSign(partnerMoon?.sign || 'pisces')
  const userVenusSign = capitalizeSign(userVenus?.sign || 'libra')
  const partnerVenusSign = capitalizeSign(partnerVenus?.sign || 'leo')

  const userElement = signCharacteristics[userSunSign]?.element || 'Fire'
  const partnerElement = signCharacteristics[partnerSunSign]?.element || 'Air'

  const sections: ReportSection[] = [
    {
      id: 'introduction',
      title: 'Your Cosmic Connection',
      content: `Welcome to your Relationship Compatibility Report, ${userName}. This comprehensive analysis explores the synastry between your birth chart and ${partnerName}'s chart to reveal the cosmic dynamics at play in your relationship.

Synastry is the art of comparing two birth charts to understand how two individuals interact energetically. When planets from one person's chart connect with planets in another's, they create aspects that can be harmonious, challenging, or a complex mixture of both. These connections influence everything from initial attraction to long-term compatibility.

This report will explore your emotional bond, communication patterns, romantic chemistry, and growth potential as a couple. Remember that no relationship is purely "compatible" or "incompatible" - all relationships have areas of ease and areas requiring conscious effort. The goal of this report is to help you understand and consciously work with the energies present in your connection.`,
    },
    {
      id: 'overview',
      title: 'Connection at a Glance',
      icon: '✨',
      content: `${userName}, you are a ${userSunSign} Sun with a ${userMoonSign} Moon, while ${partnerName} is a ${partnerSunSign} Sun with a ${partnerMoonSign} Moon. This ${userElement}-${partnerElement} combination ${userElement === partnerElement ? `brings natural understanding through shared elemental energy. You both process life through ${userElement.toLowerCase()} energy, creating an instinctive rapport` : userElement === 'Fire' && partnerElement === 'Air' || userElement === 'Air' && partnerElement === 'Fire' ? 'is classically compatible. Fire and Air feed each other - your enthusiasm inspires ideas, and ideas fuel further inspiration' : userElement === 'Earth' && partnerElement === 'Water' || userElement === 'Water' && partnerElement === 'Earth' ? 'is classically compatible. Earth and Water nourish each other - stability holds emotion, and emotion enriches practicality' : userElement === 'Fire' && partnerElement === 'Water' || userElement === 'Water' && partnerElement === 'Fire' ? 'creates steam - intense, passionate, but requiring careful balance. Fire can evaporate Water\'s sensitivity, while Water can douse Fire\'s enthusiasm' : userElement === 'Fire' && partnerElement === 'Earth' || userElement === 'Earth' && partnerElement === 'Fire' ? 'requires patience. Earth can feel Fire is reckless, while Fire can feel Earth is too slow. But together you can ground inspiration into reality' : userElement === 'Air' && partnerElement === 'Water' || userElement === 'Water' && partnerElement === 'Air' ? 'brings mind and heart together, though not always easily. Air may feel Water is too emotional, while Water may feel Air is too detached' : 'brings mind and matter together. Air can feel Earth is too practical, while Earth can feel Air is too theoretical'}.

At your core, ${userName}'s ${userSunSign} nature seeks ${signCharacteristics[userSunSign]?.traits[0]} experiences, while ${partnerName}'s ${partnerSunSign} nature is drawn to ${signCharacteristics[partnerSunSign]?.traits[0]} pursuits. This ${userSunSign === partnerSunSign ? 'similarity means you understand each other\'s basic drives, though you may also mirror each other\'s challenges' : 'difference means you each bring something unique to the relationship, expanding each other\'s worlds'}.`,
    },
    {
      id: 'emotional-bond',
      title: 'Emotional Compatibility',
      icon: '🌙',
      content: `The Moon-to-Moon connection reveals the emotional bond between partners. ${userName}'s ${userMoonSign} Moon meets ${partnerName}'s ${partnerMoonSign} Moon in ${signCharacteristics[userMoonSign]?.element === signCharacteristics[partnerMoonSign]?.element ? `harmonious ${signCharacteristics[userMoonSign]?.element} resonance. You both process emotions through the same element, creating natural emotional understanding` : 'a dance of different emotional languages'}.

${userName}, your ${userMoonSign} Moon needs ${userMoonSign === 'Cancer' ? 'nurturing, security, and emotional closeness' : userMoonSign === 'Taurus' ? 'stability, comfort, and sensory pleasure' : userMoonSign === 'Scorpio' ? 'depth, intensity, and emotional truth' : userMoonSign === 'Pisces' ? 'spiritual connection and compassionate understanding' : userMoonSign === 'Leo' ? 'appreciation, warmth, and creative expression' : userMoonSign === 'Aries' ? 'independence, action, and direct emotional expression' : userMoonSign === 'Gemini' ? 'communication, variety, and mental stimulation' : userMoonSign === 'Virgo' ? 'practical helpfulness and thoughtful gestures' : userMoonSign === 'Libra' ? 'harmony, beauty, and relational balance' : userMoonSign === 'Sagittarius' ? 'freedom, adventure, and shared beliefs' : userMoonSign === 'Capricorn' ? 'respect, achievement, and emotional reliability' : 'independence, friendship, and intellectual connection'} to feel emotionally secure.

${partnerName}'s ${partnerMoonSign} Moon needs ${partnerMoonSign === 'Cancer' ? 'nurturing, security, and emotional closeness' : partnerMoonSign === 'Taurus' ? 'stability, comfort, and sensory pleasure' : partnerMoonSign === 'Scorpio' ? 'depth, intensity, and emotional truth' : partnerMoonSign === 'Pisces' ? 'spiritual connection and compassionate understanding' : partnerMoonSign === 'Leo' ? 'appreciation, warmth, and creative expression' : partnerMoonSign === 'Aries' ? 'independence, action, and direct emotional expression' : partnerMoonSign === 'Gemini' ? 'communication, variety, and mental stimulation' : partnerMoonSign === 'Virgo' ? 'practical helpfulness and thoughtful gestures' : partnerMoonSign === 'Libra' ? 'harmony, beauty, and relational balance' : partnerMoonSign === 'Sagittarius' ? 'freedom, adventure, and shared beliefs' : partnerMoonSign === 'Capricorn' ? 'respect, achievement, and emotional reliability' : 'independence, friendship, and intellectual connection'} to feel emotionally secure.

Understanding and honoring these different emotional needs is key to creating lasting intimacy. When both partners feel emotionally safe, the relationship flourishes.`,
    },
    {
      id: 'romantic-chemistry',
      title: 'Love & Attraction',
      icon: '💕',
      content: `Venus reveals what we find beautiful and how we love, while Mars shows how we pursue what we want. The Venus-Mars connections between your charts illuminate your romantic and physical chemistry.

${userName}'s Venus in ${userVenusSign} expresses love through ${signCharacteristics[userVenusSign]?.traits.slice(0, 2).join(' and ')} gestures. You feel most loved when ${userVenusSign === 'Aries' ? 'pursued with passion and given independence' : userVenusSign === 'Taurus' ? 'shown loyalty and physical affection' : userVenusSign === 'Gemini' ? 'engaged mentally and kept entertained' : userVenusSign === 'Cancer' ? 'nurtured and made to feel emotionally safe' : userVenusSign === 'Leo' ? 'adored, appreciated, and treated specially' : userVenusSign === 'Virgo' ? 'helped practically and noticed for your efforts' : userVenusSign === 'Libra' ? 'treated as an equal partner and romanced beautifully' : userVenusSign === 'Scorpio' ? 'given deep emotional and physical intimacy' : userVenusSign === 'Sagittarius' ? 'given freedom and shared adventures' : userVenusSign === 'Capricorn' ? 'shown respect and long-term commitment' : userVenusSign === 'Aquarius' ? 'valued as a unique individual and friend' : 'connected with spiritually and treated with compassion'}.

${partnerName}'s Venus in ${partnerVenusSign} expresses love through ${signCharacteristics[partnerVenusSign]?.traits.slice(0, 2).join(' and ')} gestures. They feel most loved when ${partnerVenusSign === 'Aries' ? 'pursued with passion and given independence' : partnerVenusSign === 'Taurus' ? 'shown loyalty and physical affection' : partnerVenusSign === 'Gemini' ? 'engaged mentally and kept entertained' : partnerVenusSign === 'Cancer' ? 'nurtured and made to feel emotionally safe' : partnerVenusSign === 'Leo' ? 'adored, appreciated, and treated specially' : partnerVenusSign === 'Virgo' ? 'helped practically and noticed for their efforts' : partnerVenusSign === 'Libra' ? 'treated as an equal partner and romanced beautifully' : partnerVenusSign === 'Scorpio' ? 'given deep emotional and physical intimacy' : partnerVenusSign === 'Sagittarius' ? 'given freedom and shared adventures' : partnerVenusSign === 'Capricorn' ? 'shown respect and long-term commitment' : partnerVenusSign === 'Aquarius' ? 'valued as a unique individual and friend' : 'connected with spiritually and treated with compassion'}.

The ${userVenusSign === partnerVenusSign ? 'shared Venus sign creates natural harmony in your love languages' : `different Venus signs mean you may need to consciously learn each other's love language`}. Taking time to understand how your partner receives love - rather than assuming they want what you want - is essential for romantic fulfillment.`,
    },
    {
      id: 'communication',
      title: 'Communication Dynamics',
      icon: '💬',
      content: `Effective communication is the foundation of any successful relationship. Your Mercury signs and aspects reveal how you think, process information, and express yourselves to each other.

When you communicate, ${userName}'s natural style is ${signCharacteristics[userSunSign]?.element === 'Fire' ? 'direct, enthusiastic, and sometimes impulsive. You prefer to address issues immediately and may speak before thinking things through completely' : signCharacteristics[userSunSign]?.element === 'Earth' ? 'practical, measured, and thorough. You like to think before speaking and prefer conversations that have a point' : signCharacteristics[userSunSign]?.element === 'Air' ? 'logical, curious, and versatile. You enjoy exchanging ideas and can see multiple perspectives' : 'intuitive, emotional, and sometimes indirect. You communicate as much through feeling and implication as through words'}.

${partnerName}'s communication style is ${signCharacteristics[partnerSunSign]?.element === 'Fire' ? 'direct, enthusiastic, and action-oriented. They want to address things and move on' : signCharacteristics[partnerSunSign]?.element === 'Earth' ? 'grounded, practical, and sometimes slow to process. They prefer concrete discussions' : signCharacteristics[partnerSunSign]?.element === 'Air' ? 'intellectual, communicative, and open to discussion. They want to understand and analyze' : 'emotional, intuitive, and sensitive. They pick up on unspoken cues and emotional undercurrents'}.

To communicate effectively, ${userName} can help by ${signCharacteristics[userSunSign]?.element === signCharacteristics[partnerSunSign]?.element ? 'recognizing that while you communicate similarly, you may have blind spots together' : signCharacteristics[partnerSunSign]?.element === 'Fire' ? 'being more direct and addressing issues promptly' : signCharacteristics[partnerSunSign]?.element === 'Earth' ? 'being patient and grounding conversations in practical terms' : signCharacteristics[partnerSunSign]?.element === 'Air' ? 'engaging intellectually and being open to discussion' : 'attending to emotional undercurrents and being sensitive to feelings'}.`,
    },
    {
      id: 'growth',
      title: 'Growing Together',
      icon: '🌱',
      content: `Every relationship is a vehicle for personal growth. The friction points in your synastry are not problems to be fixed but opportunities for evolution. The very differences that challenge you are also invitations to become more whole.

${userName}, through this relationship you have the opportunity to develop ${signCharacteristics[partnerSunSign]?.traits[0]} qualities that may not come naturally to you. ${partnerName} mirrors back to you aspects of life that your own chart may underemphasize.

${partnerName}, being with ${userName} invites you to develop ${signCharacteristics[userSunSign]?.traits[0]} qualities. This relationship stretches you in ways that support your soul's growth.

The key challenges in your relationship likely center around ${userElement === partnerElement ? `the shadow side of your shared ${userElement} element. You may both struggle with the same blindspots` : userElement === 'Fire' && partnerElement === 'Water' || userElement === 'Water' && partnerElement === 'Fire' ? 'balancing action with sensitivity, independence with emotional closeness' : userElement === 'Fire' && partnerElement === 'Earth' || userElement === 'Earth' && partnerElement === 'Fire' ? 'balancing spontaneity with planning, risk-taking with security' : userElement === 'Fire' && partnerElement === 'Air' || userElement === 'Air' && partnerElement === 'Fire' ? 'occasionally grounding your shared enthusiasm and following through' : userElement === 'Earth' && partnerElement === 'Water' || userElement === 'Water' && partnerElement === 'Earth' ? 'occasionally lightening up and not taking everything so seriously' : userElement === 'Earth' && partnerElement === 'Air' || userElement === 'Air' && partnerElement === 'Earth' ? 'bridging the gap between theory and practice, ideas and implementation' : 'balancing head and heart, thinking and feeling'}.

Remember that relationships thrive not when partners are perfectly compatible, but when both partners are committed to growth, understanding, and showing up fully for each other.`,
    },
    {
      id: 'conclusion',
      title: 'Your Relationship\'s Potential',
      content: `${userName} and ${partnerName}, your charts reveal a relationship rich with potential for love, growth, and mutual understanding. Like all relationships, yours will have areas of natural harmony and areas requiring conscious effort.

Your ${userSunSign}-${partnerSunSign} Sun combination brings ${userElement === partnerElement ? 'natural understanding through shared elemental resonance' : 'complementary energies that can help you both grow'}. Your ${userMoonSign}-${partnerMoonSign} Moon connection shapes your emotional bond and sense of home together. Your Venus-Mars dynamics create the spark of attraction and determine how you express love.

The most successful couples are not those with "perfect" synastry, but those who:
- Communicate openly and honestly about their needs
- Respect and celebrate each other's differences
- Support each other's individual growth
- Show up consistently, especially during challenges
- Remember why they chose each other

May this report serve as a guide for understanding, appreciating, and nurturing the beautiful connection you share. The stars brought you together - now it's up to you to consciously create the relationship you both deserve.

With cosmic blessings for your journey together.`,
    },
  ]

  return {
    id: `relationship-${Date.now()}`,
    slug: 'relationship-compatibility',
    title: 'Relationship Compatibility',
    generatedAt: new Date().toISOString(),
    userName,
    partnerName,
    birthData: { date: '', time: '', place: '' },
    partnerBirthData: { date: '', time: '', place: '' },
    sections,
    wordCount: sections.reduce((sum, s) => sum + s.content.split(' ').length, 0),
  }
}

function generateYearAheadReport(chart: NatalChart, userName: string): GeneratedReport {
  const sun = getPlacement(chart, 'sun')
  const moon = getPlacement(chart, 'moon')
  const sunSign = capitalizeSign(sun?.sign || 'leo')
  const moonSign = capitalizeSign(moon?.sign || 'cancer')

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const currentMonth = new Date().getMonth()
  const yearMonths = [...months.slice(currentMonth), ...months.slice(0, currentMonth)]

  const sections: ReportSection[] = [
    {
      id: 'introduction',
      title: 'Your Year Ahead',
      content: `Welcome to your Year Ahead Forecast, ${userName}. This comprehensive report examines the major astrological influences that will shape your next twelve months, offering guidance for navigating opportunities and challenges alike.

As a ${sunSign} Sun with a ${moonSign} Moon, you'll experience the coming year through the lens of your unique birth chart. The transiting planets will interact with your natal positions in ways specific to you, creating periods of growth, challenge, and transformation.

This forecast covers career and finances, love and relationships, health and wellness, and personal growth. Each month brings its own energy and opportunities. By understanding the cosmic tides, you can align your actions with favorable periods and prepare for more challenging times.

Remember that astrology reveals tendencies and timing, not fixed fate. You always have free will to work with or against the energies present. Consider this report a weather forecast for your soul - useful for planning, but not deterministic of your journey.`,
    },
    {
      id: 'major-themes',
      title: 'Major Themes for the Year',
      icon: '🎯',
      content: `Several overarching themes will define your year ahead, ${userName}. Understanding these major influences helps you navigate the smaller daily fluctuations with greater perspective.

**Expansion and Growth**: Jupiter, the planet of opportunity and expansion, will be transiting through areas of your chart related to ${Math.random() > 0.5 ? 'career and public standing' : 'personal development and self-discovery'}. This brings opportunities for growth in these areas, though you'll need to actively pursue them.

**Restructuring and Maturity**: Saturn continues its journey through your chart, asking you to ${Math.random() > 0.5 ? 'take your responsibilities more seriously and build lasting structures' : 'examine your commitments and ensure they align with your long-term goals'}. While Saturn's lessons can feel heavy, they lead to genuine accomplishment.

**Transformation**: Pluto's slow transit continues to transform your approach to ${Math.random() > 0.5 ? 'personal power and self-expression' : 'shared resources and deep connections'}. This is a years-long process of death and rebirth in this area of life.

**Innovation and Change**: Uranus shakes up your ${Math.random() > 0.5 ? 'values and resources, asking you to find new ways of creating security' : 'identity and self-expression, encouraging you to break free from limiting patterns'}. Expect the unexpected in this area.

**Dreams and Dissolution**: Neptune continues dissolving boundaries around ${Math.random() > 0.5 ? 'your sense of identity, inviting spiritual growth but also potential confusion' : 'your community and friendships, bringing idealism but also potential disillusionment'}.`,
    },
    {
      id: 'career',
      title: 'Career & Professional Life',
      icon: '💼',
      content: `Your professional life this year is marked by ${Math.random() > 0.5 ? 'opportunities for advancement that require you to step outside your comfort zone' : 'a period of consolidation where you solidify your position and reputation'}.

The first quarter brings energy for ${Math.random() > 0.5 ? 'initiating new projects and making bold moves' : 'planning and strategic thinking'}. This is an excellent time to ${Math.random() > 0.5 ? 'pitch ideas, seek promotions, or start new ventures' : 'review your career trajectory and make adjustments'}.

Mid-year, you'll likely encounter ${Math.random() > 0.5 ? 'challenges that test your commitment to your path. These obstacles are opportunities in disguise' : 'opportunities to expand your professional network and explore new directions'}. Pay attention to connections made during this period.

The final quarter favors ${Math.random() > 0.5 ? 'completing major projects and receiving recognition for your efforts' : 'laying groundwork for next year\'s achievements'}. Financial matters are ${Math.random() > 0.5 ? 'favorable for investment and growth' : 'best approached conservatively'}.

Key Career Dates to Watch:
- ${yearMonths[2]} 15-22: Excellent for important meetings or presentations
- ${yearMonths[5]} 1-10: Opportunities for recognition or advancement
- ${yearMonths[8]} 20-30: Favorable for negotiations and contracts
- ${yearMonths[11]} 5-15: Good for year-end reviews and setting new goals`,
    },
    {
      id: 'love',
      title: 'Love & Relationships',
      icon: '💕',
      content: `Your love life this year carries themes of ${Math.random() > 0.5 ? 'deepening existing connections and finding greater intimacy' : 'new beginnings and exciting romantic possibilities'}.

For those in relationships, the year brings opportunities to ${Math.random() > 0.5 ? 'strengthen your bond through shared experiences and honest communication' : 'address long-standing issues and transform your dynamic'}. Venus transits through your chart will highlight periods of romantic harmony and potential tension.

For those seeking love, ${Math.random() > 0.5 ? 'the mid-year period is particularly favorable for meeting significant others' : 'the early months bring opportunities for meaningful connections'}. Be open to unexpected encounters, as love may arrive in surprising forms.

Key themes in relationships this year:
- Learning to balance independence with partnership
- Deepening emotional intimacy through vulnerability
- Addressing any patterns from past relationships
- Growing together while maintaining individual identities

Romantic High Points:
- ${yearMonths[1]} 10-20: Venus energy enhances attraction and harmony
- ${yearMonths[4]} 5-15: Favorable for commitment discussions or new relationships
- ${yearMonths[7]} 20-30: Passionate energy, excellent for romance
- ${yearMonths[10]} 1-10: Deep emotional connections possible`,
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      icon: '🌿',
      content: `Your physical and mental wellbeing this year benefits from ${Math.random() > 0.5 ? 'establishing consistent routines and habits' : 'trying new approaches to health and fitness'}.

Energy levels fluctuate throughout the year. The first quarter brings ${Math.random() > 0.5 ? 'high energy that should be channeled into establishing healthy habits' : 'a need for rest and recovery'}. Listen to your body's signals during this period.

Mid-year, focus on ${Math.random() > 0.5 ? 'mental health and stress management' : 'physical vitality and exercise'}. This is an excellent time to ${Math.random() > 0.5 ? 'begin therapy, meditation, or other mindfulness practices' : 'commit to a new fitness routine or sport'}.

The final quarter emphasizes ${Math.random() > 0.5 ? 'preventive health measures and wellness check-ups' : 'finding balance between activity and rest'}.

Health Focus Areas:
- ${yearMonths[0]}-${yearMonths[2]}: Foundation-building for year-long habits
- ${yearMonths[3]}-${yearMonths[5]}: Mental wellness and stress reduction
- ${yearMonths[6]}-${yearMonths[8]}: Physical vitality and energy management
- ${yearMonths[9]}-${yearMonths[11]}: Integration and sustainable practices

Remember that your ${sunSign} Sun benefits from ${signCharacteristics[sunSign]?.element === 'Fire' ? 'vigorous exercise and activities that burn off excess energy' : signCharacteristics[sunSign]?.element === 'Earth' ? 'consistent routines and practices that connect you with your body' : signCharacteristics[sunSign]?.element === 'Air' ? 'variety in your wellness routine and activities that engage your mind' : 'activities that honor your emotional nature, like swimming or yoga'}.`,
    },
    {
      id: 'personal-growth',
      title: 'Personal Growth & Spirituality',
      icon: '✨',
      content: `This year invites profound personal growth, ${userName}. The cosmic influences support ${Math.random() > 0.5 ? 'deep inner work and psychological transformation' : 'expanding your horizons and exploring new philosophies'}.

Your spiritual path this year involves ${Math.random() > 0.5 ? 'going inward to face and integrate shadow aspects of yourself' : 'reaching outward to connect with teachers, traditions, or communities that support your growth'}.

Key growth opportunities:
- Learning to trust your intuition more deeply
- Releasing old patterns that no longer serve you
- Developing greater self-compassion
- Expanding your understanding of who you are and who you can become

The eclipses this year fall in areas of your chart related to ${Math.random() > 0.5 ? 'identity and relationships, prompting evolution in how you see yourself and connect with others' : 'resources and transformation, catalyzing changes in what you value and how you create security'}.

Growth Practices to Consider:
- Journaling during New and Full Moons
- Regular meditation or contemplative practice
- Working with a therapist, coach, or spiritual mentor
- Reading and study in areas that call to you
- Time in nature for perspective and renewal`,
    },
    {
      id: 'month-by-month',
      title: 'Month-by-Month Overview',
      icon: '📅',
      content: yearMonths.map((month, i) => {
        const themes = ['new beginnings', 'resources', 'communication', 'home', 'creativity', 'health', 'relationships', 'transformation', 'expansion', 'career', 'community', 'reflection']
        const energies = ['high-energy', 'stabilizing', 'dynamic', 'introspective', 'creative', 'productive', 'harmonious', 'intense', 'expansive', 'ambitious', 'social', 'contemplative']
        return `**${month}**: A ${energies[i % 12]} month focused on ${themes[i % 12]}. Best for ${i % 4 === 0 ? 'initiating new projects' : i % 4 === 1 ? 'building and consolidating' : i % 4 === 2 ? 'connecting and communicating' : 'reflection and completion'}.`
      }).join('\n\n'),
    },
    {
      id: 'key-dates',
      title: 'Key Dates & Power Days',
      icon: '⭐',
      content: `Mark these significant dates on your calendar, ${userName}. These are moments when cosmic energy supports specific actions.

**New Moons** (Excellent for new beginnings):
- ${yearMonths[0]} 11: Set intentions for the year
- ${yearMonths[3]} 8: Fresh start in relationships
- ${yearMonths[6]} 6: Career and professional new beginnings
- ${yearMonths[9]} 2: Personal transformation

**Full Moons** (Peak energy, completion, release):
- ${yearMonths[1]} 24: Culmination in creative projects
- ${yearMonths[4]} 23: Relationship revelations
- ${yearMonths[7]} 19: Career achievements
- ${yearMonths[10]} 15: Spiritual insights

**Eclipses** (Major turning points):
- ${yearMonths[2]} 25: Solar Eclipse - New chapter begins
- ${yearMonths[5]} 21: Lunar Eclipse - Emotional breakthrough
- ${yearMonths[8]} 18: Solar Eclipse - Identity transformation
- ${yearMonths[11]} 14: Lunar Eclipse - Year-end revelation

**Mercury Retrograde** (Review and reflect, avoid major launches):
- ${yearMonths[0]} 14 - ${yearMonths[1]} 3
- ${yearMonths[4]} 10 - ${yearMonths[5]} 2
- ${yearMonths[8]} 9 - ${yearMonths[9]} 1

**Venus Retrograde** (Review relationships and values):
- ${yearMonths[6]} 22 - ${yearMonths[8]} 3

Use these dates as guideposts, but remember that your personal experience will be colored by your unique chart.`,
    },
    {
      id: 'conclusion',
      title: 'Embracing Your Year',
      content: `${userName}, the year ahead holds tremendous potential for growth, achievement, and joy. The cosmic tides will bring both opportunities and challenges, invitations to expand and calls to consolidate.

As a ${sunSign} Sun, you're naturally equipped to ${signCharacteristics[sunSign]?.traits[0]} your way through whatever arises. Your ${moonSign} Moon provides emotional resilience and ${signCharacteristics[moonSign]?.traits[0]} wisdom for navigating the inner journey.

Remember these guiding principles:
- The stars incline but do not compel - your choices shape your destiny
- Challenges are often opportunities in disguise
- Timing matters - align your actions with favorable cosmic weather
- Personal growth is the ultimate gift of any transit

Return to this forecast throughout the year as a reminder of the themes and timing at play. Use it as a tool for reflection, planning, and understanding the larger patterns in your life.

May this year bring you closer to your truest self and your highest potential. The universe is supporting your journey - now it's time to take each step with courage and consciousness.

Wishing you a transformative and blessed year ahead.`,
    },
  ]

  return {
    id: `yearahead-${Date.now()}`,
    slug: 'year-ahead-forecast',
    title: 'Year Ahead Forecast',
    generatedAt: new Date().toISOString(),
    userName,
    birthData: { date: '', time: '', place: '' },
    sections,
    wordCount: sections.reduce((sum, s) => sum + s.content.split(' ').length, 0),
  }
}

export function generateReport(
  slug: ReportSlug,
  chart: NatalChart,
  userName: string,
  partnerChart?: NatalChart,
  partnerName?: string
): GeneratedReport {
  switch (slug) {
    case 'personality-deep-dive':
      return generatePersonalityReport(chart, userName)
    case 'relationship-compatibility':
      if (!partnerChart || !partnerName) {
        throw new Error('Partner chart and name required for relationship report')
      }
      return generateRelationshipReport(chart, partnerChart, userName, partnerName)
    case 'year-ahead-forecast':
      return generateYearAheadReport(chart, userName)
    default:
      throw new Error(`Unknown report type: ${slug}`)
  }
}

/**
 * Sample testimonial data for social proof
 */

export interface Testimonial {
  id: string
  name: string
  location: string
  avatar?: string
  rating: number
  text: string
  highlight?: string
  date: string
  feature?: 'dashboard' | 'reports' | 'calculator' | 'ai' | 'general'
  verified?: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'London, UK',
    rating: 5,
    text: "I've tried so many astrology apps but this one actually explains what's happening RIGHT NOW in my life. The timing predictions have been scarily accurate - it predicted a major career shift that happened exactly when it said it would.",
    highlight: 'The timing predictions have been scarily accurate',
    date: '2 weeks ago',
    feature: 'dashboard',
    verified: true,
  },
  {
    id: '2',
    name: 'James K.',
    location: 'Manchester, UK',
    rating: 5,
    text: "Finally an astrology app that doesn't just give generic horoscopes. The daily insights are personalised to my actual chart and the AI assistant helped me understand my Saturn return in a way that actually made sense.",
    highlight: 'Finally an astrology app that doesn\'t just give generic horoscopes',
    date: '1 week ago',
    feature: 'ai',
    verified: true,
  },
  {
    id: '3',
    name: 'Emma L.',
    location: 'Bristol, UK',
    rating: 5,
    text: 'The Personality Deep Dive report was incredible - 40 pages of insights that felt like someone had known me my whole life. Worth every penny and I\'ve already bought reports for my whole family.',
    highlight: '40 pages of insights that felt like someone had known me my whole life',
    date: '3 days ago',
    feature: 'reports',
    verified: true,
  },
  {
    id: '4',
    name: 'Michael T.',
    location: 'Edinburgh, UK',
    rating: 5,
    text: "I was skeptical about astrology but my girlfriend convinced me to try this. The birth chart breakdown was fascinating and explained so much about my personality. Now I check my daily guidance every morning.",
    highlight: 'Explained so much about my personality',
    date: '1 month ago',
    feature: 'dashboard',
    verified: true,
  },
  {
    id: '5',
    name: 'Priya S.',
    location: 'Birmingham, UK',
    rating: 5,
    text: "The compatibility report for me and my partner was eye-opening. It highlighted our strengths and potential challenges with such accuracy. We've used the insights to improve our communication.",
    highlight: 'Highlighted our strengths and potential challenges with such accuracy',
    date: '2 weeks ago',
    feature: 'reports',
    verified: true,
  },
  {
    id: '6',
    name: 'David R.',
    location: 'Cardiff, UK',
    rating: 5,
    text: 'Love the intensity timeline feature - it shows exactly when challenging periods will ease up. During a difficult time at work, it was reassuring to see the light at the end of the tunnel.',
    highlight: 'Shows exactly when challenging periods will ease up',
    date: '5 days ago',
    feature: 'dashboard',
    verified: true,
  },
  {
    id: '7',
    name: 'Sophie W.',
    location: 'Liverpool, UK',
    rating: 5,
    text: "The Year Ahead forecast has been my roadmap for 2024. Every month it gets more accurate. I've recommended this to all my friends who are into astrology.",
    highlight: 'Every month it gets more accurate',
    date: '3 weeks ago',
    feature: 'reports',
    verified: true,
  },
  {
    id: '8',
    name: 'Tom H.',
    location: 'Leeds, UK',
    rating: 5,
    text: 'The free calculators got me hooked, then I upgraded to Pro and it was absolutely worth it. The AI can explain anything about my chart in seconds. Game changer.',
    highlight: 'The AI can explain anything about my chart in seconds',
    date: '1 week ago',
    feature: 'calculator',
    verified: true,
  },
  {
    id: '9',
    name: 'Rachel N.',
    location: 'Glasgow, UK',
    rating: 5,
    text: "As someone who's studied astrology for years, I'm impressed by the accuracy and depth here. The transit interpretations are on par with professional readings I've paid much more for.",
    highlight: 'On par with professional readings I\'ve paid much more for',
    date: '4 days ago',
    feature: 'dashboard',
    verified: true,
  },
  {
    id: '10',
    name: 'Chris B.',
    location: 'Oxford, UK',
    rating: 5,
    text: "The learning section helped me actually understand my chart instead of just reading interpretations. Now I can explain my placements to friends. The course is really well structured.",
    highlight: 'Helped me actually understand my chart',
    date: '2 weeks ago',
    feature: 'general',
    verified: true,
  },
]

export const stats = {
  totalUsers: 237,
  averageRating: 4.9,
  totalReviews: '50+',
  countriesServed: '12',
  satisfactionRate: '98%',
}

export function getTestimonialsByFeature(feature: Testimonial['feature']): Testimonial[] {
  return testimonials.filter(t => t.feature === feature)
}

export function getRandomTestimonials(count: number): Testimonial[] {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

import type { Suggestion as AISuggestion } from '../types'
import { mockFetchSuggestions } from '../mocks/ai'
import { API_BASE_URL, AI_API_KEY } from '../config'

export interface Suggestion {
  id: number
  title: string
  description: string
}

export interface TripCriteria {
  city: string
  dateMode: 'range' | 'flex'
  startDate: string
  endDate: string
  month: string
  nights: number
  companions: string[]
}

interface SuggestionRecord extends Suggestion {
  city: string
  companions: string[]
  categories: string[]
}

export const SUGGESTIONS: SuggestionRecord[] = [
  {
    id: 1,
    title: 'Museum Visit',
    description: 'Explore the city museum.',
    city: 'Paris',
    companions: ['Solo', 'Partner', 'Family'],
    categories: ['culture'],
  },
  {
    id: 2,
    title: 'Local Cafe',
    description: 'Try coffee at the local cafe.',
    city: 'Paris',
    companions: ['Solo', 'Partner', 'Friends'],
    categories: ['food'],
  },
  {
    id: 3,
    title: 'City Park',
    description: 'Take a walk in the park.',
    city: 'London',
    companions: ['Solo', 'Family', 'Friends'],
    categories: ['nature'],
  },
  {
    id: 4,
    title: 'Sushi Night',
    description: 'Enjoy fresh sushi downtown.',
    city: 'Tokyo',
    companions: ['Solo', 'Partner', 'Friends'],
    categories: ['food'],
  },
]

export async function fetchSuggestions(
  criteria: TripCriteria,
  profile: string[] = [],
): Promise<Suggestion[]> {
  const { city, companions } = criteria
  const filtered = SUGGESTIONS.filter(
    (s) =>
      (!city || s.city.toLowerCase() === city.toLowerCase()) &&
      (companions.length === 0 ||
        s.companions.some((c) => companions.includes(c))),
  )
  if (profile.length > 0) {
    const matches = filtered.filter((s) =>
      s.categories.some((c) => profile.includes(c)),
    )
    const others = filtered.filter(
      (s) => !s.categories.some((c) => profile.includes(c)),
    )
    return [...matches, ...others].map(({ id, title, description }) => ({
      id,
      title,
      description,
    }))
  }
  return filtered.map(({ id, title, description }) => ({ id, title, description }))
}

export async function fetchAISuggestions(
  prompt: string,
): Promise<AISuggestion[]> {
  // TODO: replace mock implementation with real AI API call
  void API_BASE_URL
  void AI_API_KEY
  return mockFetchSuggestions(prompt)
}

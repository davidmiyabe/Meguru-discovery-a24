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
}

const SUGGESTIONS: SuggestionRecord[] = [
  {
    id: 1,
    title: 'Museum Visit',
    description: 'Explore the city museum.',
    city: 'Paris',
    companions: ['Solo', 'Partner', 'Family'],
  },
  {
    id: 2,
    title: 'Local Cafe',
    description: 'Try coffee at the local cafe.',
    city: 'Paris',
    companions: ['Solo', 'Partner', 'Friends'],
  },
  {
    id: 3,
    title: 'City Park',
    description: 'Take a walk in the park.',
    city: 'London',
    companions: ['Solo', 'Family', 'Friends'],
  },
  {
    id: 4,
    title: 'Sushi Night',
    description: 'Enjoy fresh sushi downtown.',
    city: 'Tokyo',
    companions: ['Solo', 'Partner', 'Friends'],
  },
]

export async function fetchSuggestions(
  criteria: TripCriteria,
): Promise<Suggestion[]> {
  const { city, companions } = criteria
  return SUGGESTIONS.filter(
    (s) =>
      (!city || s.city === city) &&
      (companions.length === 0 ||
        s.companions.some((c) => companions.includes(c))),
  ).map(({ id, title, description }) => ({ id, title, description }))
}

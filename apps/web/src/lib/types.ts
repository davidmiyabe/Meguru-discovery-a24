export interface EventItem {
  id: string
  title: string
  start: number
  end: number
  category: string
  position: { x: number; y: number }
  alternates?: EventItem[]
  suggested?: boolean
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

export interface Suggestion {
  id: string
  title: string
  description: string
}

export interface Itinerary {
  id: string
  suggestions: Suggestion[]
}

export interface Trip {
  id: string
  title: string
  description: string
  itinerary: Itinerary
}

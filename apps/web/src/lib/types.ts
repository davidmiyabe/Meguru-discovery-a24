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

export interface Suggestion {
  id: string
  text: string
}

export interface ItineraryDay {
  date: string
  events: EventItem[]
}

export interface Itinerary {
  id: string
  suggestions: Suggestion[]
  days: ItineraryDay[]
}

export interface Collaborator {
  email: string
  permission: 'view' | 'edit'
}

export interface Trip {
  id: string
  title: string
  description: string
  itinerary: Itinerary
  collaborators: Collaborator[]
}

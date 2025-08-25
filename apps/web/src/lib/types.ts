export interface Suggestion {
  id: string;
  text: string;
}

export interface Itinerary {
  id: string;
  suggestions: Suggestion[];
}

export interface Trip {
  id: string;
  itinerary: Itinerary;
}

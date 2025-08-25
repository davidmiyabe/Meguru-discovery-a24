export interface CreateDraftItineraryParams {
  likes: string[]
  adds: string[]
  dates: string[]
  mood: string
}

export interface ItineraryEvent {
  id: string
  name: string
}

export interface ItineraryDay {
  date: string
  events: ItineraryEvent[]
}

export async function createDraftItinerary(
  params: CreateDraftItineraryParams,
): Promise<ItineraryDay[]> {
  const { dates } = params
  // Mock implementation returning simple events for each date
  return dates.map((date, idx) => ({
    date,
    events: [
      { id: `${idx}-1`, name: `Event A on ${date}` },
      { id: `${idx}-2`, name: `Event B on ${date}` },
    ],
  }))
}

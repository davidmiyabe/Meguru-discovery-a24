export interface CreateDraftItineraryParams {
  liked: string[]
  added: string[]
  dates: string[]
  mood: string
}

export interface ItineraryEvent {
  id: string
  title: string
  start: number
  end: number
  category: string
  position: { x: number; y: number }
  alternates?: ItineraryEvent[]
  suggested?: boolean
}

export interface ItineraryDay {
  date: string
  events: ItineraryEvent[]
}

export async function createDraftItinerary(
  params: CreateDraftItineraryParams,
): Promise<ItineraryDay[]> {
  const { dates } = params

  return dates.map((date, idx) => ({
    date,
    events: [
      {
        id: `${idx}-1`,
        title: `Breakfast on ${date}`,
        start: 9 * 60,
        end: 10 * 60,
        category: 'food',
        position: { x: 40, y: 40 },
      },
      {
        id: `${idx}-2`,
        title: `Museum on ${date}`,
        start: 11 * 60,
        end: 12 * 60,
        category: 'culture',
        position: { x: 120, y: 80 },
      },
    ],
  }))
}

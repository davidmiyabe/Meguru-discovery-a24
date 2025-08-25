interface Location {
  id: string
  title: string
  category: 'breakfast' | 'lunch' | 'dinner' | 'activity'
  tags: string[]
  lat: number
  lng: number
}

export interface CreateDraftItineraryParams {
  liked: string[]
  added: string[]
  dates: string[]
  mood: string
  tasteProfile: string[]
  city: string
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

const MOCK_LOCATIONS: Record<string, Location[]> = {
  paris: [
    {
      id: 'cafe-de-flore',
      title: 'Café de Flore',
      category: 'breakfast',
      tags: ['food'],
      lat: 48.8553,
      lng: 2.3332,
    },
    {
      id: 'louvre',
      title: 'Louvre Museum',
      category: 'activity',
      tags: ['art'],
      lat: 48.8606,
      lng: 2.3376,
    },
    {
      id: 'bistro-lunch',
      title: 'Le Bistro',
      category: 'lunch',
      tags: ['food'],
      lat: 48.8625,
      lng: 2.3449,
    },
    {
      id: 'lux-garden',
      title: 'Luxembourg Gardens',
      category: 'activity',
      tags: ['nature'],
      lat: 48.8462,
      lng: 2.3371,
    },
    {
      id: 'seine-dinner',
      title: 'Seine Dinner Cruise',
      category: 'dinner',
      tags: ['food'],
      lat: 48.8584,
      lng: 2.2945,
    },
    {
      id: 'eiffel',
      title: 'Eiffel Tower',
      category: 'activity',
      tags: ['landmark'],
      lat: 48.8584,
      lng: 2.2945,
    },
  ],
}

function getCityLocations(city: string): Location[] {
  return MOCK_LOCATIONS[city.toLowerCase()] || MOCK_LOCATIONS.paris
}

const SPEED_KMPH = 5

function toRad(v: number) {
  return (v * Math.PI) / 180
}

function distance(a: Location, b: Location): number {
  const R = 6371
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
  return 2 * R * Math.asin(Math.sqrt(h))
}

function travelMinutes(a: Location, b: Location): number {
  return Math.round((distance(a, b) / SPEED_KMPH) * 60)
}

function pickNearest(current: Location, list: Location[]): Location | undefined {
  if (list.length === 0) return undefined
  let bestIndex = 0
  let bestDist = distance(current, list[0])
  for (let i = 1; i < list.length; i++) {
    const d = distance(current, list[i])
    if (d < bestDist) {
      bestDist = d
      bestIndex = i
    }
  }
  return list.splice(bestIndex, 1)[0]
}

export async function createDraftItinerary(
  params: CreateDraftItineraryParams,
): Promise<ItineraryDay[]> {
  const { dates, city, tasteProfile } = params
  const cityLocations = getCityLocations(city)

  return dates.map((date) => {
    const breakfasts = cityLocations.filter((l) => l.category === 'breakfast')
    const lunches = cityLocations.filter((l) => l.category === 'lunch')
    const dinners = cityLocations.filter((l) => l.category === 'dinner')
    let activities = cityLocations.filter(
      (l) =>
        l.category === 'activity' &&
        (tasteProfile.length === 0 ||
          l.tags.some((t) => tasteProfile.includes(t))),
    )
    if (activities.length < 2) {
      activities = cityLocations.filter((l) => l.category === 'activity')
    }

    const events: ItineraryEvent[] = []
    let time = 8 * 60

    const addEvent = (loc: Location, duration: number) => {
      events.push({
        id: loc.id,
        title: loc.title,
        start: time,
        end: time + duration,
        category: loc.category === 'activity' ? loc.tags[0] || 'activity' : 'food',
        position: { x: loc.lng, y: loc.lat },
      })
      time += duration
    }

    const breakfast = breakfasts.shift()
    if (breakfast) {
      addEvent(breakfast, 60)
    }

    let current = breakfast
    const firstAct = current ? pickNearest(current, activities) : activities.shift()
    if (firstAct) {
      if (current) time += travelMinutes(current, firstAct)
      current = firstAct
      addEvent(firstAct, 120)
    }

    const lunch = current ? pickNearest(current, lunches) : lunches.shift()
    if (lunch) {
      if (current) time += travelMinutes(current, lunch)
      current = lunch
      addEvent(lunch, 60)
    }

    const secondAct = current ? pickNearest(current, activities) : activities.shift()
    if (secondAct) {
      if (current) time += travelMinutes(current, secondAct)
      current = secondAct
      addEvent(secondAct, 120)
    }

    const dinner = current ? pickNearest(current, dinners) : dinners.shift()
    if (dinner) {
      if (current) time += travelMinutes(current, dinner)
      current = dinner
      addEvent(dinner, 90)
    }

    return { date, events }
  })
}


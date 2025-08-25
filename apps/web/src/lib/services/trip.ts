import type { Trip } from '../types'

export async function saveTrip(trip: Trip): Promise<void> {
  // mock API call, resolves after short delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('Trip saved', trip)
}

export function getTrip(id: string): Trip {
  // mock fetch of trip
  return {
    id,
    title: `Trip ${id}`,
    description: 'A wonderful journey awaits you.',
    itinerary: { id: `itinerary-${id}`, suggestions: [] },
  }
}

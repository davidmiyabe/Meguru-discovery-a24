import type { Trip } from '../types'
import { mockGetTrips, mockSaveTrip } from '../mocks/storage'
import { STORAGE_ENDPOINT } from '../config'

export async function getTrips(): Promise<Trip[]> {
  // TODO: replace mock implementation with real storage API call
  void STORAGE_ENDPOINT
  return mockGetTrips()
}

export async function saveTrip(trip: Trip): Promise<Trip> {
  // TODO: replace mock implementation with real storage API call
  return mockSaveTrip(trip)
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

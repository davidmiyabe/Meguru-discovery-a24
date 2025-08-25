import type { Trip, Collaborator } from '../types'
import { initialEvents } from '../../data'
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

const collaboratorsStore: Record<string, Collaborator[]> = {}

export async function sendInvite(
  tripId: string,
  email: string,
  permission: Collaborator['permission'],
) {
  const collabs = collaboratorsStore[tripId] ?? []
  collabs.push({ email, permission })
  collaboratorsStore[tripId] = collabs
  return { success: true }
}

export function removeCollaborator(tripId: string, email: string) {
  const collabs = collaboratorsStore[tripId] ?? []
  collaboratorsStore[tripId] = collabs.filter((c) => c.email !== email)
}

export function getTrip(id: string): Trip {
  // mock fetch of trip
  return {
    id,
    title: `Trip ${id}`,
    description: 'A wonderful journey awaits you.',
    itinerary: {
      id: `itinerary-${id}`,
      suggestions: [],
      days: [
        { date: '2025-01-01', events: initialEvents },
      ],
    },
    collaborators: collaboratorsStore[id] ?? [],
  }
}

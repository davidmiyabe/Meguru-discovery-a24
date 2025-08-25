import type { Trip } from '../types';
import { initialEvents } from '../../data';

const trips: Trip[] = [
  {
    id: 't1',
    title: 'Sample Trip',
    description: 'Mock trip description',
    itinerary: {
      id: 'i1',
      suggestions: [{ id: 's1', text: 'Mock trip suggestion' }],
      days: [
        { date: '2025-01-01', events: initialEvents },
      ],
    },
  },
];

export async function mockGetTrips(): Promise<Trip[]> {
  return trips;
}

export async function mockSaveTrip(trip: Trip): Promise<Trip> {
  trips.push(trip);
  return trip;
}

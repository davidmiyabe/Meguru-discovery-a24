import type { Trip } from '../types';

const trips: Trip[] = [
  {
    id: 't1',
    itinerary: {
      id: 'i1',
      suggestions: [
        { id: 's1', text: 'Mock trip suggestion' },
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

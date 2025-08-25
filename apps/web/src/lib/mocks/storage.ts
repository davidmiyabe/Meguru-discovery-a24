import type { Trip } from '../types';

const trips: Trip[] = [
  {
    id: 't1',
    title: 'Sample Trip',
    description: 'Mock trip description',
    itinerary: {
      id: 'i1',
      suggestions: [
        {
          id: 's1',
          title: 'Mock trip suggestion',
          description: 'Description for mock trip suggestion',
        },
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

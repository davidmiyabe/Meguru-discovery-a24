import type { Trip } from '../lib/types';
import { getTrip } from '../lib/services/trip';

const myTrips: Trip[] = [getTrip('1'), getTrip('2'), getTrip('3')];
const suggestedTrips: Trip[] = [getTrip('4'), getTrip('5'), getTrip('6')];

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-8">
      <div
        className="rounded-lg shadow-sm bg-cover bg-center h-32 flex items-center justify-center"
        style={{ backgroundImage: "url('https://picsum.photos/seed/profile/800/200')" }}
      >
        <h1 className="text-2xl font-bold text-[#f5f5dc] bg-black/40 px-4 py-2 rounded">
          Traveler and adventurer
        </h1>
      </div>
      <section>
        <h2 className="text-lg font-bold mb-4">My Trips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myTrips.map((t) => (
            <div
              key={t.id}
              className="relative overflow-hidden rounded-lg shadow-sm border border-border"
            >
              <img
                src={`https://picsum.photos/seed/mytrip-${t.id}/400/300`}
                alt={t.title}
                className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <div className="p-4 space-y-1 text-[#f5f5dc]">
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  <p className="text-sm">{t.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-bold mb-4">Suggested Trips</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-6">
            {suggestedTrips.map((t) => (
              <div
                key={t.id}
                className="relative overflow-hidden rounded-lg shadow-sm border border-border min-w-[250px]"
              >
                <img
                  src={`https://picsum.photos/seed/suggested-${t.id}/400/300`}
                  alt={t.title}
                  className="h-40 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end">
                  <div className="p-4 space-y-1 text-[#f5f5dc]">
                    <h3 className="text-lg font-semibold">{t.title}</h3>
                    <p className="text-sm">{t.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

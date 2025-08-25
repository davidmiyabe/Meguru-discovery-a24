import type { Trip } from '../lib/types';
import { getTrip } from '../lib/services/trip';

const myTrips: Trip[] = [getTrip('1'), getTrip('2'), getTrip('3')];
const suggestedTrips: Trip[] = [getTrip('4'), getTrip('5'), getTrip('6')];

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-6 fade-in">
      <div className="flex items-center space-x-4">
        <img
          src="https://i.pravatar.cc/100"
          alt="avatar"
          className="rounded-full w-24 h-24"
        />
        <p>Traveler and adventurer.</p>
      </div>
      <section>
        <h2 className="text-lg font-display text-gold mb-2">My Trips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myTrips.map((t) => (
            <div key={t.id} className="p-2 rounded bg-night text-cream fade-in">
              <h3 className="font-display text-gold">{t.title}</h3>
              <p className="text-sm">{t.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-display text-gold mb-2">Suggested Trips</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {suggestedTrips.map((t) => (
              <div key={t.id} className="p-2 rounded min-w-[200px] bg-night text-cream fade-in">
                <h3 className="font-display text-gold">{t.title}</h3>
                <p className="text-sm">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

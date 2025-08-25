import { useParams } from 'react-router-dom';
import { getTrip } from '../lib/services/trip';
import { TripDraft } from '../components/TripDraft';

export default function TripPage() {
  const { id } = useParams<{ id: string }>();
  const trip = getTrip(id ?? '');

  return (
    <div className="p-4 space-y-4">
      <TripDraft trip={trip} days={trip.itinerary.days} readOnly />
      <div>
        <p className="font-semibold">Shareable link:</p>
        <input
          type="text"
          readOnly
          value={window.location.href}
          className="w-full border p-2"
        />
      </div>
    </div>
  );
}

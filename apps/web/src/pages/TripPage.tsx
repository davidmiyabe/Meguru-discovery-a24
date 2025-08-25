import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrip, removeCollaborator } from '../lib/services/trip';
import { TripDraft } from '../components/TripDraft';
import InviteCollaboratorsModal from '../components/InviteCollaboratorsModal';

export default function TripPage() {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState(() => getTrip(id ?? ''));
  const [inviteOpen, setInviteOpen] = useState(false);

  const refresh = () => setTrip(getTrip(trip.id));

  const handleRemove = (email: string) => {
    removeCollaborator(trip.id, email);
    refresh();
  };

  return (
    <div className="p-4 space-y-4">
      <TripDraft
        trip={trip}
        days={trip.itinerary.days}
        readOnly
        onInvite={() => setInviteOpen(true)}
        onRemoveCollaborator={handleRemove}
      />
      <div>
        <p className="font-semibold">Shareable link:</p>
        <input
          type="text"
          readOnly
          value={window.location.href}
          className="w-full p-2 bg-night text-cream"
        />
      </div>
      <InviteCollaboratorsModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
        tripId={trip.id}
        onInvited={refresh}
      />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { getTrip, saveTrip } from '../lib/services/trip';
import { TripDraft } from '../components/TripDraft';
import { useToast } from '../components/ToastProvider';

export default function DraftPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const trip = getTrip('draft');

  const handleSave = async () => {
    await saveTrip(trip);
    toast('Trip saved');
    navigate('/profile');
  };

  return (
    <div className="p-4">
      <TripDraft trip={trip} onSave={handleSave} />
    </div>
  );
}

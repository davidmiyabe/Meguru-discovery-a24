import type { Trip } from '../lib/types';

interface Props {
  trip: Trip;
  readOnly?: boolean;
  onSave?: () => void;
}

export function TripDraft({ trip, readOnly, onSave }: Props) {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{trip.title}</h2>
      <p className="mt-2">{trip.description}</p>
      {!readOnly && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onSave}
        >
          Save Trip
        </button>
      )}
    </div>
  );
}

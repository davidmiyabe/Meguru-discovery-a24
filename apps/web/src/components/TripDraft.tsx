import Calendar from './Calendar';
import type { Trip, ItineraryDay } from '../lib/types';

interface Props {
  trip: Trip;
  days: ItineraryDay[];
  readOnly?: boolean;
  onSave?: () => void;
}

export function TripDraft({ trip, days, readOnly, onSave }: Props) {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{trip.title}</h2>
      <p className="mt-2">{trip.description}</p>
      <div className="mt-4 space-y-4">
        {days.map((day) => (
          <div key={day.date} className="space-y-2">
            <h3 className="font-semibold">{day.date}</h3>
            <Calendar
              events={day.events}
              setEvents={() => {}}
              onReplace={() => {}}
              readOnly
            />
          </div>
        ))}
      </div>
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

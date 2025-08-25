import Calendar from './Calendar';
import type { Trip, ItineraryDay } from '../lib/types';

interface Props {
  trip: Trip;
  days: ItineraryDay[];
  readOnly?: boolean;
  onSave?: () => void;
  onInvite?: () => void;
  onRemoveCollaborator?: (email: string) => void;
}

export function TripDraft({ trip, days, readOnly, onSave, onInvite, onRemoveCollaborator }: Props) {
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
      <div className="mt-4">
        <h3 className="font-semibold">Collaborators</h3>
        {trip.collaborators.length === 0 ? (
          <p className="text-sm text-gray-600">No collaborators yet</p>
        ) : (
          <ul className="list-disc pl-4 space-y-1">
            {trip.collaborators.map((c) => (
              <li key={c.email} className="flex items-center gap-2">
                <span>
                  {c.email} ({c.permission})
                </span>
                {onRemoveCollaborator && (
                  <button
                    className="text-red-600"
                    onClick={() => onRemoveCollaborator(c.email)}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        {onInvite && (
          <button
            className="mt-2 px-2 py-1 border rounded"
            onClick={onInvite}
          >
            Invite More
          </button>
        )}
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

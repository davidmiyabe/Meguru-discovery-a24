import Calendar from './Calendar';
import type { Trip, ItineraryDay } from '../lib/types';
import { Button } from './ui';

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
    <div className="p-4 rounded bg-night text-cream fade-in">
      <h2 className="text-xl font-display text-gold">{trip.title}</h2>
      <p className="mt-2">{trip.description}</p>
      <div className="mt-4 space-y-4">
        {days.map((day) => (
          <div key={day.date} className="space-y-2">
            <h3 className="font-display text-gold">{day.date}</h3>
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
        <Button onClick={onSave} className="mt-4" type="button">
          Save Trip
        </Button>
      )}
    </div>
  );
}

import React from 'react'
import type { EventItem } from '../lib/types'

interface EventDetailProps {
  event: EventItem
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  return (
    <div className="event-detail">
      <h2>{event.title}</h2>
      <p>
        <strong>Category:</strong> {event.category}
      </p>
      <p>
        <strong>Time:</strong> {event.start / 60}:00 - {event.end / 60}:00
      </p>
      {event.alternates && event.alternates.length > 0 && (
        <div>
          <h3>Similar Suggestions</h3>
          <ul>
            {event.alternates.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default EventDetail

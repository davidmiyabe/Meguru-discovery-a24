import React from 'react'

interface EventDetailProps {
  description: string
  location: string
  contact: string
  duration: string
  suggestions: string[]
}

const EventDetail: React.FC<EventDetailProps> = ({
  description,
  location,
  contact,
  duration,
  suggestions,
}) => {
  return (
    <div className="event-detail">
      <h2>Event Details</h2>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Contact:</strong> {contact}
      </p>
      <p>
        <strong>Duration:</strong> {duration}
      </p>
      {suggestions.length > 0 && (
        <div>
          <h3>Similar Suggestions</h3>
          <ul>
            {suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default EventDetail

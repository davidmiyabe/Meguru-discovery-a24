import { useEffect, useState } from 'react'
import { createDraftItinerary } from '../lib/api'
import { useItineraryStore } from '../stores/itineraryStore'

export default function Draft() {
  const { days, setDays, lockDay } = useItineraryStore()
  const [tab, setTab] = useState<'calendar' | 'list' | 'map'>('calendar')

  useEffect(() => {
    async function load() {
      if (days.length === 0) {
        const data = await createDraftItinerary({
          likes: [],
          adds: [],
          dates: ['2025-01-01', '2025-01-02'],
          mood: 'chill',
        })
        setDays(data)
      }
    }
    load()
  }, [days, setDays])

  const handleShuffle = async () => {
    const current = useItineraryStore.getState().days
    const data = await createDraftItinerary({
      likes: [],
      adds: [],
      dates: current.map((d) => d.date),
      mood: 'chill',
    })
    const merged = current.map((d, i) => (d.locked ? d : data[i]))
    setDays(merged)
  }

  const handleSave = () => {
    // Placeholder for save logic
    console.log('Saving trip', days)
  }

  return (
    <div>
      <div>
        <button onClick={() => setTab('calendar')}>Calendar</button>
        <button onClick={() => setTab('list')}>List</button>
        <button onClick={() => setTab('map')}>Map</button>
      </div>

      {tab === 'calendar' && <div>Calendar View</div>}
      {tab === 'map' && <div>Map View</div>}
      {tab === 'list' && (
        <div>
          {days.map((day, idx) => (
            <div key={day.date}>
              <h3>{day.date}</h3>
              <ul>
                {day.events.map((ev) => (
                  <li key={ev.id}>{ev.name}</li>
                ))}
              </ul>
              <button disabled={day.locked} onClick={() => lockDay(idx)}>
                {day.locked ? 'Accepted' : 'Accept Day'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <button onClick={handleShuffle}>Magic Shuffle</button>
        <button onClick={handleSave}>Save Trip</button>
      </div>
    </div>
  )
}

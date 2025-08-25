import { useEffect, useState } from 'react'
import { createDraftItinerary } from '../lib/api'
import { useItineraryStore } from '../stores/itineraryStore'
import Calendar from '../components/Calendar'
import EventList from '../components/EventList'
import MapView from '../components/MapView'
import type { EventItem } from '../types'
import { suggestionEvents } from '../data'

export default function Draft() {
  const { days, setDays, lockDay } = useItineraryStore()
  const [tab, setTab] = useState<'calendar' | 'list' | 'map'>('calendar')
  const [currentDay] = useState(0)
  const [suggestions, setSuggestions] = useState<EventItem[]>(suggestionEvents)

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

  const current = days[currentDay]
  const currentEvents = (current?.events as EventItem[]) ?? []

  const setEvents = (events: EventItem[]) => {
    setDays(
      days.map((d, i) =>
        i === currentDay ? { ...d, events: events as unknown as typeof d.events } : d,
      ),
    )
  }

  const onReplace = (id: string, alt: EventItem) => {
    setEvents(
      currentEvents.map((e) =>
        e.id === id ? { ...alt, alternates: e.alternates } : e,
      ),
    )
  }

  const onAdd = (e: EventItem) => {
    setEvents([...currentEvents, e])
    setSuggestions((sugs) => sugs.filter((s) => s.id !== e.id))
  }

  const handleShuffle = async () => {
    const currentDays = useItineraryStore.getState().days
    const data = await createDraftItinerary({
      likes: [],
      adds: [],
      dates: currentDays.map((d) => d.date),
      mood: 'chill',
    })
    const merged = currentDays.map((d, i) => (d.locked ? d : data[i]))
    setDays(merged)
  }

  const handleSave = () => {
    console.log('Saving trip', days)
  }

  return (
    <div>
      <div>
        <button onClick={() => setTab('calendar')}>Calendar</button>
        <button onClick={() => setTab('list')}>List</button>
        <button onClick={() => setTab('map')}>Map</button>
      </div>

      {tab === 'calendar' && (
        <Calendar events={currentEvents} setEvents={setEvents} onReplace={onReplace} />
      )}
      {tab === 'map' && (
        <MapView
          events={currentEvents}
          suggestions={suggestions}
          onAdd={onAdd}
          onReplace={onReplace}
        />
      )}
      {tab === 'list' && (
        <EventList events={currentEvents} onReplace={onReplace} />
      )}

      {current && (
        <div>
          <button disabled={current.locked} onClick={() => lockDay(currentDay)}>
            {current.locked ? 'Accepted' : 'Accept Day'}
          </button>
        </div>
      )}

      <div>
        <button onClick={handleShuffle}>Magic Shuffle</button>
        <button onClick={handleSave}>Save Trip</button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import Calendar from './components/Calendar'
import EventList from './components/EventList'
import MapView from './components/MapView'
import { initialEvents, suggestionEvents } from './data'
import type { EventItem } from './types'

function App() {
  const [events, setEvents] = useState<EventItem[]>(initialEvents)
  const [suggestions, setSuggestions] = useState<EventItem[]>(suggestionEvents)

  const replaceEvent = (id: string, alt: EventItem) => {
    setEvents((evts) => evts.map((e) => (e.id === id ? { ...alt, alternates: e.alternates } : e)))
  }

  const addEvent = (e: EventItem) => {
    setEvents((evts) => [...evts, e])
    setSuggestions((sugs) => sugs.filter((s) => s.id !== e.id))
  }

  return (
    <div className="flex gap-4 p-4 text-sm">
      <Calendar events={events} setEvents={setEvents} onReplace={replaceEvent} />
      <EventList events={events} onReplace={replaceEvent} />
      <MapView events={events} suggestions={suggestions} onAdd={addEvent} onReplace={replaceEvent} />
    </div>
  )
}

export default App

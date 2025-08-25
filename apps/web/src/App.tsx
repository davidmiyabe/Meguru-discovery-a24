import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import EventDetail from './components/EventDetail'
import InviteCollaboratorsModal from './components/InviteCollaboratorsModal'
import { createDraftItinerary } from './api'
import Calendar from './components/Calendar'
import EventList from './components/EventList'
import MapView from './components/MapView'
import { initialEvents, suggestionEvents } from './data'
import type { EventItem } from './types'
import DraftPage from './pages/DraftPage';
import ProfilePage from './pages/ProfilePage';
import TripPage from './pages/TripPage';
import './App.css'
import { useTrips } from './lib/queries'
function App() {
  const [currentDay, setCurrentDay] = useState(1)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [events, setEvents] = useState<EventItem[]>(initialEvents)
  const [suggestions, setSuggestions] = useState<EventItem[]>(suggestionEvents)

  const replaceEvent = (id: string, alt: EventItem) => {
    setEvents((evts) => evts.map((e) => (e.id === id ? { ...alt, alternates: e.alternates } : e)))
  }

  const addEvent = (e: EventItem) => {
    setEvents((evts) => [...evts, e])
    setSuggestions((sugs) => sugs.filter((s) => s.id !== e.id))
  }
  const event = {
    description: 'Visit the art museum',
    location: 'Downtown Museum',
    contact: 'info@museum.com',
    duration: '2 hours',
    suggestions: ['City Gallery', 'Historical Tour'],
  }

  const handleOptimize = () => {
    createDraftItinerary(currentDay)
  }
  const [count, setCount] = useState(0)
  const { data: trips } = useTrips()

  return (
    <>
      <label>
        Day:
        <input
          type="number"
          value={currentDay}
          onChange={(e) => setCurrentDay(Number(e.target.value))}
        />
      </label>
      <Routes>
      <Route path="/" element={<DraftPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/trip/:id" element={<TripPage />} />
      </Routes>
      <EventDetail {...event} />
      <button onClick={handleOptimize}>AI optimize</button>
      <button onClick={() => setInviteOpen(true)}>Invite collaborators</button>
      <InviteCollaboratorsModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  )
}

function Home() {
  const [count, setCount] = useState(0)
  return (
    <div className="flex gap-4 p-4 text-sm">
      <Calendar events={events} setEvents={setEvents} onReplace={replaceEvent} />
      <EventList events={events} onReplace={replaceEvent} />
      <MapView events={events} suggestions={suggestions} onAdd={addEvent} onReplace={replaceEvent} />
    </div>

    
export default App;

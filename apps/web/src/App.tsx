import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Start from './routes/start'
import Discover from './routes/discover'
import Draft from './routes/draft'
import ProfilePage from './pages/ProfilePage'
import TripPage from './pages/TripPage'
import { useState } from 'react'
import EventDetail from './components/EventDetail'
import InviteCollaboratorsModal from './components/InviteCollaboratorsModal'
import { createDraftItinerary } from './lib/api'
import Calendar from './components/Calendar'
import EventList from './components/EventList'
import MapView from './components/MapView'
import { initialEvents, suggestionEvents } from './data'
import type { EventItem } from './lib/types'
import DraftPage from './pages/DraftPage'
import ProfilePage from './pages/ProfilePage'
import TripPage from './pages/TripPage'
import './App.css'
import { useTrips } from './lib/queries'

export default function App() {
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
    createDraftItinerary({ likes: [], adds: [], dates: [], mood: 'chill' })
  }
  const [count, setCount] = useState(0)
  const { data: trips } = useTrips()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/draft" element={<Draft />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trip/:id" element={<TripPage />} />
      </Routes>
    </BrowserRouter>
  )
}

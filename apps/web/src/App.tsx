import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Start from './routes/start'
import Discover from './routes/discover'
import Draft from './routes/draft'
import { useState } from 'react'
import EventDetail from './components/EventDetail'
import InviteCollaboratorsModal from './components/InviteCollaboratorsModal'
import { createDraftItinerary } from './api/itinerary'
import Calendar from './components/Calendar'
import EventList from './components/EventList'
import MapView from './components/MapView'
import { initialEvents, suggestionEvents } from './data'
import type { EventItem } from './types'
import DraftPage from './pages/DraftPage';
import ProfilePage from './pages/ProfilePage';
import TripPage from './pages/TripPage';
import './App.css'

export default function App() {
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

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Start from './routes/start'
import Discover from './routes/discover'
import Draft from './routes/draft'
import ProfilePage from './pages/ProfilePage'
import TripPage from './pages/TripPage'

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

import { Routes, Route, Navigate } from 'react-router-dom'
import Start from './routes/start'
import Discover from './routes/discover'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/start" replace />} />
      <Route path="/start" element={<Start />} />
      <Route path="/discover" element={<Discover />} />
    </Routes>
  )
}

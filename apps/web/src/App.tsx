import { useState } from 'react'
import EventDetail from './components/EventDetail'
import InviteCollaboratorsModal from './components/InviteCollaboratorsModal'
import { createDraftItinerary } from './api'
import './App.css'

function App() {
  const [currentDay, setCurrentDay] = useState(1)
  const [inviteOpen, setInviteOpen] = useState(false)

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

export default App

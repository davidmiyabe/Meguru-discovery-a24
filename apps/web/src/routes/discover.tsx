import { useEffect, useState } from 'react'
import {
  fetchSuggestions,
  type Suggestion,
  type TripCriteria,
} from '../lib/services/suggestions'
import { useItineraryStore } from '../stores/itineraryStore'
import { Button, Card } from '../components/ui'
import { MIN_LIKES, MIN_ADDS } from '../lib/constants'
import { createDraftItinerary } from '../lib/services/itinerary'
import { useNavigate, useLocation } from 'react-router-dom'
export default function Discover() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [index, setIndex] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)
  const { addLike, addAdd, likes, adds, setDays } = useItineraryStore()
  const navigate = useNavigate()
  const location = useLocation()
  const criteria = (location.state || {}) as TripCriteria

  useEffect(() => {
    fetchSuggestions(criteria).then(setSuggestions)
  }, [criteria])

  const current = suggestions[index]
  const next = () => setIndex((i) => i + 1)

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.changedTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX === null) return
    const diff = e.changedTouches[0].clientX - startX
    if (diff > 50) {
      addLike()
      next()
    } else if (diff < -50) {
      next()
    }
    setStartX(null)
  }

  const handleAdd = () => {
    addAdd()
    next()
  }

  const canBuild = likes >= MIN_LIKES || adds >= MIN_ADDS
  const buildItinerary = async () => {
    const days = await createDraftItinerary({
      likes,
      adds,
      dates: ['2025-01-01', '2025-01-02'],
      mood: 'chill',
    })
    setDays(days)
    setIndex(0)
    navigate('/draft')
  }

  return (
    <div className='p-4 space-y-4'>
      {current ? (
        <Card
          elevated
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <h2 className='text-lg font-display text-gold'>{current.title}</h2>
          <p className='mt-2'>{current.description}</p>
          <Button className='mt-4' onClick={handleAdd}>
            Add to Itinerary
          </Button>
        </Card>
      ) : (
        <p>No more suggestions</p>
      )}
      <Button
        className='mt-6 disabled:opacity-50'
        disabled={!canBuild}
        onClick={buildItinerary}
      >
        Build Itinerary
      </Button>
    </div>
  )
}

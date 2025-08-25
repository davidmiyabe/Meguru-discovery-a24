import { useEffect, useState } from 'react'
import {
  fetchSuggestions,
  type Suggestion,
  type TripCriteria,
} from '../lib/services/suggestions'
import { useItineraryStore, useLikes, useAdds } from '../stores/itineraryStore'
import { Button, Card } from '../components/ui'
import { MIN_LIKES, MIN_ADDS } from '../lib/constants'
import { createDraftItinerary } from '../lib/services/itinerary'
import { useNavigate, useLocation } from 'react-router-dom'
export default function Discover() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [index, setIndex] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)
  const { addLike, addAdd, liked, added, setDays } = useItineraryStore()
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
    if (startX === null || !current) return
    const diff = e.changedTouches[0].clientX - startX
    if (diff > 50) {
      addLike(String(current.id))
      next()
    } else if (diff < -50) {
      next()
    }
    setStartX(null)
  }

  const handleAdd = () => {
    if (!current) return
    addAdd(String(current.id))
    next()
  }

  const canBuild = liked.length >= MIN_LIKES || added.length >= MIN_ADDS
  const buildItinerary = async () => {
    const dates: string[] = []
    if (criteria.dateMode === 'range') {
      const start = new Date(criteria.startDate)
      const end = new Date(criteria.endDate)
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(d.toISOString().split('T')[0])
      }
    } else {
      const start = new Date(`${criteria.month}-01`)
      for (let i = 0; i < criteria.nights; i++) {
        const d = new Date(start)
        d.setDate(start.getDate() + i)
        dates.push(d.toISOString().split('T')[0])
      }
    }
    const mood = 'chill'
    const days = await createDraftItinerary({
      liked,
      added,
      dates,
      mood,
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
          <Button variant='primary' className='mt-4' onClick={handleAdd}>
            Add to Itinerary
          </Button>
        </Card>
      ) : (
        <p>No more suggestions</p>
      )}
      <Button
        variant='primary'
        className='mt-6 disabled:opacity-50'
        disabled={!canBuild}
        onClick={buildItinerary}
      >
        Build Itinerary
      </Button>
    </div>
  )
}

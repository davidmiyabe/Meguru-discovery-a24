import { useEffect, useState } from 'react'
import { fetchSuggestions, type Suggestion } from '../api/suggestions'
import { useItineraryStore } from '../stores/itineraryStore'

export default function Discover() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [index, setIndex] = useState(0)
  const [startX, setStartX] = useState<number | null>(null)
  const { addLike, addAdd, likes, adds } = useItineraryStore()

  useEffect(() => {
    fetchSuggestions({}).then(setSuggestions)
  }, [])

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

  const canBuild = likes >= 5 || adds >= 3

  return (
    <div className='p-4'>
      {current ? (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className='border p-4 rounded'
        >
          <h2 className='text-lg font-bold'>{current.title}</h2>
          <p className='mt-2'>{current.description}</p>
          <button
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
            onClick={handleAdd}
          >
            Add to Itinerary
          </button>
        </div>
      ) : (
        <p>No more suggestions</p>
      )}
      <button
        className='mt-6 px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50'
        disabled={!canBuild}
      >
        Build Itinerary
      </button>
    </div>
  )
}

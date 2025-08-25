import { useEffect, useState } from 'react'
import { createDraftItinerary } from '../lib/api'
import { useItineraryStore } from '../stores/itineraryStore'
import { Button, Card } from '../components/ui'

export default function Draft() {
  const { days, setDays, lockDay } = useItineraryStore()
  const [tab, setTab] = useState<'calendar' | 'list' | 'map'>('calendar')

  useEffect(() => {
    async function load() {
      if (days.length === 0) {
        const data = await createDraftItinerary({
          likes: [],
          adds: [],
          dates: ['2025-01-01', '2025-01-02'],
          mood: 'chill',
        })
        setDays(data)
      }
    }
    load()
  }, [days, setDays])

  const handleShuffle = async () => {
    const current = useItineraryStore.getState().days
    const data = await createDraftItinerary({
      likes: [],
      adds: [],
      dates: current.map((d) => d.date),
      mood: 'chill',
    })
    const merged = current.map((d, i) => (d.locked ? d : data[i]))
    setDays(merged)
  }

  const handleSave = () => {
    // Placeholder for save logic
    console.log('Saving trip', days)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <Button variant={tab === 'calendar' ? 'primary' : 'outline'} onClick={() => setTab('calendar')}>
          Calendar
        </Button>
        <Button variant={tab === 'list' ? 'primary' : 'outline'} onClick={() => setTab('list')}>
          List
        </Button>
        <Button variant={tab === 'map' ? 'primary' : 'outline'} onClick={() => setTab('map')}>
          Map
        </Button>
      </div>

      {tab === 'calendar' && <div>Calendar View</div>}
      {tab === 'map' && <div>Map View</div>}
      {tab === 'list' && (
        <div className="space-y-4">
          {days.map((day, idx) => (
            <Card key={day.date} className="space-y-2">
              <h3 className="font-display text-gold">{day.date}</h3>
              <ul className="list-disc pl-4">
                {day.events.map((ev) => (
                  <li key={ev.id}>{ev.name}</li>
                ))}
              </ul>
              <Button
                variant="outline"
                disabled={day.locked}
                onClick={() => lockDay(idx)}
              >
                {day.locked ? 'Accepted' : 'Accept Day'}
              </Button>
            </Card>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={handleShuffle}>Magic Shuffle</Button>
        <Button variant="outline" onClick={handleSave}>
          Save Trip
        </Button>
      </div>
    </div>
  )
}

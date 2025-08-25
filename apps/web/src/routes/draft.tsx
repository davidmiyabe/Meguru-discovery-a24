import { useEffect, useState } from 'react'
import { createDraftItinerary } from '../lib/services/itinerary'
import { useItineraryStore } from '../stores/itineraryStore'
import { Button, Card, Sheet } from '../components/ui'
import Calendar from '../components/Calendar'
import EventList from '../components/EventList'
import MapView from '../components/MapView'
import EventDetail from '../components/EventDetail'
import InviteCollaboratorsModal from '../components/InviteCollaboratorsModal'
import type { EventItem } from '../lib/types'
import { suggestionEvents } from '../data'

export default function Draft() {
  const { days, setDays, lockDay } = useItineraryStore()
  const [tab, setTab] = useState<'calendar' | 'list' | 'map'>('calendar')
  const [currentDay] = useState(0)
  const [suggestions, setSuggestions] = useState<EventItem[]>(suggestionEvents)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [inviteOpen, setInviteOpen] = useState(false)

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

  const current = days[currentDay]
  const currentEvents = (current?.events as EventItem[]) ?? []

  const setEvents = (events: EventItem[]) => {
    setDays(
      days.map((d, i) =>
        i === currentDay ? { ...d, events: events as unknown as typeof d.events } : d,
      ),
    )
  }

  const onReplace = (id: string, alt: EventItem) => {
    setEvents(
      currentEvents.map((e) =>
        e.id === id ? { ...alt, alternates: e.alternates } : e,
      ),
    )
  }

  const onAdd = (e: EventItem) => {
    setEvents([...currentEvents, e])
    setSuggestions((sugs) => sugs.filter((s) => s.id !== e.id))
  }

  const handleShuffle = async () => {
    const currentDays = useItineraryStore.getState().days
    const data = await createDraftItinerary({
      likes: [],
      adds: [],
      dates: currentDays.map((d) => d.date),
      mood: 'chill',
    })
    const merged = currentDays.map((d, i) => (d.locked ? d : data[i]))
    setDays(merged)
  }

  const handleSave = () => {
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

      {tab === 'calendar' && (
        <Calendar
          events={currentEvents}
          setEvents={setEvents}
          onReplace={onReplace}
          onSelect={setSelectedEvent}
        />
      )}
      {tab === 'map' && (
        <MapView
          events={currentEvents}
          suggestions={suggestions}
          onAdd={onAdd}
          onReplace={onReplace}
          onSelect={setSelectedEvent}
        />
      )}
      {tab === 'list' && (
        <>
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
          <EventList
            events={currentEvents}
            onReplace={onReplace}
            onSelect={setSelectedEvent}
          />
        </>
      )}

      <div className="flex gap-2">
        <Button onClick={handleShuffle}>Magic Shuffle</Button>
        <Button variant="outline" onClick={handleSave}>
          Save Trip
        </Button>
        <Button variant="outline" onClick={() => setInviteOpen(true)}>
          Invite
        </Button>
      </div>

      {selectedEvent && (
        <Sheet open className="p-4 space-y-2">
          <EventDetail event={selectedEvent} />
          <Button variant="outline" onClick={() => setSelectedEvent(null)}>
            Close
          </Button>
        </Sheet>
      )}
      <InviteCollaboratorsModal
        isOpen={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </div>
  )
}

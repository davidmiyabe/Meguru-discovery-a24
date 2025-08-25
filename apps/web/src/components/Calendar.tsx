import { useState } from 'react'
import type { EventItem } from '../lib/types'
import { useLongPress } from '../hooks/useLongPress'

interface Props {
  events: EventItem[]
  setEvents: (events: EventItem[]) => void
  onReplace: (id: string, alt: EventItem) => void
  onSelect?: (e: EventItem) => void
}

export default function Calendar({ events, setEvents, onReplace, onSelect }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)

  const conflicts = new Set<string>()
  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const a = events[i]
      const b = events[j]
      if (a.start < b.end && b.start < a.end) {
        conflicts.add(a.id)
        conflicts.add(b.id)
      }
    }
  }

  const handleDragStart = (id: string) => setDragId(id)
  const handleDrop = (id: string) => {
    if (!dragId) return
    const oldIndex = events.findIndex((e) => e.id === dragId)
    const newIndex = events.findIndex((e) => e.id === id)
    const newEvents = [...events]
    const [moved] = newEvents.splice(oldIndex, 1)
    newEvents.splice(newIndex, 0, moved)
    setEvents(newEvents)
    setDragId(null)
  }

  return (
    <div className="w-64 border p-2">
      <h2 className="font-bold mb-2">Calendar</h2>
      {events.map((e) => (
        <EventRow
          key={e.id}
          event={e}
          conflict={conflicts.has(e.id)}
          activeId={activeId}
          setActiveId={setActiveId}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          onReplace={onReplace}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

interface RowProps {
  event: EventItem
  conflict: boolean
  activeId: string | null
  setActiveId: (id: string | null) => void
  handleDragStart: (id: string) => void
  handleDrop: (id: string) => void
  onReplace: (id: string, alt: EventItem) => void
  onSelect?: (e: EventItem) => void
}

function EventRow({
  event: e,
  conflict,
  activeId,
  setActiveId,
  handleDragStart,
  handleDrop,
  onReplace,
  onSelect,
}: RowProps) {
  const longPress = useLongPress(() => setActiveId(e.id))
  return (
    <div
      draggable
      onDragStart={() => handleDragStart(e.id)}
      onDragOver={(ev) => ev.preventDefault()}
      onDrop={() => handleDrop(e.id)}
      className={`p-2 mb-2 border rounded relative ${conflict ? 'bg-red-200' : 'bg-white'}`}
      onClick={() => onSelect?.(e)}
      {...longPress}
    >
      <div className="font-medium">{e.title}</div>
      <div className="text-xs">
        {e.start / 60}:00 - {e.end / 60}:00
      </div>
      {activeId === e.id && e.alternates && (
        <div className="absolute z-10 bg-white border p-1 top-0 left-full ml-2">
          {e.alternates.map((alt) => (
            <button
              key={alt.id}
              className="block text-left px-2 py-1 hover:bg-gray-100"
              onClick={() => {
                onReplace(e.id, alt)
                setActiveId(null)
              }}
            >
              {alt.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

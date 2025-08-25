import { useState } from 'react'
import type { EventItem } from '../lib/types'

interface Props {
  events: EventItem[]
  suggestions: EventItem[]
  onAdd: (e: EventItem) => void
  onReplace: (id: string, alt: EventItem) => void
  onSelect?: (e: EventItem) => void
}

export default function MapView({ events, suggestions, onAdd, onReplace, onSelect }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const width = 260
  const height = 180
  const points = events.map((e) => `${e.position.x},${e.position.y}`).join(' ')
  return (
    <div className="border p-2">
      <h2 className="font-bold mb-2">Map</h2>
      <div className="relative" style={{ width, height }}>
        <svg className="absolute top-0 left-0 pointer-events-none" width={width} height={height}>
          <polyline points={points} stroke="blue" strokeWidth={2} fill="none" />
        </svg>
        {suggestions.map((s) => (
          <div
            key={s.id}
            className="absolute w-3 h-3 bg-green-400 opacity-30 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ left: s.position.x, top: s.position.y }}
            onClick={() => onAdd(s)}
          />
        ))}
        {events.map((e) => (
          <div
            key={e.id}
            className="absolute"
            style={{ left: e.position.x, top: e.position.y }}
            onClick={() => {
              onSelect?.(e)
              setActiveId(activeId === e.id ? null : e.id)
            }}
          >
            <div className="w-3 h-3 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
            {activeId === e.id && e.alternates && (
              <div className="absolute bg-white border p-1 mt-1 text-sm">
                {e.alternates.map((alt) => (
                  <button
                    key={alt.id}
                    className="block text-left w-full hover:bg-gray-100 px-2 py-1"
                    onClick={(ev) => {
                      ev.stopPropagation()
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
        ))}
      </div>
    </div>
  )
}

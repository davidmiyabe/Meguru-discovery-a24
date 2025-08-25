import { useState } from 'react'
import type { EventItem } from '../lib/types'
import { Button } from './ui'

interface Props {
  events: EventItem[]
  onReplace: (id: string, alt: EventItem) => void
  onSelect?: (e: EventItem) => void
  onAskAlternates: (e: EventItem) => void
}

export default function EventList({ events, onReplace, onSelect, onAskAlternates }: Props) {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <div className="w-64 border p-2">
      <h2 className="font-bold mb-2">List</h2>
      {events.map((e) => (
        <div
          key={e.id}
          className="border p-2 mb-2 rounded"
          onClick={() => onSelect?.(e)}
        >
          <div className="flex justify-between mb-1">
            <span>{e.title}</span>
            <span className="text-xs bg-gray-200 px-1 rounded">{e.category}</span>
          </div>
          {e.alternates && (
            <div>
              <Button
                variant="ghost"
                className="text-sm text-blue-600"
                onClick={(ev) => {
                  ev.stopPropagation()
                  setOpenId(openId === e.id ? null : e.id)
                }}
              >
                Replace
              </Button>
              {openId === e.id && (
                <div className="mt-1 border p-1">
                  {e.alternates.map((alt) => (
                    <Button
                      key={alt.id}
                      variant="ghost"
                      className="block text-left w-full hover:bg-gray-100 px-2 py-1"
                      onClick={(ev) => {
                        ev.stopPropagation()
                        onReplace(e.id, alt)
                        setOpenId(null)
                      }}
                    >
                      {alt.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

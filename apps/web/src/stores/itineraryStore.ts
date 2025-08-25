import { create } from 'zustand'
import type { ItineraryDay } from '../lib/services/itinerary'

type DayWithLock = ItineraryDay & { locked?: boolean }

interface ItineraryState {
  days: DayWithLock[]
  liked: string[]
  added: string[]
  setDays: (days: DayWithLock[]) => void
  lockDay: (index: number) => void
  addLike: (id: string) => void
  addAdd: (id: string) => void
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  days: [],
  liked: [],
  added: [],
  setDays: (days) => set({ days }),
  lockDay: (index) =>
    set((state) => {
      const updated = state.days.map((d, i) =>
        i === index ? { ...d, locked: true } : d,
      )
      return { days: updated }
    }),
  addLike: (id) =>
    set((state) => ({ liked: [...state.liked, id] })),
  addAdd: (id) => set((state) => ({ added: [...state.added, id] })),
}))

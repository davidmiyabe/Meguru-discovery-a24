import { create } from 'zustand'
import type { ItineraryDay } from '../lib/api'

type DayWithLock = ItineraryDay & { locked?: boolean }

interface ItineraryState {
  days: DayWithLock[]
  likes: number
  adds: number
  setDays: (days: DayWithLock[]) => void
  lockDay: (index: number) => void
  addLike: () => void
  addAdd: () => void
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  days: [],
  likes: 0,
  adds: 0,
  setDays: (days) => set({ days }),
  lockDay: (index) =>
    set((state) => {
      const updated = state.days.map((d, i) =>
        i === index ? { ...d, locked: true } : d,
      )
      return { days: updated }
    }),
  addLike: () => set((state) => ({ likes: state.likes + 1 })),
  addAdd: () => set((state) => ({ adds: state.adds + 1 })),
}))

import { create } from 'zustand'
import type { ItineraryDay } from '../lib/api'

type DayWithLock = ItineraryDay & { locked?: boolean }

interface ItineraryState {
  days: DayWithLock[]
  setDays: (days: DayWithLock[]) => void
  lockDay: (index: number) => void
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  days: [],
  setDays: (days) => set({ days }),
  lockDay: (index) =>
    set((state) => {
      const updated = state.days.map((d, i) =>
        i === index ? { ...d, locked: true } : d,
      )
      return { days: updated }
    }),
}))

import { create } from 'zustand'

interface TripCriteriaState {
  city: string
  startDate: string
  nights: number
  companions: string[]
  setCity: (city: string) => void
  setStartDate: (date: string) => void
  setNights: (nights: number) => void
  toggleCompanion: (companion: string) => void
}

export const useTripCriteria = create<TripCriteriaState>((set) => ({
  city: '',
  startDate: '',
  nights: 1,
  companions: [],
  setCity: (city) => set({ city }),
  setStartDate: (date) => set({ startDate: date }),
  setNights: (nights) => set({ nights }),
  toggleCompanion: (companion) =>
    set((state) => ({
      companions: state.companions.includes(companion)
        ? state.companions.filter((c) => c !== companion)
        : [...state.companions, companion],
    })),
}))

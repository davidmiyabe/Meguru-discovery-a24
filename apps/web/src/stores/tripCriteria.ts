import { create } from 'zustand'

interface TripCriteriaState {
  city: string
  dateMode: 'range' | 'flex'
  startDate: string
  endDate: string
  month: string
  nights: number
  companions: string[]
  tasteProfile: string[]
  setCity: (city: string) => void
  setDateMode: (mode: 'range' | 'flex') => void
  setStartDate: (date: string) => void
  setEndDate: (date: string) => void
  setMonth: (month: string) => void
  setNights: (nights: number) => void
  toggleCompanion: (companion: string) => void
  toggleTaste: (taste: string) => void
}

export const useTripCriteria = create<TripCriteriaState>((set) => ({
  city: '',
  dateMode: 'range',
  startDate: '',
  endDate: '',
  month: '',
  nights: 1,
  companions: [],
  tasteProfile: [],
  setCity: (city) => set({ city: city.toLowerCase() }),
  setDateMode: (mode) => set({ dateMode: mode }),
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setMonth: (month) => set({ month }),
  setNights: (nights) => set({ nights }),
  toggleCompanion: (companion) =>
    set((state) => ({
      companions: state.companions.includes(companion)
        ? state.companions.filter((c) => c !== companion)
        : [...state.companions, companion],
    })),
  toggleTaste: (taste) =>
    set((state) => ({
      tasteProfile: state.tasteProfile.includes(taste)
        ? state.tasteProfile.filter((t) => t !== taste)
        : [...state.tasteProfile, taste],
    })),
}))

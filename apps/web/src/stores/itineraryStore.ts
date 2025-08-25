import { create } from 'zustand'

interface ItineraryState {
  likes: number
  adds: number
  addLike: () => void
  addAdd: () => void
}

export const useItineraryStore = create<ItineraryState>((set) => ({
  likes: 0,
  adds: 0,
  addLike: () => set((state) => ({ likes: state.likes + 1 })),
  addAdd: () => set((state) => ({ adds: state.adds + 1 })),
}))

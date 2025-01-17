import create from 'zustand'
import { persist } from 'zustand/middleware'

const useFavoriteStore = create(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (talkId) =>
        set((state) => ({
          favorites: [...state.favorites, talkId],
        })),
      removeFavorite: (talkId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== talkId),
        })),
    }),
    {
      name: 'favorites-storage',
    }
  )
)

export default useFavoriteStore

import create from 'zustand'

const useStore = create((set) => ({
  favorites: [],
  notifications: [],
  addFavorite: (talkId) => 
    set((state) => ({ favorites: [...state.favorites, talkId] })),
  removeFavorite: (talkId) =>
    set((state) => ({ favorites: state.favorites.filter(id => id !== talkId) })),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] }))
}))

export default useStore

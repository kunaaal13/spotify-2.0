import create from 'zustand'

export const useAccount = create((set) => ({
  // user
  user: null,

  // setUser is a function that sets the user
  setUser: (user) => set(() => ({ user })),
}))

import create from 'zustand'

export const useAccount = create((set) => ({
  // user
  user: null,

  // setUser is a function that sets the user
  setUser: (user) => set(() => ({ user })),

  // country code
  country: 'IN',

  // setCountryCode is a function that sets the country code
  setCountry: (countryCode) => set(() => ({ countryCode })),
}))

import create from 'zustand'

export const useSelectedOptions = create((set) => ({
  // selectedOption is the option that is currently selected
  selectedOption: 'Home',

  // setSelectedOption is a function that sets the selectedOption
  setSelectedOption: (option) => set(() => ({ selectedOption: option })),

  // id of the selected playlist
  selectedPlaylist: null,

  // setSelectedPlaylist is a function that sets the selectedPlaylist
  setSelectedPlaylist: (playlist) =>
    set(() => ({ selectedPlaylist: playlist })),
}))

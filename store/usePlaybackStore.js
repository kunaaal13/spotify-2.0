import create from 'zustand'

export const usePlayback = create((set) => ({
  // current song
  currentSong: null,

  // set current song
  setCurrentSong: (song) => set({ currentSong: song }),

  // is playing
  isPlaying: false,

  // set is playing
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  // device
  device: null,

  // set device
  setDevice: (device) => set({ device }),
}))

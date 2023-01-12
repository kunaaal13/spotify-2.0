import create from 'zustand'

export const usePlayback = create((set) => ({
  currentSong: null,

  // Set current song
  setCurrentSong: (song) => set({ currentSong: song }),

  playbackState: 'paused',

  // Set playback state
  setPlaybackState: (state) => set({ playbackState: state }),
}))

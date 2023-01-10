import React from 'react'
import { useSelectedOptions } from '../../store/useOptionsStore'
import Header from './Header'
import Home from './Home/Home'
import YourLibrary from './Library/YourLibrary'
import Playlist from './Playlist/Playlist'
import Search from './Search/Search'

function Center() {
  // hook for the selected options
  const { selectedOption, selectedPlaylist } = useSelectedOptions()
  return (
    <div className='flex-grow overflow-hidden bg-[#121212]'>
      {/* Header */}
      <Header />

      {
        // If the user has selected an option, display the corresponding component
        selectedOption === 'Home' ? (
          <Home />
        ) : selectedOption === 'Your Library' ? (
          <YourLibrary />
        ) : selectedOption === 'Search' ? (
          <Search />
        ) : selectedOption === 'Playlist' ? (
          <Playlist playlistId={selectedPlaylist} />
        ) : selectedOption === 'Liked Songs' ? (
          <Playlist playlistId={'Liked Songs'} />
        ) : null
      }
    </div>
  )
}

export default Center

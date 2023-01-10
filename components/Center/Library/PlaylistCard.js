import React from 'react'
import { useSelectedOptions } from '../../../store/useOptionsStore'

function PlaylistCard({ name, imgSrc, owner, id }) {
  // state from zustand
  const { setSelectedOption, setSelectedPlaylist } = useSelectedOptions()

  return (
    <div
      className='my-4 flex w-52 cursor-pointer flex-col items-start rounded-md bg-[##181818] p-3 hover:bg-[#282828] hover:transition-all hover:duration-150'
      onClick={() => {
        if (name === 'Liked Songs') {
          // set selected option to liked songs
          setSelectedOption('Liked Songs')
        } else {
          // set selected option to playlist
          setSelectedOption('Playlist')
        }

        // set selected playlist to id
        setSelectedPlaylist(id)
      }}
    >
      <img
        src={imgSrc}
        alt={name + 'img'}
        className='h-[180px] w-[200px] rounded-md'
      />

      <h3 className='my-2 font-semibold text-white line-clamp-1'>{name}</h3>

      <p className='text-sm text-gray-300 line-clamp-1'>{owner}</p>
    </div>
  )
}

export default PlaylistCard

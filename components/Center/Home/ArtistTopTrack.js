import React from 'react'

function ArtistTopTrack({ track }) {
  return (
    <div className='w-full cursor-pointer rounded-md bg-[#181818] p-3 hover:bg-[#383838] sm:w-52'>
      <img
        src={track.album.images[0].url}
        alt=''
        className='h-[180px] w-full rounded-md sm:w-[200px]'
      />

      <h3 className='my-5 text-center font-semibold text-white line-clamp-1'>
        {track.name}
      </h3>
    </div>
  )
}

export default ArtistTopTrack

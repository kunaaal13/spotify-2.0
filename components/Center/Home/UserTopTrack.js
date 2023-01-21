import React from 'react'

function UserTopTrack({ track }) {
  return (
    <div className='flex h-20 w-full cursor-pointer items-center space-x-3 rounded-md bg-[#282828] p-2 hover:bg-[#383838]'>
      <img
        src={track.album.images[0].url}
        alt=''
        className='h-16 w-16 rounded-full'
      />

      {/* name */}
      <h3 className='font-semibold text-white line-clamp-1'>{track.name}</h3>
    </div>
  )
}

export default UserTopTrack

import Image from 'next/image'
import React from 'react'

function PlaylistCard({ name, imgSrc, owner }) {
  return (
    <div className='my-4 flex w-52 cursor-pointer flex-col items-start rounded-md bg-[##181818] p-3 hover:bg-[#282828]'>
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

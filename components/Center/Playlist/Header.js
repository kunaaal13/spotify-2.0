import React, { useEffect, useState } from 'react'
import useDominantColor from '../../../hooks/useDominantColor'
import newShade from '../../../lib/darkerColor'

function Header({ title, owner, imgSrc, totalSongs }) {
  // hook to get dominant color from image
  const color = useDominantColor(imgSrc)
  console.log(color)

  // if color is not found, return null
  if (color.length === 0) return null

  // get darker shade of dominant color
  // negative value for darker shade
  const darkerColor = newShade(color, -50)

  return (
    <section
      style={{
        // set background color to dominant color gradient
        background: `linear-gradient(180deg, ${darkerColor} 0%, rgba(0, 0, 0, 0) 130%)`,
      }}
      className={`flex h-80 w-full items-end space-x-7 p-8 text-white`}
    >
      <img
        src={imgSrc}
        alt={title + 'Playlist img'}
        className='h-44 w-44 rounded-md shadow-2xl'
      />

      <div className='flex flex-col space-y-3'>
        <h4 className=''>Playlist</h4>
        <h1 className='text-2xl font-bold md:text-3xl xl:text-5xl'>{title}</h1>
        <p className=''>
          <span className='font-semibold'>{owner}</span>• {totalSongs} songs
        </p>
      </div>
    </section>
  )
}

export default Header

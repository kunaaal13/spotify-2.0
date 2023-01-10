import React from 'react'

function Header({ title, owner, imgSrc, totalSongs }) {
  return (
    <section className='flex h-80 w-full items-end space-x-7 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 p-8 text-white'>
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

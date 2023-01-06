import React from 'react'

function Playlists({ playlists }) {
  return (
    <div className='h-full overflow-y-scroll p-2 text-gray-400'>
      {playlists.map((item) => (
        <p
          key={item.id}
          className='mb-1 cursor-pointer text-sm line-clamp-1 hover:text-white'
        >
          {item.name}
        </p>
      ))}
    </div>
  )
}

export default Playlists

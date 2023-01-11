import React from 'react'
import Song from './Song'

function Songs({ playlist, playlistId }) {
  if (!playlist) return null
  return (
    <div className='mt-1 h-full overflow-y-scroll px-8 py-6 pb-96'>
      <table className='w-full text-left text-sm'>
        <thead class='bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' class='rounded-l-lg px-6 py-3'>
              Product name
            </th>
            <th scope='col' class='px-6 py-3'>
              Qty
            </th>
            <th scope='col' class='rounded-r-lg px-6 py-3'>
              Price
            </th>
          </tr>
        </thead>
      </table>
      {playlist?.items?.map((song, i) => (
        <Song
          key={song.track.uri}
          i={i + 1}
          name={song.track.name}
          uri={song.track.uri}
          artists={song.track.artists}
          album={song.track.album.name}
          imgSrc={song.track.album.images[0].url}
          duration={song.track.duration_ms}
          addedAt={song.track.added_at}
        />
      ))}
    </div>
  )
}

export default Songs

// Rendering
/*
Liked Songs
playlist.items => loop

Song
song.track.name
song.track.uri 
song.track.artist => loop => artist.name
song.track.album.name
song.track.album.images[0].url
song.track.duration_ms
song.track.added_at


Playlist
playlist.tracks.items => loop

Song
song.added_at
song.track.name
song.track.uri
song.track.artists => loop => artist.name
song.track.album.name
song.track.album.images[0].url
song.track.duration_ms
*/

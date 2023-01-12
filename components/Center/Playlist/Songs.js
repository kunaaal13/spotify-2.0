import React from 'react'
import Song from './Song'

function Songs({ playlist, playlistId }) {
  if (!playlist) return null

  return (
    <div className='mt-1 h-full overflow-y-scroll px-4 py-6 pb-96 scrollbar-hide'>
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
          id={song.track.id}
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

import React, { useEffect, useState } from 'react'
import useSpotify from '../../../hooks/useSpotify'
import PlaylistCard from './PlaylistCard'

function YourLibrary() {
  const spotifyApi = useSpotify()

  // state to store liked songs playlist

  // state to store user's playlists
  const [playlists, setPlaylists] = useState([])

  // useEffect hook to get user's playlists
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      // Get a user's playlists
      spotifyApi.getUserPlaylists({ limit: 40 }).then((res) => {
        setPlaylists(res.body.items)
      })
    }
  }, [spotifyApi])

  return (
    <div className='h-full w-full overflow-hidden'>
      <h1 className='text-2xl font-bold tracking-wide text-white'>Playlists</h1>

      <div className='my-12 mb-20 grid h-full overflow-y-scroll pb-20 scrollbar-hide sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
        {/* Liked Songs */}
        <PlaylistCard
          name='Liked Songs'
          imgSrc='/images/liked.png'
          owner='Me'
        />

        {/* User's playlists */}
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            imgSrc={playlist.images[0].url}
            name={playlist.name}
            owner={'By ' + playlist.owner.display_name}
          />
        ))}
      </div>
    </div>
  )
}

export default YourLibrary

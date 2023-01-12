import React, { useEffect, useState } from 'react'
import useSpotify from '../../../hooks/useSpotify'
import Header from './Header'
import Songs from './Songs'

function Playlist({ playlistId }) {
  // initialize spotify hook
  const spotifyApi = useSpotify()

  // state to store playlist
  const [playlist, setPlaylist] = useState(null)

  // fetch the playlist
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (playlistId === 'Liked Songs') {
        spotifyApi.getMySavedTracks({ limit: 50 }).then((res) => {
          setPlaylist(res.body)
        })
      } else {
        spotifyApi.getPlaylist(playlistId).then((res) => {
          setPlaylist(res.body)
        })
      }
    }
  }, [spotifyApi, playlistId])

  // Return a loading screen if playlist is null
  if (!playlist) return null

  console.log(playlist)

  return (
    <div className='h-full overflow-hidden'>
      {
        // Render different headers when playlistid is liked songs or not
        playlistId === 'Liked Songs' ? (
          <Header
            title='Liked Songs'
            owner='Me'
            imgSrc='/images/liked.png'
            totalSongs={playlist?.items?.length}
          />
        ) : (
          <Header
            title={playlist?.name}
            owner={playlist?.owner?.display_name}
            imgSrc={playlist?.images?.[0]?.url}
            totalSongs={playlist?.tracks?.items?.length}
          />
        )
      }

      {/* Songs */}
      {
        // Send different props when playlistid is liked or not
        playlistId === 'Liked Songs' ? (
          <Songs playlist={playlist} playlistId={playlistId} />
        ) : (
          <Songs playlist={playlist.tracks} playlistId={playlistId} />
        )
      }
    </div>
  )
}

export default Playlist

import React, { useEffect, useState } from 'react'
import useSpotify from '../../../hooks/useSpotify'
import Header from './Header'

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

  if (!playlist) return null

  return (
    <div>
      {
        // Render different headers when playlistid is liked or something else
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
    </div>
  )
}

export default Playlist

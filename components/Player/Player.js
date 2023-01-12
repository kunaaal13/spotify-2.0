import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'

function Player() {
  const spotifyApi = useSpotify()
  const [track, setTrack] = useState(null)

  // initilaise the player
  useEffect(() => {
    // if spotify api is not authenticated, return
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 }).then((res) => {
        setTrack(res.body.items[0].track)
      })
    }
  }, [spotifyApi])

  return <div className='z-10 w-full flex-[0.1]'>Player</div>
}

export default Player

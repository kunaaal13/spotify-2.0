import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { usePlayback } from '../../store/usePlaybackStore'

function Player() {
  const spotifyApi = useSpotify()
  const [track, setTrack] = useState(null)
  const [volume, setVolume] = useState(50)

  // get playback state from zustand
  const { playbackState, setPlaybackStack, currentSong } = usePlayback()

  // initilaise the player
  useEffect(() => {
    // if spotify api is not authenticated, return
    if (spotifyApi.getAccessToken()) {
      // Get the current playback state
      spotifyApi.getMyCurrentPlaybackState().then((res) => {
        // if there is no device, return alert
        if (!res.body.device) {
          alert('No device found')
        } else {
          setVolume(res.body.device.volume_percent)
        }

        setTrack(res.body.item)
        console.log(res.body)
      })
    }
  }, [spotifyApi, playbackState, currentSong, volume])

  // if track is not null, return the player
  if (!track) return null

  return (
    <div className='z-10 grid w-full flex-[0.1] grid-cols-3 bg-[#181818] px-2 text-sm text-white md:px-8 md:text-base'>
      {/* left */}
      <div className='flex items-center space-x-4'>
        <img
          src={track?.album?.images?.[0]?.url}
          alt=''
          className='hidden h-12 w-12 rounded-sm shadow-md md:inline'
        />

        <div>
          <h3 className='w-full line-clamp-1'>{track?.name}</h3>
          <p className='text-xs text-gray-400 '>{track.artists[0].name}</p>
        </div>
      </div>

      {/* center */}
      <div className='flex flex-col'></div>
    </div>
  )
}

export default Player

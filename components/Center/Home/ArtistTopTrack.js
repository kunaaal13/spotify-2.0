import React from 'react'
import useSpotify from '../../../hooks/useSpotify'
import { useAccount } from '../../../store/useAccountStore'
import { usePlayback } from '../../../store/usePlaybackStore'

function ArtistTopTrack({ track }) {
  const { user } = useAccount()
  const { setDevice, setIsPlaying, setCurrentSong } = usePlayback()
  const spotifyApi = useSpotify()

  const handleClick = () => {
    // if the user is not premium, show an alert and return
    if (!user.product === 'premium') {
      toast.error('You need to be a premium user to play music')
      return
    }

    // Get the current playback state
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      // if no device, return alert
      if (res.body === null) {
        toast.error('No device found, please open spotify on your device')
        setDevice(null)
        return
      }

      setDevice(res.body.device.id)
      setIsPlaying(res.body.is_playing)

      // if song is playing, pause it
      if (res.body.is_playing) {
        // if it's the same song, pause it
        if (res.body.item.id === track.id) {
          spotifyApi.pause()
          setIsPlaying(false)
          return
        } else {
          // if it's a different song, play it
          spotifyApi.play({ uris: [track.uri] })
          setIsPlaying(true)
          setCurrentSong(track.id)
          return
        }
      } else {
        // not playing, play it
        spotifyApi.play({ uris: [track.uri] })
        setIsPlaying(true)
        setCurrentSong(track.id)
      }
    })
  }
  return (
    <div
      className='w-full cursor-pointer rounded-md bg-[#181818] p-3 hover:bg-[#383838] sm:w-52'
      onClick={handleClick}
    >
      <img
        src={track.album.images[0].url}
        alt={track.name}
        className='h-[180px] w-full rounded-md sm:w-[200px]'
      />

      <h3 className='my-5 text-center font-semibold text-white line-clamp-1'>
        {track.name}
      </h3>
    </div>
  )
}

export default ArtistTopTrack

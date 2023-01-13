import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { usePlayback } from '../../store/usePlaybackStore'
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiPlayCircle,
  BiPauseCircle,
  BiVolumeFull,
  BiVolume,
} from 'react-icons/bi'

function Player() {
  const spotifyApi = useSpotify()
  const [track, setTrack] = useState(null)
  const [volume, setVolume] = useState(50)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // get playback state from zustand
  const { playbackState, setPlaybackState, currentSong } = usePlayback()

  // initilaise the player
  useEffect(() => {
    // if spotify api is not authenticated, return
    if (spotifyApi.getAccessToken()) {
      // Get the current playback state
      spotifyApi.getMyCurrentPlaybackState().then((res) => {
        // if there is no device, return alert

        console.log(res.body)
        if (res.body === null) {
          // get the user's most recently played track
          spotifyApi.getMyRecentlyPlayedTracks().then((res) => {
            // set the current song
            setTrack(res.body.items[res.body.limit - 1].track)
          })

          // alert user that there is no device and song can be played only if there is a device
          alert('No device found, please open spotify on your device')
        } else {
          // there is a device, set the current song
          setTrack(res.body.item)
          setVolume(res.body.device.volume_percent)
          // setIsPlaying(res.body.is_playing)
          setProgress(res.body.progress_ms)
        }
      })
    }
  }, [spotifyApi, playbackState, currentSong])

  // if track is not null, return the player
  if (!track) return null

  // Update the progress bar every second
  setInterval(() => {
    // if the song is playing, update the progress bar
    if (isPlaying) setProgress(progress + 1000)
  }, 1000)

  return (
    <div className='z-10 flex w-full flex-[0.1] items-center justify-between bg-[#181818] px-2 text-sm text-white md:px-8 md:text-base'>
      {/* left */}
      <div className='flex items-center space-x-4'>
        <img
          src={track?.album?.images?.[0]?.url}
          alt={track?.name + ' track image'}
          className='hidden h-12 w-12 rounded-sm shadow-md md:inline'
        />

        <div>
          <h3 className='w-full line-clamp-1'>{track?.name}</h3>
          <p className='text-xs text-gray-400 hover:text-white'>
            {track.artists[0].name}
          </p>
        </div>
      </div>

      {/* center */}
      <div className='flex flex-[0.4] flex-col items-center justify-center'>
        {/* upper controls */}
        <div className='flex items-center space-x-4'>
          {/* Previous track */}
          <BiArrowToLeft className='h-6 w-6' />

          {/* Play/Pause */}
          {isPlaying ? (
            <BiPauseCircle className='h-10 w-10 md:h-8 md:w-8' />
          ) : (
            <BiPlayCircle className='h-10 w-10 md:h-8 md:w-8' />
          )}

          {/* Next track */}
          <BiArrowToRight className='h-6 w-6' />
        </div>

        {/* Seek bar */}
        <div className='mt-1 hidden w-full md:inline'>
          <p className='text-xs text-gray-400'></p>

          <div className='h-2 w-full rounded-full bg-gray-400'>
            <div
              className='h-2 rounded-full bg-white'
              style={{
                // width of the progress bar is equal to the current progress of the song
                width: `${(progress / track.duration_ms) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* right */}
      <div className='flex items-center space-x-3'>
        {/* Volume */}
        {
          // if volume is greater than 0, show the volume full icon else show the volume icon
          volume === 0 ? (
            <BiVolume className='h-6 w-6' />
          ) : (
            <BiVolumeFull className='h-6 w-6' />
          )
        }

        {/* Volume slider */}
        <input
          type='range'
          min={0}
          max={100}
          onChange={(e) => setVolume(e.target.value)}
          value={volume}
          className='range-xs hidden h-1 rounded-lg md:inline'
        />
      </div>
    </div>
  )
}

export default Player

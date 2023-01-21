import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { usePlayback } from '../../store/usePlaybackStore'
import { useAccount } from '../../store/useAccountStore'
import {
  BiArrowToLeft,
  BiArrowToRight,
  BiPlayCircle,
  BiPauseCircle,
  BiVolumeFull,
  BiVolume,
} from 'react-icons/bi'
import { toast } from 'react-hot-toast'

function Player() {
  const spotifyApi = useSpotify()
  const [track, setTrack] = useState(null)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(100)
  const [width, setWidth] = useState(0)

  // get playback state from zustand
  const {
    currentSong,
    setDevice,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    device,
  } = usePlayback()

  // get user
  const { user } = useAccount()

  // handle the player
  useEffect(() => {
    // if spotify api is not authenticated, return
    if (spotifyApi.getAccessToken()) {
      // Get the current playback state
      spotifyApi.getMyCurrentPlaybackState().then((res) => {
        // if there is no playback state, return

        if (res.body === null) {
          // there is no device
          setDevice(null)
          setIsPlaying(false)

          toast.error('No device found, please open spotify on your device')

          // check if there is a current song
          if (currentSong === null) {
            // get the user's most recently played track
            spotifyApi.getMyRecentlyPlayedTracks().then((res) => {
              // set the current song
              setCurrentSong(res.body.items[res.body.limit - 1].track.id)
              setTrack(res.body.items[res.body.limit - 1].track)
            })
          } else {
            // there is a current song
          }
        } else {
          // there is a playback state
          if (device !== res.body.device?.id) {
            // update the device
            setDevice(res.body.device.id)
          }

          // set the track
          if (currentSong !== res.body.item?.id) {
            setTrack(res.body.item)
            setCurrentSong(res.body.item)
          }

          if (res.body.is_playing !== isPlaying) {
            // update the is playing
            setIsPlaying(res.body.is_playing)
          }

          // calculate width of progress bar
          setProgress(res.body.progress_ms)
        }
      })
    }
  }, [
    currentSong,
    device,
    isPlaying,
    spotifyApi,
    setDevice,
    setCurrentSong,
    setIsPlaying,
  ])

  // if track is not null, return the player
  if (!track) return null

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
            {track?.artists[0].name}
          </p>
        </div>
      </div>

      {/* center */}
      <div className='flex flex-[0.4] flex-col items-center justify-center'>
        {/* upper controls */}
        <div className='flex items-center space-x-4'>
          {/* Previous track */}
          <BiArrowToLeft
            className='h-6 w-6 cursor-pointer'
            onClick={() => {
              // check device and premium
              if (device === null || user.product !== 'premium') {
                toast.error('Error: No device found or not premium')
              }

              spotifyApi.skipToPrevious()
            }}
          />

          {/* Play/Pause */}
          {isPlaying ? (
            <BiPauseCircle
              className='h-10 w-10 cursor-pointer md:h-8 md:w-8'
              onClick={() => {
                // check device and premium
                if (device === null || user.product !== 'premium') {
                  toast.error('Error: No device found or not premium')
                }
                spotifyApi.pause()
                setIsPlaying(false)
              }}
            />
          ) : (
            <BiPlayCircle
              className='h-10 w-10 cursor-pointer md:h-8 md:w-8'
              onClick={() => {
                spotifyApi.play()
                setIsPlaying(true)
              }}
            />
          )}

          {/* Next track */}
          <BiArrowToRight
            className='h-6 w-6 cursor-pointer'
            onClick={() => {
              // check device and premium
              if (device === null || user.product !== 'premium') {
                toast.error('Error: No device found or not premium')
              }

              spotifyApi.skipToNext()
            }}
          />
        </div>

        {/* Seek bar */}
        <div className='mt-1 hidden w-full md:inline'>
          <div className='h-2 w-full overflow-hidden rounded-full bg-gray-400'>
            <div
              className='h-2 rounded-full bg-white'
              style={{
                // width of the progress bar is equal to the current progress of the song
                width: `${(progress / track?.duration_ms) * 100}%`,
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

import React, { useState } from 'react'
import { msToMinutesSeconds } from '../../../lib/timeConversion'
import { BsPlayFill } from 'react-icons/bs'
import { usePlayback } from '../../../store/usePlaybackStore'
import useSpotify from '../../../hooks/useSpotify'
import { useAccount } from '../../../store/useAccountStore'

function Song({ name, uri, artists, album, imgSrc, duration, id, i }) {
  // state for hover effect
  const [isHovered, setIsHovered] = useState(false)

  // initialize spotify hook
  const spotifyApi = useSpotify()

  // get playback states from zustand
  const { currentSong, playbackState, setCurrentSong, setPlaybackState } =
    usePlayback()

  // get user state from zustand
  const { user } = useAccount()

  // function to handle click
  const handleClick = () => {
    // if the user is not premium, show an alert and return
    if (!user.product === 'premium') {
      alert('You need to be a premium user to play music')
      return
    }

    // if the song is already playing, check if it's the same song
    if (playbackState === 'playing') {
      // if it's the same song, pause it
      if (currentSong === id) {
        spotifyApi.pause()
        setPlaybackState('paused')
        return
      } else {
        // if it's a different song, play it
        spotifyApi.play({ uris: [uri] })
        setCurrentSong(id)
        setPlaybackState('playing')
        return
      }
    } else {
      // if the song is paused, play it
      spotifyApi.play({ uris: [uri] })
      setCurrentSong(id)
      setPlaybackState('playing')
      return
    }
  }

  return (
    <div
      // To do: add a hover effect
      onMouseEnter={() => {
        // Add a play button only over medium screens
        if (window.matchMedia('(min-width: 768px)').matches) {
          setIsHovered(true)
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
      // To do: add a click effect
      onClick={() => {
        handleClick()
      }}
      className='group grid h-16 cursor-pointer grid-cols-2 rounded-md py-3 px-4 text-sm text-gray-500 hover:bg-[#282828] hover:transition-all hover:duration-150'
    >
      <div className='flex w-full items-center space-x-3 md:space-x-4'>
        {
          // To do: add a play button on hover
          isHovered ? <BsPlayFill className='text-xs text-white' /> : <p>{i}</p>
        }

        <img src={imgSrc} alt={`album cover ${name}`} className='h-10 w-10' />

        <div className=''>
          <p className='w-36 truncate text-white lg:w-64'>{name}</p>

          <p className='flex items-center truncate text-xs group-hover:text-white'>
            {
              // show 2 artists only at max
              artists?.length >= 2
                ? `${artists[0].name}, ${artists[1].name}`
                : `${artists[0].name}`
            }
          </p>
        </div>
      </div>

      <div className='ml-auto flex items-center justify-between md:ml-0'>
        <p className='hidden truncate md:inline md:w-40'>{album}</p>
        <p>{msToMinutesSeconds(duration)}</p>
      </div>
    </div>
  )
}

export default Song

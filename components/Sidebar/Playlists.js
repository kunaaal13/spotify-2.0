import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { useSelectedOptions } from '../../store/useOptionsStore'

function Playlists() {
  // hook to initiate spotify api
  const spotifyApi = useSpotify()
  // state to store user's playlists
  const [playlists, setPlaylists] = useState([])
  // state to store selected playlist
  const { selectedPlaylist, setSelectedPlaylist, setSelectedOption } =
    useSelectedOptions()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      // Get a user's playlists
      spotifyApi.getUserPlaylists({ limit: 40 }).then((res) => {
        setPlaylists(res.body.items)
      })
    }
  }, [spotifyApi])
  return (
    <div className='h-full overflow-y-scroll p-2 text-gray-400 scrollbar-hide'>
      {playlists.map((item) => (
        <p
          key={item.id}
          className={`mb-3 cursor-pointer text-sm line-clamp-1 hover:text-white ${
            item.id === selectedPlaylist ? 'text-white' : ''
          }`}
          onClick={() => {
            // set current playlist to selected playlist
            setSelectedPlaylist(item.id)

            // set selected option to null
            setSelectedOption(null)
          }}
        >
          {item.name}
        </p>
      ))}
    </div>
  )
}

export default Playlists

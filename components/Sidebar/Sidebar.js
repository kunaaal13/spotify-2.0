import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { sidebarOptions } from '../../utils/SidebarOptions'
import Playlists from './Playlists'
import SidebarItem from './SidebarItem'

function Sidebar() {
  // hook to get spotify api
  const spotifyApi = useSpotify()
  // state to store user's playlists
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      // Get a user's playlists
      spotifyApi.getUserPlaylists().then((res) => {
        setPlaylists(res.body.items)
      })
    }
  }, [spotifyApi])
  return (
    <div className='flex w-64 flex-col overflow-hidden border-r border-gray-200 p-6'>
      {/* Logo */}
      <div className='px-2'>
        <Image src='/images/logo.png' alt='logo' height={40} width={131} />
      </div>

      {/* Sidebar items */}
      <div className='mt-4 flex flex-col'>
        {sidebarOptions.map((option) => (
          <SidebarItem
            title={option.title}
            Icon={option.Icon}
            key={option.title}
          />
        ))}
      </div>

      {/* Horizontal rule */}
      <hr className='mt-3 mb-2 border-[0.2px] border-gray-500' />

      {/* Playlists */}
      <Playlists playlists={playlists} />
    </div>
  )
}

export default Sidebar

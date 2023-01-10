import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { sidebarOptions } from '../../lib/SidebarOptions'
import Playlists from './Playlists'
import SidebarItem from './SidebarItem'

function Sidebar() {
  return (
    <div className='flex w-64 flex-col overflow-hidden p-6 pb-2'>
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
      <Playlists />
    </div>
  )
}

export default Sidebar

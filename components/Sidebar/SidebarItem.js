import Image from 'next/image'
import React from 'react'
import { useSelectedOptions } from '../../store/useOptionsStore'

function SidebarItem({ title, Icon }) {
  // state from zustand's
  const { selectedOption, setSelectedOption, setSelectedPlaylist } =
    useSelectedOptions()

  return (
    <div
      className={`mb-[1px] flex cursor-pointer items-center justify-start px-2 py-[6px] ${
        selectedOption === title ? 'text-white' : 'text-gray-400'
      }  hover:text-white ${
        title === 'Create Playlist' ? 'mt-3 mb-[1px]' : ''
      }`}
      onClick={() => {
        // set selected option to title
        setSelectedOption(title)

        // set selected playlist to null
        setSelectedPlaylist(null)
      }}
    >
      {
        // if title is liked songs, render image
        title == 'Liked Songs' ? (
          <Image
            src={Icon}
            alt='Liked Songs'
            height={24}
            width={24}
            className='my-1'
          />
        ) : (
          <Icon className='h-6 w-6' />
        )
      }

      <p className='ml-4 text-sm font-semibold'>{title}</p>
    </div>
  )
}

export default SidebarItem

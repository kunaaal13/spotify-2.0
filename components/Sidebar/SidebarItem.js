import React from 'react'

function SidebarItem({ title, Icon }) {
  return (
    <div
      className={`mb-1 flex cursor-pointer items-center justify-start p-2 text-gray-400 hover:text-white ${
        title === 'Create Playlist' ? 'mt-4' : ''
      }`}
    >
      <Icon className='mr-4 h-7 w-7' />
      <p className='font-semibold'>{title}</p>
    </div>
  )
}

export default SidebarItem

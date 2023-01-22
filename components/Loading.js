import React from 'react'

function Loading() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-black'>
      <span className='loader'></span>

      <h3 className='mt-3 text-xl text-white'>Connecting to spotify</h3>
    </div>
  )
}

export default Loading

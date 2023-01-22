import React from 'react'

function Loading() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-black'>
      <div class='box'>
        <div class='ball one'></div>
        <div class='ball two'></div>
        <div class='ball three'></div>
        <div class='ball four'></div>
        <div class='ball five'></div>
      </div>

      <h3 className='mt-3 text-xl text-white'>Connecting to spotify</h3>
    </div>
  )
}

export default Loading

import Image from 'next/image'
import React from 'react'

function Login() {
  return (
    <div className='bg-[#03071e] w-full h-screen px-5 flex items-center justify-center text-white'>
      <div className='flex flex-col lg:flex-row items-center justify-center w-full px-5'>
        <div className='lg:flex-[0.5] flex items-center justify-center'>
          <Image src='/images/logo.png' width={300} height={200} alt='' />
        </div>

        <div className='mt-10 lg:mt-0 lg:flex-[0.5] text-center lg:text-left'>
          <h2 className='text-4xl lg:text-6xl font-extrabold leading-[1.5]'>
            Play millions of songs and podcasts, for free.
          </h2>

          <div className='w-full flex justify-center lg:justify-start'>
            <div className='mt-12 bg-white text-black w-2/3 lg:w-1/3 py-2 text-xl font-semibold rounded-full tracking-wide text-center cursor-pointer'>
              Sign In
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

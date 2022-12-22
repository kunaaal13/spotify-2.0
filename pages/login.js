import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { signIn } from 'next-auth/react'

function Login() {
  return (
    <>
      <Head>
        <title>login || Spotify</title>
      </Head>
      <div className='bg-[#03071e] w-full h-screen px-5 flex items-center justify-center text-white'>
        <div className='flex flex-col lg:flex-row items-center justify-center w-full px-5'>
          <div className='lg:flex-[0.5] flex items-center justify-center'>
            <Image
              src='/images/logo.png'
              alt=''
              height='300'
              width={300}
              className='w-2/3 h-auto'
            />
          </div>

          <div className='mt-10 lg:mt-0 lg:flex-[0.5] text-center lg:text-left'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug md:leading-snug'>
              Play millions of songs and podcasts, for free.
            </h2>

            <div className='w-full flex justify-center lg:justify-start'>
              <div
                onClick={() => {
                  signIn('spotify', {
                    callbackUrl: '/',
                  })
                }}
                className='mt-12 bg-white text-black w-2/3 lg:w-1/3 py-2 text-xl font-semibold rounded-full tracking-wide text-center cursor-pointer'
              >
                Sign In
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

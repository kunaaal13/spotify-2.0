import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpotify from '../../hooks/useSpotify'
import { BiCaretDown, BiUser } from 'react-icons/bi'
import { signOut } from 'next-auth/react'
import { useAccount } from '../../store/useAccountStore'

function Header() {
  const spotifyApi = useSpotify()

  // state to store the user's name and image
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  // user state from zustand
  const { setUser } = useAccount()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      // get the user's name and image
      spotifyApi.getMe().then((res) => {
        setName(res.body.display_name)

        // if the user has an image, set it
        if (res.body.images.length > 0) {
          setImage(res.body.images[0].url)
        }

        // set the user in zustand
        setUser(res.body)
      })
    }
  }, [spotifyApi, setUser])
  return (
    <header className='absolute top-5 right-8 z-50'>
      <div
        className='flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 opacity-90 hover:opacity-80'
        onClick={() => {
          // sign out the user when the header is clicked
          signOut()
        }}
      >
        {
          // If the user has an image, display it. Otherwise, display a user icon
          image.length === 0 ? (
            <BiUser className='h-7 w-7 rounded-full bg-gray-500 p-1 text-white' />
          ) : (
            <Image
              src={image}
              alt='user-img'
              width={30}
              height={30}
              className='rounded-full'
            />
          )
        }

        <h1 className='font-semibold text-white'>{name}</h1>

        <BiCaretDown className='h-5 w-5 text-white' />
      </div>
    </header>
  )
}

export default Header

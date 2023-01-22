import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Center from '../components/Center/Center'
import Player from '../components/Player/Player'
import Sidebar from '../components/Sidebar/Sidebar'
import useSpotify from '../hooks/useSpotify'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()

  useEffect(() => {
    // logout if status is unauthenticated
    if (session === null) {
      router.push('/login')
    }

    // set access token to spotify api
  }, [router, session, spotifyApi, status])

  // if no access token,
  if (!spotifyApi.getAccessToken()) {
    return null
  }

  return (
    <>
      <Head>
        <title>Spotify redesign 2.0</title>
        <meta
          name='description'
          content='Spotify redesign 2.0 built for learning purposes'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex h-screen flex-col overflow-hidden bg-black text-gray-400'>
        <main className='flex flex-[0.9] overflow-hidden'>
          <Sidebar />
          <Center />
        </main>

        {/* Music player */}
        <Player />
      </div>
    </>
  )
}

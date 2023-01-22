import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Center from '../components/Center/Center'
import Loading from '../components/Loading'
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

    // if access token is not set, set it
    if (session && !spotifyApi.getAccessToken()) {
      console.log('setting access token')
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [router, session, spotifyApi, status])

  // if no access token, set it
  if (!spotifyApi.getAccessToken()) {
    spotifyApi.setAccessToken(session.user.accessToken)
  }

  if (!spotifyApi.getAccessToken()) {
    return (
      <>
        <Loading />
      </>
    )
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

import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // logout if status is unauthenticated
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [router, status])

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

      <div className='flex h-screen flex-col overflow-hidden bg-black '>
        {/* <button
          className='bg-black text-white w-2/3 lg:w-1/3 py-2 text-xl font-semibold rounded-full tracking-wide text-center cursor-pointer'
          onClick={() => {
            signOut()
          }}
        >
          Sign Out
        </button> */}

        <main className='flex flex-[0.85] overflow-hidden'>
          <Sidebar />
        </main>

        {/* Music player */}
      </div>
    </>
  )
}

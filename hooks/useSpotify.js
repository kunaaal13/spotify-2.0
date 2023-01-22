import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

function useSpotify() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      // logout if status is unauthenticated
      if (session.error) {
        router.push('/login')
      }

      // set access token to spotify api
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [router, session, status])

  return spotifyApi
}

export default useSpotify

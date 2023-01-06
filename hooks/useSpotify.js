import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import spotifyApi from '../lib/spotify'

function useSpotify() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      // logout if status is unauthenticated
      if (session.error === 'RefreshAccessTokenError') {
        router.push('/login')
      }

      // set access token to spotify api
      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [router, session, status])

  return spotifyApi
}

export default useSpotify

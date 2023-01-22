import React, { useEffect, useState } from 'react'
import useSpotify from '../../../hooks/useSpotify'
import { useAccount } from '../../../store/useAccountStore'
import ArtistTopTrack from './ArtistTopTrack'
import UserTopTrack from './UserTopTrack'

function Home() {
  const time = new Date().getHours()
  const greeting =
    time < 12 ? 'Good morning' : time < 18 ? 'Good Afternoon' : 'Good evening'

  const spotifyApi = useSpotify()
  const { country } = useAccount()

  const [topTracks, setTopTracks] = useState([])
  const [topArtistTracks, setTopArtistTracks] = useState([])
  const [topArtist, setTopArtist] = useState('')

  // get songs from spotify api
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyTopTracks({ limit: 6 }).then((res) => {
        setTopTracks(res.body.items)
      })

      // get top tracks from the user's top artist
      spotifyApi.getMyTopArtists({ limit: 2 }).then((res) => {
        // get the top artist's id
        const artistId = res.body.items[1].id
        setTopArtist(res.body.items[1].name)

        if (artistId) {
          spotifyApi.getArtistTopTracks(artistId, country).then((res) => {
            // get the first three tracks
            setTopArtistTracks(res.body.tracks.slice(0, 5))
          })
        }
      })
    }
  }, [spotifyApi, country])

  // if the tracks are not loaded, return a loading message
  if (topTracks.length === 0 || topArtistTracks.length === 0) {
    return <div className='h-full overflow-hidden p-6'>Loading...</div>
  }

  return (
    <div className='h-full w-full overflow-hidden p-6'>
      <h1 className='mb-4 text-2xl font-bold text-white'>{greeting}</h1>
      <div className='flex h-full w-full flex-col overflow-scroll pb-20 scrollbar-hide'>
        {/* User's top tracks */}
        <div className='grid w-full grid-cols-2 gap-6 md:grid-cols-3'>
          {
            // map through the top tracks and display them
            topTracks.map((track) => (
              <UserTopTrack key={track.id} track={track} />
            ))
          }
        </div>

        {/* User's top artist's top tracks */}
        <h2 className='mt-16 text-2xl font-bold text-white'>{`Best of ${topArtist}`}</h2>
        <div className='mt-6 grid w-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {
            // map through the artist top tracks and display them
            topArtistTracks.map((track) => (
              <ArtistTopTrack key={track.id} track={track} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home

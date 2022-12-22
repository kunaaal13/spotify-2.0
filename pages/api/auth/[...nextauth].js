import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'

const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    // Refresh the access token given that it hasn't expired
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log('refreshed token', refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from spotify
      // replace if new one comes back else keep the old one
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],

  // random string used to hash tokens, sign/encrypt cookies and generate cryptographic keys.
  secret: process.env.JWT_SECRET,

  // Specify URLs to be used if you want to create custom sign in, sign out and error pages.
  pages: {
    signIn: '/login',
  },

  // async functions to control what happens when an action is performed.
  callbacks: {
    // called whenever a JSON Web Token is created or updated.
    async jwt({ token, user, account }) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          // handling expiry time in milliseconds so * 1000
          accessTokenExpires: account.expires_at * 1000,
        }
      }

      // return prev token if access token is not expired
      if (Date.now() < token.accessTokenExpires) {
        console.log('existing access token is valid')
        return token
      }

      // refresh token if access token is expired
      console.log('access token is expired, refreshing ...')
      return await refreshAccessToken(token)
    },

    // called whenever a session is checked
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})

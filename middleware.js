import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  // Token will exist if the request is authenticated
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  // Allow the requests if
  // - It is a request for next-auth session and provider fetching
  // - token exists
  if (pathname.includes('/api/auth/') || token) {
    return NextResponse.next()
  }

  // Redirect to login page if token does not exist and calling protected routes
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}

import { NextRequest, NextResponse } from 'next/server'

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Base login route - generate UUID and redirect
  if (pathname === '/login') {
    const sessionUUID = generateUUID()
    const redirectUrl = new URL(`/login/${sessionUUID}`, request.url)

    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set('login_session_uuid', sessionUUID, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 300,
      path: '/login',
    })

    return response
  }

  // UUID login route validation
  const uuidMatch = pathname.match(/^\/login\/([a-f0-9-]{36})$/)
  if (uuidMatch) {
    const urlUUID = uuidMatch[1]
    const cookieUUID = request.cookies.get('login_session_uuid')?.value

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(urlUUID) || !cookieUUID || cookieUUID !== urlUUID) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Dashboard protection
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('accessToken')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login/:path*', '/dashboard/:path*'],
}

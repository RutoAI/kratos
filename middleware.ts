import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedHosts = [
  'hq.rutowallet.com',
  'db74dea2bca7.rutowallet.com',
  'www.rutoai.org',
]

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')

  // Check if the host is allowed
  if (host && !allowedHosts.includes(host)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*', 
}

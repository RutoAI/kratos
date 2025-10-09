import { NextRequest, NextResponse } from 'next/server'

// IP whitelist for enhanced security
const WHITELISTED_IPS = ['127.0.0.1', '::1', 'localhost']

// Domain whitelist
const WHITELISTED_DOMAINS = [
  'f9e1572d.rutowallet.com',
  'db74dea2bca7.rutowallet.com',
  'rutowallet.com',
  'naruto.rutowallet.com',
  '4n4z0.rutowallet.com',
]

// Get client IP from request
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')

  return cfConnectingIP || realIP || forwardedFor?.split(',')[0].trim() || '127.0.0.1'
}

// Check if IP or domain is whitelisted
function isIPWhitelisted(ip: string, request: NextRequest): boolean {
  // Development mode - allow all
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  // Check domain whitelist
  const host = request.headers.get('host')
  if (host && WHITELISTED_DOMAINS.includes(host)) {
    return true
  }

  // Check exact IP matches
  if (WHITELISTED_IPS.includes(ip)) {
    return true
  }

  // Check CIDR ranges
  for (const allowedIP of WHITELISTED_IPS) {
    if (allowedIP.includes('/')) {
      const [network, bits] = allowedIP.split('/')
      if (
        ip.startsWith(
          network
            .split('.')
            .slice(0, Math.floor(parseInt(bits) / 8))
            .join('.')
        )
      ) {
        return true
      }
    }
  }

  return false
}

function generateUUID(): string {
  // Generate 8-character hex hash for session
  const chars = '0123456789abcdef'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * 16)]
  }
  return result
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const clientIP = getClientIP(request)

  // For now, all IPs are allowed (as requested)
  // Future: Only whitelisted IPs will be allowed
  // if (!isIPWhitelisted(clientIP, request)) {
  //   console.warn(`Redirecting non-whitelisted IP: ${clientIP} to rutoai.com`)
  //   return NextResponse.redirect('https://rutoai.com')
  // }

  // Root path - show brand protection page
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Login route - redirect to hash (virtual route, no physical file)
  if (pathname === '/login') {
    const hash = generateUUID().substring(0, 8) // Short hash (8 hex chars)
    const redirectUrl = new URL(`/${hash}`, request.url)

    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set('session_hash', hash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    })

    return response
  }

  // Hash route validation - login page
  const hashMatch = pathname.match(/^\/([a-f0-9]{8})$/)
  if (hashMatch) {
    const urlHash = hashMatch[1]
    const cookieHash = request.cookies.get('session_hash')?.value

    if (!cookieHash || cookieHash !== urlHash) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  }

  // Post-login dashboard routes (/hash/o, /hash/u/o, etc.)
  // COMMENTED OUT FOR DEVELOPMENT - allows direct access to dashboard routes
  /*
  const postLoginMatch = pathname.match(/^\/([a-f0-9]{8})(\/.*)?$/)
  if (postLoginMatch) {
    const urlHash = postLoginMatch[1]
    const cookieHash = request.cookies.get('session_hash')?.value
    const accessToken = request.cookies.get('accessToken')?.value

    // Check if user has valid session and is authenticated
    if (!cookieHash || cookieHash !== urlHash) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // For dashboard routes, also check for authentication token
    if (postLoginMatch[2] && !accessToken) {
      return NextResponse.redirect(new URL(`/${urlHash}`, request.url))
    }

    return NextResponse.next()
  }
  */

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

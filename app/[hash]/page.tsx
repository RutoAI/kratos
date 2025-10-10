'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Turnstile from 'react-turnstile'
import { authService } from '@/services'
import ForbiddenAccess from '@/components/ForbiddenAccess'

const LoginWithUUID = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileReady, setTurnstileReady] = useState(false)
  const [turnstileError, setTurnstileError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forbidden, setForbidden] = useState(false)
  const [deviceHashReady, setDeviceHashReady] = useState(false)
  const router = useRouter()
  const params = useParams()
  const sessionHash = params.hash as string

  // Hash validation and setup
  useEffect(() => {
    const hashRegex = /^[a-f0-9]{8}$/i
    if (!sessionHash || !hashRegex.test(sessionHash)) {
      setForbidden(true)
      return
    }

    localStorage.setItem('session_hash', sessionHash)

    return () => {
      localStorage.removeItem('session_hash')
    }
  }, [sessionHash])

  // Fetch device hash on mount
  useEffect(() => {
    const initDeviceHash = async () => {
      try {
        await authService.fetchDeviceHash()
        setDeviceHashReady(true)
      } catch (error) {
        console.error('Failed to fetch device hash:', error)
        setDeviceHashReady(false)
      }
    }

    initDeviceHash()
  }, [])

  // Turnstile timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!turnstileReady) setTurnstileError(true)
    }, 10000)
    return () => clearTimeout(timeout)
  }, [turnstileReady])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!turnstileToken) return

    setLoading(true)
    try {
      const response = await authService.login({
        email,
        password,
        turnstile_token: turnstileToken,
        sessionUUID: sessionHash,
      })

      // Check if 2FA setup is required
      if (response.qr_code_base64 && response.identifier) {
        // Store QR code for 2FA setup page
        localStorage.setItem('2fa_qr_code', response.qr_code_base64)
        router.push(`/${sessionHash}/2fa-setup`)
      } else {
        // Normal login - redirect to dashboard
        router.push(`/${sessionHash}/o`)
      }
    } catch (error) {
      console.error('Login failed:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token)
  }

  // Forbidden access screen
  if (forbidden) {
    return <ForbiddenAccess />
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: '#F47C34' }}
    >
      <div className="w-full max-w-[380px]">
        <div className="w-full bg-black/25 rounded-xl shadow-md p-8 py-32 max-w-sm mx-auto">
          <div className="text-center">
            <img
              src="/images/ruto-long.png"
              alt="Ruto Logo"
              className="h-12 w-[80%] mx-auto mb-6"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@gmail.com"
                className="w-full bg-white border border-gray-300 py-2.5 px-3 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white border border-gray-300 py-2.5 px-3 pr-10 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 relative">
              {!turnstileReady && !turnstileError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-xl">
                  <div className="flex flex-col items-center space-y-2">
                    <svg className="animate-spin h-6 w-6 text-orange-500" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span className="text-xs text-gray-500">Loading security verification...</span>
                  </div>
                </div>
              )}

              {turnstileError && (
                <div className="flex items-center justify-center bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex flex-col items-center space-y-2">
                    <svg
                      className="h-6 w-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span className="text-xs text-red-600">Security verification failed</span>
                    <button
                      onClick={() => router.push('/login')}
                      className="text-xs text-orange-500 hover:underline"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {!turnstileError && (
                <div className="flex justify-center items-center">
                  <Turnstile
                    sitekey="0x4AAAAAABCSmD-0WEDaerwS"
                    onVerify={handleTurnstileVerify}
                    onLoad={() => setTurnstileReady(true)}
                    onError={() => {
                      setTurnstileToken(null)
                      setTurnstileReady(false)
                      setTurnstileError(true)
                    }}
                    className="rounded-xl"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!turnstileToken || loading || !deviceHashReady}
              className={`w-full ${
                !turnstileToken || loading || !deviceHashReady
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#FD5818] hover:bg-[#ff5622ca] cursor-pointer'
              } text-white py-2.5 rounded-sm font-medium transition-colors text-sm`}
            >
              {loading ? 'Signing in...' : !deviceHashReady ? 'Initializing...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginWithUUID

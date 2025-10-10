'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { authService } from '@/services'

const TwoFactorVerify = () => {
  const [code, setCode] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams()
  const sessionHash = params.hash as string

  useEffect(() => {
    // Check if identifier exists
    const identifier = localStorage.getItem('2fa_identifier')
    if (!identifier) {
      // If no identifier, redirect back to login
      router.push('/login')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const identifier = localStorage.getItem('2fa_identifier')
    if (!identifier) {
      setError('Session expired. Please login again.')
      return
    }

    if (code.length !== 6 || emailCode.length !== 6) {
      setError('Both codes must be 6 digits')
      return
    }

    setLoading(true)
    try {
      const adminId = localStorage.getItem('2fa_admin_id')
      await authService.confirm2FA({
        identifier,
        code,
        email_code: emailCode,
        ...(adminId && { admin_id: adminId }),
      })

      // Clear 2FA data
      localStorage.removeItem('2fa_qr_code')
      localStorage.removeItem('2fa_identifier')
      localStorage.removeItem('2fa_admin_id')

      // Redirect to dashboard
      router.push(`/${sessionHash}/o`)
    } catch (err) {
      console.error('2FA verification failed:', err)
      setError(err instanceof Error ? err.message : '2FA verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCodeChange = (value: string, setter: (val: string) => void) => {
    // Only allow numbers and max 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6)
    setter(numericValue)
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: '#F47C34' }}
    >
      <div className="w-full max-w-[420px]">
        <div className="w-full bg-black/25 rounded-xl shadow-md p-8 py-16 max-w-md mx-auto">
          <div className="text-center mb-6">
            <img
              src="/images/ruto-long.png"
              alt="Ruto Logo"
              className="h-12 w-[80%] mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-white mb-2">Verify Your Identity</h2>
            <p className="text-gray-200 text-sm">Enter the verification codes to complete setup</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Authenticator Code */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Authenticator Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => handleCodeChange(e.target.value, setCode)}
                placeholder="000000"
                maxLength={6}
                className="w-full bg-white border border-gray-300 py-3 px-4 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl tracking-widest font-mono"
                required
              />
              <p className="text-xs text-gray-200 mt-1">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {/* Email Code */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Email Verification Code
              </label>
              <input
                type="text"
                value={emailCode}
                onChange={(e) => handleCodeChange(e.target.value, setEmailCode)}
                placeholder="000000"
                maxLength={6}
                className="w-full bg-white border border-gray-300 py-3 px-4 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl tracking-widest font-mono"
                required
              />
              <p className="text-xs text-gray-200 mt-1">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || code.length !== 6 || emailCode.length !== 6}
              className={`w-full ${
                loading || code.length !== 6 || emailCode.length !== 6
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#FD5818] hover:bg-[#ff5622ca] cursor-pointer'
              } text-white py-3 rounded-sm font-medium transition-colors text-sm`}
            >
              {loading ? 'Verifying...' : 'Verify and Continue'}
            </button>

            {/* Back Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push(`/${sessionHash}/2fa-setup`)}
                className="text-white text-sm hover:underline"
              >
                ← Back to QR Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TwoFactorVerify

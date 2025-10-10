'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

const TwoFactorSetup = () => {
  const [qrCode, setQrCode] = useState<string>('')
  const [hasScanned, setHasScanned] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const sessionHash = params.hash as string

  useEffect(() => {
    // Retrieve QR code from localStorage (saved during login)
    const storedQR = localStorage.getItem('2fa_qr_code')
    const identifier = localStorage.getItem('2fa_identifier')

    if (!storedQR || !identifier) {
      // If no 2FA data, redirect back to login
      router.push('/login')
      return
    }

    setQrCode(storedQR)
    setLoading(false)
  }, [router])

  const handleNext = () => {
    if (hasScanned) {
      router.push(`/${sessionHash}/2fa-verify`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-[#171A21] to-[#0E0D19]">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: '#F47C34' }}
    >
      <div className="w-full max-w-[480px]">
        <div className="w-full bg-black/25 rounded-xl shadow-md p-8 py-16 max-w-md mx-auto">
          <div className="text-center mb-6">
            <img
              src="/images/ruto-long.png"
              alt="Ruto Logo"
              className="h-12 w-[80%] mx-auto mb-6"
            />
            <h2 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication Setup</h2>
            <p className="text-gray-200 text-sm">
              Scan the QR code below with your authenticator app
            </p>
          </div>

          <div className="space-y-6">
            {/* QR Code Display */}
            <div className="bg-white rounded-lg p-6 flex justify-center items-center">
              {qrCode ? (
                <img
                  src={`data:image/png;base64,${qrCode}`}
                  alt="2FA QR Code"
                  className="w-64 h-64"
                />
              ) : (
                <div className="w-64 h-64 flex items-center justify-center text-gray-400">
                  No QR Code Available
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2 text-sm">Instructions:</h3>
              <ol className="text-gray-200 text-xs space-y-1 list-decimal list-inside">
                <li>Open your authenticator app (Google Authenticator, Authy, etc.)</li>
                <li>Scan the QR code above</li>
                <li>Check the box below once you've completed the scan</li>
              </ol>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start space-x-3 bg-white/5 rounded-lg p-4">
              <input
                type="checkbox"
                id="scanned"
                checked={hasScanned}
                onChange={(e) => setHasScanned(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
              />
              <label htmlFor="scanned" className="text-white text-sm cursor-pointer">
                I have scanned the QR code with my authenticator app
              </label>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!hasScanned}
              className={`w-full ${
                !hasScanned
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#FD5818] hover:bg-[#ff5622ca] cursor-pointer'
              } text-white py-3 rounded-sm font-medium transition-colors text-sm`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoFactorSetup

interface ForbiddenAccessProps {
  title?: string
  message?: string
  onRetry?: () => void
  retryText?: string
}

const ForbiddenAccess = ({
  title = 'Access Forbidden',
  message = 'Invalid session token. This URL is not authorized for access.',
  onRetry = () => (window.location.href = '/login'),
  retryText = 'Generate New Session',
}: ForbiddenAccessProps) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-[#171A21] to-[#0E0D19]">
      <div className="w-full flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <div className="bg-black/5 backdrop-blur-md border border-white/15 rounded-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              <p className="text-gray-400 text-sm mb-6">{message}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">
                  The session token in this URL is either expired, invalid, or has been tampered
                  with.
                </p>
              </div>

              <button
                onClick={onRetry}
                className="w-full bg-[#FD5818] hover:bg-[#ff5622ca] text-white py-3 px-4 rounded-lg font-medium transition-colors text-sm"
              >
                {retryText}
              </button>

              <p className="text-gray-500 text-xs">
                Security measures are in place to protect unauthorized access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForbiddenAccess

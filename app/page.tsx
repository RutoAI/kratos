const Home = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-[#171A21] to-[#0E0D19]">
      <div className="w-full flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-black/5 backdrop-blur-md border border-white/15 rounded-xl p-12 text-center">
            <div className="mb-8">
              <img src="/images/ruto-white.png" alt="Ruto AI Logo" className="h-16 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Domain Protection Notice</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                This domain is proudly owned and operated by{' '}
                <span className="text-orange-500 font-semibold">Ruto AI Limited</span>, which
                secures domains for future projects and to protect its brand identity across the
                web.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-orange-400 mb-3">
                  Authorized Access Only
                </h2>
                <p className="text-gray-400 text-sm">
                  This domain is reserved for authorized personnel and future development
                  initiatives.
                </p>
              </div>

              <div className="flex justify-center">
                <a
                  href="/login"
                  className="inline-flex items-center px-6 py-3 bg-[#FD5818] hover:bg-[#ff5622ca] text-white rounded-lg font-medium transition-colors text-sm"
                >
                  Authorized Access
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-gray-500 text-xs">
                  © 2024 Ruto AI Limited. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

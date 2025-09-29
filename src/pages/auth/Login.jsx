import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login form submitted:', { email, password })
    navigate('/dashboard')
  }

  return (
    <div className="w-full bg-orange-200 border border-orange-300 rounded-xl p-8 max-w-md">
      <div className="text-center">
        <img
          src="/images/ruto-long.png"
          alt="Ruto Logo"
          className="h-12 mx-auto mt-12 mb-4"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full bg-white border border-orange-200 text-gray-800 py-3 px-4 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-white border border-orange-200 text-gray-800 py-3 px-4 pr-12 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[70%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 bg-transparent border-0 outline-none"
            style={{ background: 'transparent', border: 'none' }}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full text-white py-3 px-4 rounded-xl font-medium transition-colors mt-6"
          style={{ backgroundColor: '#FF6B35', border: 'none' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#e55a2b'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FF6B35'}
        >
          Sign in
        </button>
      </form>
    </div>
  )
}

export default Login
import api, { ApiResponse, handleApiError } from './api'
import axios, { AxiosError } from 'axios'
import {
  LoginCredentials,
  LoginRequest,
  LoginResponse,
  User,
  Confirm2FARequest,
  Confirm2FAResponse,
  DeviceHashResponse,
} from '@/types/auth'

// Essential auth service
class AuthService {
  /**
   * Fetch device hash from API
   */
  async fetchDeviceHash(): Promise<string> {
    try {
      // Check if device hash already exists in localStorage
      const existingHash = localStorage.getItem('device_hash')
      if (existingHash) {
        return existingHash
      }

      // Fetch new device hash with custom origin header
      const response = await axios.post<DeviceHashResponse>(
        'https://api.rutowallet.com/admin/auth/device-hash',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            origin: 'https://test-phrase1.rutoai.org/',
          },
        }
      )

      if (response.data.success && response.data.data.device_hash) {
        const deviceHash = response.data.data.device_hash
        // Store device hash in localStorage
        localStorage.setItem('device_hash', deviceHash)
        return deviceHash
      }

      throw new Error('Failed to fetch device hash')
    } catch (error) {
      console.error('Device hash fetch error:', error)
      throw new Error('Unable to generate device hash')
    }
  }

  /**
   * User login
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // Validate session hash
      const storedHash = localStorage.getItem('session_hash')
      if (!storedHash || storedHash !== credentials.sessionUUID) {
        throw new Error('Invalid session.')
      }

      
      const apiRequest: LoginCredentials = {
        email: credentials.email,
        password: credentials.password,
        turnstile_token: credentials.turnstile_token,
      }

      const response = await api.post<ApiResponse<any>>('/auth/login', apiRequest)

      if (response.data.success) {
        // Handle nested data structure (data.data or data.data.data)
        let data = response.data.data

        // If data has a nested 'data' property, unwrap it
        if (data && data.data) {
          data = data.data
        }

        // Check if 2FA setup is required
        if (data.qr_code_base64 && data.identifier) {
          // Store identifier and admin_id for 2FA verification
          localStorage.setItem('2fa_identifier', data.identifier)
          if (data.admin_id) {
            localStorage.setItem('2fa_admin_id', data.admin_id)
          }
          return data // Return 2FA setup data
        }

        // Normal login flow with tokens
        if (data.accessToken && data.refreshToken && data.user) {
          // Store tokens and user data
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
          localStorage.setItem('user', JSON.stringify(data.user))

          // Set access token cookie for middleware validation
          document.cookie = `accessToken=${data.accessToken}; path=/; ${process.env.NODE_ENV === 'production' ? 'secure;' : ''} samesite=strict; max-age=3600`

          // Clear session hash
          localStorage.removeItem('session_hash')

          return data
        }

        throw new Error('Invalid login response')
      } else {
        throw new Error(response.data.message || 'Login failed')
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError)
      throw new Error(errorMessage)
    }
  }

  /**
   * Confirm 2FA setup
   */
  async confirm2FA(data: Confirm2FARequest): Promise<Confirm2FAResponse> {
    try {
      const response = await api.post<ApiResponse<Confirm2FAResponse>>('/auth/confirm-2fa', data)

      if (response.data.success) {
        const { token, refresh_token, admin } = response.data.data

        // Store tokens and admin data
        localStorage.setItem('accessToken', token)
        localStorage.setItem('refreshToken', refresh_token)
        localStorage.setItem('user', JSON.stringify(admin))

        // Set access token cookie for middleware validation
        document.cookie = `accessToken=${token}; path=/; ${process.env.NODE_ENV === 'production' ? 'secure;' : ''} samesite=strict; max-age=3600`

        // Clear 2FA identifier and session hash
        localStorage.removeItem('2fa_identifier')
        localStorage.removeItem('session_hash')

        return response.data.data
      } else {
        throw new Error(response.data.message || '2FA verification failed')
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError)
      throw new Error(errorMessage)
    }
  }

  /**
   * User logout
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear all auth data
      this.clearLocalStorage()
      // Redirect to login via middleware flow
      window.location.href = '/login'
    }
  }

  /**
   * Check if authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')
    return !!(token && user)
  }

  /**
   * Get stored user
   */
  getStoredUser(): User | null {
    try {
      const userString = localStorage.getItem('user')
      return userString ? JSON.parse(userString) : null
    } catch (error) {
      console.error('Error parsing user:', error)
      return null
    }
  }

  /**
   * Get client IP
   */
  private getClientIP(): string {
    return 'client'
  }

  /**
   * Get current login IP
   */
  getCurrentLoginIP(): string | null {
    return localStorage.getItem('currentLoginIP')
  }

  /**
   * Clear auth data
   */
  clearLocalStorage(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('session_hash')
    localStorage.removeItem('2fa_identifier')
    localStorage.removeItem('2fa_qr_code')
    localStorage.removeItem('2fa_admin_id')

    // Clear access token cookie
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  }
}

// Export singleton
const authService = new AuthService()
export default authService

// Export class
export { AuthService }

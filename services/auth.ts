import api, { ApiResponse, handleApiError } from './api'
import { AxiosError } from 'axios'
import { LoginCredentials, LoginResponse, User } from '@/types/auth'

// Essential auth service
class AuthService {
  /**
   * User login
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Validate session hash
      const storedHash = localStorage.getItem('session_hash')
      if (!storedHash || storedHash !== credentials.sessionUUID) {
        throw new Error('Invalid session.')
      }

      const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials)

      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data.data

        // Store tokens and user data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('user', JSON.stringify(user))

        // Set access token cookie for middleware validation
        document.cookie = `accessToken=${accessToken}; path=/; ${process.env.NODE_ENV === 'production' ? 'secure;' : ''} samesite=strict; max-age=3600`

        // Clear session hash
        localStorage.removeItem('session_hash')

        return response.data.data
      } else {
        throw new Error(response.data.message || 'Login failed')
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

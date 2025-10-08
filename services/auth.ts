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
      // Validate session UUID
      const storedUUID = localStorage.getItem('login_session_uuid')
      if (!storedUUID || storedUUID !== credentials.sessionUUID) {
        throw new Error('Invalid session. Please refresh the page and try again.')
      }

      const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials)

      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data.data

        // Store tokens and user data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('user', JSON.stringify(user))

        // Clear login session UUID
        localStorage.removeItem('login_session_uuid')

        return response.data.data
      } else {
        throw new Error(response.data.message || 'Login failed')
      }
    } catch (error) {
      // Clear session UUID on error
      localStorage.removeItem('login_session_uuid')
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
      // Redirect to login
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
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  /**
   * Clear auth data
   */
  clearLocalStorage(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    localStorage.removeItem('login_session_uuid')
  }
}

// Export singleton
const authService = new AuthService()
export default authService

// Export class
export { AuthService }

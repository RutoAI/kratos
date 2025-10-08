import api, { ApiResponse, handleApiError } from './api'
import { AxiosError } from 'axios'
import {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
  User,
  ChangePasswordRequest,
  ResetPasswordRequest,
  VerifyResetTokenRequest,
} from '@/types/auth'

// AuthService class with all authentication methods
class AuthService {
  /**
   * Login user with email, password and turnstile token
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials)

      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data.data

        // Store tokens in localStorage
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('user', JSON.stringify(user))

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
   * Logout user and clear local storage
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate token on server
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear local storage
      this.clearLocalStorage()
      // Redirect to login page
      window.location.href = '/login'
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('No refresh token found')
      }

      const response = await api.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', {
        refreshToken,
      })

      if (response.data.success) {
        const { accessToken } = response.data.data
        localStorage.setItem('accessToken', accessToken)
        return accessToken
      } else {
        throw new Error(response.data.message || 'Token refresh failed')
      }
    } catch (error) {
      this.clearLocalStorage()
      window.location.href = '/login'
      throw error
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/me')

      if (response.data.success) {
        // Update user info in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data))
        return response.data.data
      } else {
        throw new Error(response.data.message || 'Failed to get user info')
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError)
      throw new Error(errorMessage)
    }
  }

  /**
   * Change user password
   */
  async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    try {
      const response = await api.put<ApiResponse<void>>('/auth/change-password', passwordData)

      if (!response.data.success) {
        throw new Error(response.data.message || 'Password change failed')
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError)
      throw new Error(errorMessage)
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(resetData: ResetPasswordRequest): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/reset-password', resetData)

      if (!response.data.success) {
        throw new Error(response.data.message || 'Password reset request failed')
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError)
      throw new Error(errorMessage)
    }
  }

  /**
   * Verify reset token and set new password
   */
  async verifyResetToken(verifyData: VerifyResetTokenRequest): Promise<void> {
    try {
      const response = await api.post<ApiResponse<void>>('/auth/verify-reset', verifyData)

      if (!response.data.success) {
        throw new Error(response.data.message || 'Password reset verification failed')
      }
    } catch (error) {
      const errorMessage = handleApiError(error as AxiosError)
      throw new Error(errorMessage)
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')
    return !!(token && user)
  }

  /**
   * Get stored user data
   */
  getStoredUser(): User | null {
    try {
      const userString = localStorage.getItem('user')
      return userString ? JSON.parse(userString) : null
    } catch (error) {
      console.error('Error parsing stored user:', error)
      return null
    }
  }

  /**
   * Get stored access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  /**
   * Get stored refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  /**
   * Clear all auth data from localStorage
   */
  clearLocalStorage(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  /**
   * Check if user has specific permission
   */
  hasPermission(permission: string): boolean {
    const user = this.getStoredUser()
    return user?.permissions?.includes(permission) || false
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    const user = this.getStoredUser()
    return user?.role === role
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.hasRole('admin') || this.hasRole('super_admin')
  }
}

// Export singleton instance
const authService = new AuthService()
export default authService

// Export the class for testing or advanced usage
export { AuthService }

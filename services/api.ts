import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.rutowallet.com'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add auth token to requests
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add request timestamp
    config.headers['X-Request-Timestamp'] = new Date().toISOString()

    console.log(`🚀 [API Request] ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data,
    })

    return config
  },
  (error: AxiosError) => {
    console.error('❌ [API Request Error]', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log(
      `✅ [API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
      {
        status: response.status,
        data: response.data,
      }
    )
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    console.error(`❌ [API Response Error] ${error.response?.status}`, {
      url: error.config?.url,
      message: error.message,
      response: error.response?.data,
    })

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          })

          const { accessToken } = response.data
          localStorage.setItem('accessToken', accessToken)

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`

          return api(originalRequest)
        }
      } catch (refreshError) {
        console.error('❌ [Token Refresh Error]', refreshError)
        // Redirect to login or handle logout
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      }
    }

    // Handle other error status codes
    if (error.response?.status === 403) {
      console.error('❌ [Forbidden] Insufficient permissions')
      // Handle forbidden access
    }

    if (error.response?.status === 500) {
      console.error('❌ [Server Error] Internal server error')
      // Handle server errors
    }

    return Promise.reject(error)
  }
)

// Export the configured axios instance
export default api

// Export types for better TypeScript support
export type { InternalAxiosRequestConfig, AxiosResponse, AxiosError }

// Helper function to handle API errors
export const handleApiError = (error: AxiosError): string => {
  if (error.response?.data && typeof error.response.data === 'object') {
    const data = error.response.data as any
    return data.message || data.error || 'An unexpected error occurred'
  }

  if (error.message) {
    return error.message
  }

  return 'Network error. Please check your connection.'
}

// API response wrapper type
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: string
}

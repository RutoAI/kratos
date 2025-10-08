// Authentication related types

export interface LoginCredentials {
  email: string
  password: string
  turnstileToken: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    role: string
    permissions: string[]
    lastLogin?: string
    currentIp?: string
    lastLoginIp?: string
  }
}

export interface RefreshTokenResponse {
  accessToken: string
}

export interface User {
  id: string
  email: string
  role: string
  permissions: string[]
  createdAt: string
  updatedAt: string
  lastLogin?: string
  isActive: boolean
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface ResetPasswordRequest {
  email: string
  turnstileToken: string
}

export interface VerifyResetTokenRequest {
  token: string
  newPassword: string
}

export interface AuthUser {
  id: string
  email: string
  role: string
  permissions: string[]
  lastLogin?: string
  currentIp?: string
  lastLoginIp?: string
}

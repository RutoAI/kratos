// Auth types

export interface LoginCredentials {
  email: string
  password: string
  turnstileToken: string
  sessionUUID: string
}

export interface LoginResponse {
  accessToken?: string
  refreshToken?: string
  user?: {
    id: string
    email: string
    role: string
    permissions: string[]
    lastLogin?: string
    currentIp?: string
    lastLoginIp?: string
  }
  // 2FA Setup fields
  qr_code_base64?: string
  secret?: string
  identifier?: string
}

export interface Confirm2FARequest {
  identifier: string
  code: string
  email_code: string
}

export interface Confirm2FAResponse {
  token: string
  refresh_token: string
  admin: {
    id: string
    email: string
    role: string
    permissions: string[]
    lastLogin?: string
    currentIp?: string
    lastLoginIp?: string
  }
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

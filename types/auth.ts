// Auth types

// API request for login (only what backend needs)
export interface LoginCredentials {
  email: string
  password: string
  turnstile_token: string
}

// Internal client-side login data (includes session validation)
export interface LoginRequest extends LoginCredentials {
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
  admin_id?: string
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

// Device hash response
export interface DeviceHashResponse {
  success: boolean
  message: string
  status_code: number
  data: {
    device_hash: string
    ip_address: string
  }
}

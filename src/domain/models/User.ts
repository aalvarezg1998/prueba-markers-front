/**
 * DOMAIN LAYER - Models
 * Modelos de dominio puros sin lógica de infraestructura
 */

import { UserRole } from '../enums'

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  createdAt: Date
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  fullName: string
  role?: UserRole
}

export interface AuthResponse {
  token: string
  userId: string
  email: string
  fullName: string
  role: string
}

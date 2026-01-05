/**
 * INFRASTRUCTURE LAYER - Auth Adapter
 * Implementación del puerto de autenticación
 */

import { AuthPort } from '@application/ports/AuthPort'
import { AuthCredentials, AuthResponse, RegisterData } from '@domain/models/User'
import { httpClient } from '../http/HttpClient'

export class AuthAdapter implements AuthPort {
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>('/auth/login', credentials)
      
      // Guardar token y datos del usuario
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response))
      
      return response
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed. Please check your credentials.'
      throw new Error(message)
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>('/auth/register', data)
      
      // Guardar token y datos del usuario
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response))
      
      return response
    } catch (error: any) {
      const message = error.response?.data?.error || 'Registration failed. Please try again.'
      throw new Error(message)
    }
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null
  }

  getUserRole(): string | null {
    const userData = localStorage.getItem('user')
    if (!userData) return null

    try {
      const user = JSON.parse(userData)
      return user.role
    } catch {
      return null
    }
  }
}

export const authAdapter = new AuthAdapter()

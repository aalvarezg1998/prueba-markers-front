/**
 * APPLICATION LAYER - Auth Port
 * Puerto de salida para autenticación
 */

import { AuthCredentials, AuthResponse, RegisterData } from '@domain/models/User'

export interface AuthPort {
  login(credentials: AuthCredentials): Promise<AuthResponse>
  register(data: RegisterData): Promise<AuthResponse>
  logout(): void
  getToken(): string | null
  isAuthenticated(): boolean
  getUserRole(): string | null
}

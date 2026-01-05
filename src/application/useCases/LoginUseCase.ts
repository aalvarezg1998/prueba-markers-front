/**
 * APPLICATION LAYER - Login Use Case
 * Caso de uso para iniciar sesión
 */

import { AuthCredentials, AuthResponse } from '@domain/models/User'
import { validateEmail, validatePassword } from '@domain/validators'
import { AuthPort } from '../ports/AuthPort'

export class LoginUseCase {
  constructor(private authPort: AuthPort) {}

  async execute(credentials: AuthCredentials): Promise<AuthResponse> {
    // Validaciones de dominio
    validateEmail(credentials.email)
    validatePassword(credentials.password)

    // Delegar a la infraestructura
    return await this.authPort.login(credentials)
  }
}

/**
 * APPLICATION LAYER - Register Use Case
 * Caso de uso para registrar un nuevo usuario
 */

import { RegisterData, AuthResponse } from '@domain/models/User'
import { validateEmail, validatePassword, validateFullName } from '@domain/validators'
import { AuthPort } from '../ports/AuthPort'

export class RegisterUseCase {
  constructor(private authPort: AuthPort) {}

  async execute(data: RegisterData): Promise<AuthResponse> {
    // Validaciones de dominio
    validateEmail(data.email)
    validatePassword(data.password)
    validateFullName(data.fullName)

    // Delegar a la infraestructura
    return await this.authPort.register(data)
  }
}

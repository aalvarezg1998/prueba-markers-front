/**
 * APPLICATION LAYER - Get All Loans Use Case
 * Caso de uso para obtener todos los préstamos (Admin)
 */

import { Loan } from '@domain/models/Loan'
import { LoanPort } from '../ports/LoanPort'

export class GetAllLoansUseCase {
  constructor(private loanPort: LoanPort) {}

  async execute(): Promise<Loan[]> {
    return await this.loanPort.getAllLoans()
  }
}

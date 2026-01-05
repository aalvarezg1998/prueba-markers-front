/**
 * APPLICATION LAYER - Get My Loans Use Case
 * Caso de uso para obtener los préstamos del usuario actual
 */

import { Loan } from '@domain/models/Loan'
import { LoanPort } from '../ports/LoanPort'

export class GetMyLoansUseCase {
  constructor(private loanPort: LoanPort) {}

  async execute(): Promise<Loan[]> {
    return await this.loanPort.getMyLoans()
  }
}

/**
 * APPLICATION LAYER - Approve Loan Use Case
 * Caso de uso para aprobar un préstamo (Admin)
 */

import { Loan } from '@domain/models/Loan'
import { LoanPort } from '../ports/LoanPort'

export class ApproveLoanUseCase {
  constructor(private loanPort: LoanPort) {}

  async execute(loanId: string): Promise<Loan> {
    if (!loanId || loanId.trim().length === 0) {
      throw new Error('Loan ID is required')
    }

    return await this.loanPort.approveLoan(loanId)
  }
}

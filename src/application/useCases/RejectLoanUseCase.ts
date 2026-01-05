/**
 * APPLICATION LAYER - Reject Loan Use Case
 * Caso de uso para rechazar un préstamo (Admin)
 */

import { Loan, RejectLoanRequest } from '@domain/models/Loan'
import { validateRejectionReason } from '@domain/validators'
import { LoanPort } from '../ports/LoanPort'

export class RejectLoanUseCase {
  constructor(private loanPort: LoanPort) {}

  async execute(request: RejectLoanRequest): Promise<Loan> {
    if (!request.loanId || request.loanId.trim().length === 0) {
      throw new Error('Loan ID is required')
    }

    // Validación de dominio
    validateRejectionReason(request.reason)

    return await this.loanPort.rejectLoan(request)
  }
}

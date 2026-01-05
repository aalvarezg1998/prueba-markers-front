/**
 * APPLICATION LAYER - Request Loan Use Case
 * Caso de uso para solicitar un préstamo
 */

import { Loan, LoanRequest } from '@domain/models/Loan'
import { validateLoanAmount, validateTermMonths, validateLoanPurpose } from '@domain/validators'
import { LoanPort } from '../ports/LoanPort'

export class RequestLoanUseCase {
  constructor(private loanPort: LoanPort) {}

  async execute(request: LoanRequest): Promise<Loan> {
    // Validaciones de dominio
    validateLoanAmount(request.amount)
    validateTermMonths(request.termMonths)
    validateLoanPurpose(request.purpose)

    // Delegar a la infraestructura
    return await this.loanPort.requestLoan(request)
  }
}

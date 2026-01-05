/**
 * APPLICATION LAYER - Loan Port
 * Puerto de salida para operaciones de préstamos
 */

import { Loan, LoanRequest, RejectLoanRequest } from '@domain/models/Loan'

export interface LoanPort {
  requestLoan(request: LoanRequest): Promise<Loan>
  getMyLoans(): Promise<Loan[]>
  getAllLoans(): Promise<Loan[]>
  approveLoan(loanId: string): Promise<Loan>
  rejectLoan(request: RejectLoanRequest): Promise<Loan>
}

/**
 * DOMAIN LAYER - Loan Models
 * Modelos de dominio para préstamos
 */

import { LoanStatus } from '../enums'

export interface Loan {
  id: string
  userId: string
  userName: string
  userEmail: string
  amount: number
  termMonths: number
  purpose: string
  status: LoanStatus
  monthlyPayment: number
  totalPayment: number
  requestedAt: Date
  processedAt?: Date
  processedByUserName?: string
  rejectionReason?: string
}

export interface LoanRequest {
  amount: number
  termMonths: number
  purpose: string
}

export interface RejectLoanRequest {
  loanId: string
  reason: string
}

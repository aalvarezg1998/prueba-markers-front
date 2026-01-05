/**
 * INFRASTRUCTURE LAYER - Loan Adapter
 * Implementación del puerto de préstamos
 */

import { LoanPort } from '@application/ports/LoanPort'
import { Loan, LoanRequest, RejectLoanRequest } from '@domain/models/Loan'
import { LoanStatus } from '@domain/enums'
import { httpClient } from '../http/HttpClient'

interface LoanDTO {
  id: string
  userId: string
  userName: string
  userEmail: string
  amount: number
  termMonths: number
  purpose: string
  status: string
  monthlyPayment: number
  totalPayment: number
  requestedAt: string
  processedAt?: string
  processedByUserName?: string
  rejectionReason?: string
}

export class LoanAdapter implements LoanPort {
  private mapDTOToLoan(dto: LoanDTO): Loan {
    return {
      id: dto.id,
      userId: dto.userId,
      userName: dto.userName,
      userEmail: dto.userEmail,
      amount: dto.amount,
      termMonths: dto.termMonths,
      purpose: dto.purpose,
      status: dto.status as LoanStatus,
      monthlyPayment: dto.monthlyPayment,
      totalPayment: dto.totalPayment,
      requestedAt: new Date(dto.requestedAt),
      processedAt: dto.processedAt ? new Date(dto.processedAt) : undefined,
      processedByUserName: dto.processedByUserName,
      rejectionReason: dto.rejectionReason,
    }
  }

  async requestLoan(request: LoanRequest): Promise<Loan> {
    try {
      const dto = await httpClient.post<LoanDTO>('/loans', request)
      return this.mapDTOToLoan(dto)
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to request loan. Please try again.'
      throw new Error(message)
    }
  }

  async getMyLoans(): Promise<Loan[]> {
    try {
      const dtos = await httpClient.get<LoanDTO[]>('/loans/my-loans')
      return dtos.map((dto) => this.mapDTOToLoan(dto))
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to fetch your loans.'
      throw new Error(message)
    }
  }

  async getAllLoans(): Promise<Loan[]> {
    try {
      const dtos = await httpClient.get<LoanDTO[]>('/loans')
      return dtos.map((dto) => this.mapDTOToLoan(dto))
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to fetch loans.'
      throw new Error(message)
    }
  }

  async approveLoan(loanId: string): Promise<Loan> {
    try {
      const dto = await httpClient.put<LoanDTO>(`/loans/${loanId}/approve`)
      return this.mapDTOToLoan(dto)
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to approve loan.'
      throw new Error(message)
    }
  }

  async rejectLoan(request: RejectLoanRequest): Promise<Loan> {
    try {
      const dto = await httpClient.put<LoanDTO>(`/loans/${request.loanId}/reject`, {
        reason: request.reason,
      })
      return this.mapDTOToLoan(dto)
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to reject loan.'
      throw new Error(message)
    }
  }
}

export const loanAdapter = new LoanAdapter()

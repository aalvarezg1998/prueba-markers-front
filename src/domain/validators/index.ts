/**
 * DOMAIN LAYER - Validations
 * Validaciones de negocio puras
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export const validateEmail = (email: string): void => {
  if (!email || email.trim().length === 0) {
    throw new ValidationError('Email is required')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format')
  }

  if (email.length > 255) {
    throw new ValidationError('Email cannot exceed 255 characters')
  }
}

export const validatePassword = (password: string): void => {
  if (!password || password.length === 0) {
    throw new ValidationError('Password is required')
  }

  if (password.length < 6) {
    throw new ValidationError('Password must be at least 6 characters')
  }

  if (password.length > 100) {
    throw new ValidationError('Password cannot exceed 100 characters')
  }
}

export const validateFullName = (fullName: string): void => {
  if (!fullName || fullName.trim().length === 0) {
    throw new ValidationError('Full name is required')
  }

  if (fullName.trim().length < 2) {
    throw new ValidationError('Full name must be at least 2 characters')
  }

  if (fullName.length > 200) {
    throw new ValidationError('Full name cannot exceed 200 characters')
  }
}

export const validateLoanAmount = (amount: number): void => {
  const minAmount = 1000
  const maxAmount = 1000000

  if (amount <= 0) {
    throw new ValidationError('Loan amount must be greater than zero')
  }

  if (amount < minAmount) {
    throw new ValidationError(`Loan amount must be at least $${minAmount.toLocaleString()}`)
  }

  if (amount > maxAmount) {
    throw new ValidationError(`Loan amount cannot exceed $${maxAmount.toLocaleString()}`)
  }
}

export const validateTermMonths = (termMonths: number): void => {
  const minTerm = 6
  const maxTerm = 360

  if (termMonths < minTerm) {
    throw new ValidationError(`Loan term must be at least ${minTerm} months`)
  }

  if (termMonths > maxTerm) {
    throw new ValidationError(`Loan term cannot exceed ${maxTerm} months (30 years)`)
  }
}

export const validateLoanPurpose = (purpose: string): void => {
  if (!purpose || purpose.trim().length === 0) {
    throw new ValidationError('Loan purpose is required')
  }

  if (purpose.trim().length < 10) {
    throw new ValidationError('Loan purpose must be at least 10 characters')
  }

  if (purpose.length > 500) {
    throw new ValidationError('Loan purpose cannot exceed 500 characters')
  }
}

export const validateRejectionReason = (reason: string): void => {
  if (!reason || reason.trim().length === 0) {
    throw new ValidationError('Rejection reason is required')
  }

  if (reason.trim().length < 10) {
    throw new ValidationError('Rejection reason must be at least 10 characters')
  }

  if (reason.length > 500) {
    throw new ValidationError('Rejection reason cannot exceed 500 characters')
  }
}

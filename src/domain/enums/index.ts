/**
 * DOMAIN LAYER - Enums
 * Enumeraciones del dominio sin dependencias externas
 */

export enum LoanStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum UserRole {
  User = 'User',
  Admin = 'Admin',
}

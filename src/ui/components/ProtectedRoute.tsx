/**
 * UI LAYER - Protected Route Component
 * Componente para proteger rutas que requieren autenticación
 */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@application/context/AuthContext'
import { UserRole } from '@domain/enums'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

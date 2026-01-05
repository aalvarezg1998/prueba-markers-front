/**
 * APPLICATION LAYER - Auth Context
 * Gestión de estado de autenticación
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthResponse } from '@domain/models/User'
import { UserRole } from '@domain/enums'

interface AuthContextType {
  user: AuthResponse | null
  isAuthenticated: boolean
  isAdmin: boolean
  isUser: boolean
  login: (authResponse: AuthResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null)

  useEffect(() => {
    // Cargar usuario del localStorage al iniciar
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = (authResponse: AuthResponse) => {
    setUser(authResponse)
    localStorage.setItem('token', authResponse.token)
    localStorage.setItem('user', JSON.stringify(authResponse))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isAuthenticated = user !== null
  const isAdmin = user?.role === UserRole.Admin
  const isUser = user?.role === UserRole.User

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

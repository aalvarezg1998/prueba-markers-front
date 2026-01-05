/**
 * UI LAYER - Main App Component
 * Componente principal con rutas y providers
 */

import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { AuthProvider } from '@application/context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ColorShowcase } from './components/ColorShowcase'
import { UserRole } from '@domain/enums'

// Lazy loading de páginas
const UserDashboard = React.lazy(() => import('./pages/UserDashboard'))
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'))

// Tema actualizado con colores Solidos Azules
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',      // Azul solido principal
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1565c0',      // Azul oscuro como secundario
      light: '#5e92f3',
      dark: '#003c8f',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
})

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <React.Suspense fallback={<div>Cargando...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Ruta temporal para ver el sistema de colores */}
              <Route path="/colors" element={<ColorShowcase />} />
              
              <Route
                path="/user/dashboard"
                element={
                  <ProtectedRoute requiredRole={UserRole.User}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requiredRole={UserRole.Admin}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

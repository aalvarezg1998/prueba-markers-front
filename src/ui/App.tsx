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

// Tema actualizado con colores de Makers
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2d3561',      // Color principal del logo makers
      light: '#3d4575',
      dark: '#1d2541',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e91e8c',      // Rosa/magenta del gradiente makers
      light: '#ff4081',
      dark: '#c2185b',
      contrastText: '#ffffff',
    },
    info: {
      main: '#00bcd4',      // Cyan del gradiente makers
      light: '#00e5ff',
      dark: '#0097a7',
    },
    success: {
      main: '#8bc34a',      // Verde lima del gradiente makers
      light: '#b2ff59',
      dark: '#689f38',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
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
          <React.Suspense fallback={<div>Loading...</div>}>
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

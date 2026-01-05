/**
 * UI LAYER - Register Page
 * Página de registro de usuarios
 */

import React, { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuth } from '@application/context/AuthContext'
import { RegisterUseCase } from '@application/useCases/RegisterUseCase'
import { authAdapter } from '@infrastructure/adapters/AuthAdapter'
import { UserRole } from '@domain/enums'

const registerUseCase = new RegisterUseCase(authAdapter)

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    try {
      const response = await registerUseCase.execute({
        email,
        password,
        fullName,
        role: UserRole.User,
      })
      
      login(response)
      navigate('/user/dashboard')
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error durante el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 3,
            background: 'var(--gradient-makers)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box className="gradient-makers-text" sx={{ 
              backgroundColor: 'white',
              display: 'inline-block',
              p: 1,
              borderRadius: 2,
              mb: 2
            }}>
               <Typography variant="h3" component="h1" fontWeight="800" sx={{
                 color: 'var(--color-primary)',
                 letterSpacing: '-1px'
               }}>
                 makers
               </Typography>
            </Box>
            <Typography variant="h5" component="h2" fontWeight="bold">
              Crear Cuenta
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
              Únete para empezar a gestionar tus préstamos
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.9)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                '& .MuiInputBase-input': { color: 'white' },
              }}
            />

            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.9)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                '& .MuiInputBase-input': { color: 'white' },
              }}
            />

            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.9)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                '& .MuiInputBase-input': { color: 'white' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirmar Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.9)' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                '& .MuiInputBase-input': { color: 'white' },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mb: 2,
                py: 1.5,
                backgroundColor: 'white',
                color: 'var(--color-primary)',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}
                >
                  Inicia Sesión
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}

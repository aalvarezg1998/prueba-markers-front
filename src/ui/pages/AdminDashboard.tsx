/**
 * UI LAYER - Admin Dashboard
 * Dashboard para administradores
 */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Logout, Check, Close } from '@mui/icons-material'
import { useAuth } from '@application/context/AuthContext'
import { GetAllLoansUseCase } from '@application/useCases/GetAllLoansUseCase'
import { ApproveLoanUseCase } from '@application/useCases/ApproveLoanUseCase'
import { RejectLoanUseCase } from '@application/useCases/RejectLoanUseCase'
import { loanAdapter } from '@infrastructure/adapters/LoanAdapter'
import { Loan } from '@domain/models/Loan'
import { LoanStatus } from '@domain/enums'

const getAllLoansUseCase = new GetAllLoansUseCase(loanAdapter)
const approveLoanUseCase = new ApproveLoanUseCase(loanAdapter)
const rejectLoanUseCase = new RejectLoanUseCase(loanAdapter)

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [actionError, setActionError] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    loadLoans()
  }, [])

  const loadLoans = async () => {
    try {
      setLoading(true)
      const data = await getAllLoansUseCase.execute()
      setLoans(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleApproveLoan = async (loanId: string) => {
    try {
      setProcessing(true)
      await approveLoanUseCase.execute(loanId)
      loadLoans()
    } catch (err: any) {
      setActionError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  const handleRejectLoan = async () => {
    if (!selectedLoan) return

    try {
      setProcessing(true)
      await rejectLoanUseCase.execute({
        loanId: selectedLoan.id,
        reason: rejectionReason,
      })
      
      setRejectDialogOpen(false)
      setSelectedLoan(null)
      setRejectionReason('')
      loadLoans()
    } catch (err: any) {
      setActionError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  const openRejectDialog = (loan: Loan) => {
    setSelectedLoan(loan)
    setRejectDialogOpen(true)
    setActionError('')
  }

  const getStatusColor = (status: LoanStatus) => {
    switch (status) {
      case LoanStatus.Pending:
        return 'warning'
      case LoanStatus.Approved:
        return 'success'
      case LoanStatus.Rejected:
        return 'error'
      default:
        return 'default'
    }
  }

  const getTranslatedStatus = (status: LoanStatus) => {
    switch (status) {
      case LoanStatus.Pending:
        return 'Pendiente'
      case LoanStatus.Approved:
        return 'Aprobado'
      case LoanStatus.Rejected:
        return 'Rechazado'
      default:
        return status
    }
  }

  return (
    <Box>
      <AppBar position="static" sx={{ background: 'var(--color-primary)', color: 'white' }}>
        <Toolbar>
          <Box className="gradient-makers-text" sx={{ 
            backgroundColor: 'white',
            display: 'inline-block',
            px: 1,
            borderRadius: 1,
            mr: 2
          }}>
             <Typography variant="h6" component="div" fontWeight="800" sx={{
               color: 'var(--color-primary)',
               letterSpacing: '-0.5px'
             }}>
               makers admin
             </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, opacity: 0.8, mr: 2, display: { xs: 'none', sm: 'block' } }}>
            Panel
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.fullName}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
          Solicitudes de Préstamos
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {actionError && <Alert severity="error" sx={{ mb: 2 }}>{actionError}</Alert>}

        {loading ? (
          <Typography>Cargando...</Typography>
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>Usuario</strong></TableCell>
                  <TableCell><strong>Monto</strong></TableCell>
                  <TableCell><strong>Plazo</strong></TableCell>
                  <TableCell><strong>Propósito</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell><strong>Solicitado</strong></TableCell>
                  <TableCell align="center"><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {loan.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {loan.userEmail}
                      </Typography>
                    </TableCell>
                    <TableCell>${loan.amount.toLocaleString()}</TableCell>
                    <TableCell>{loan.termMonths} meses</TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" noWrap>
                        {loan.purpose}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getTranslatedStatus(loan.status)}
                        color={getStatusColor(loan.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(loan.requestedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {loan.status === LoanStatus.Pending && (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<Check />}
                            onClick={() => handleApproveLoan(loan.id)}
                            disabled={processing}
                          >
                            Aprobar
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            startIcon={<Close />}
                            onClick={() => openRejectDialog(loan)}
                            disabled={processing}
                          >
                            Rechazar
                          </Button>
                        </Box>
                      )}
                      {loan.status !== LoanStatus.Pending && (
                        <Typography variant="caption" color="text.secondary">
                          Procesado
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Rechazar Solicitud</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Por favor, indique la razón para rechazar esta solicitud.
          </Alert>
          
          <TextField
            fullWidth
            label="Razón de Rechazo"
            multiline
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            sx={{ mt: 2 }}
            helperText="Min: 10 caracteres - Max: 500 caracteres"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleRejectLoan}
            variant="contained"
            color="error"
            disabled={processing || rejectionReason.length < 10}
          >
            {processing ? 'Rechazando...' : 'Confirmar Rechazo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminDashboard

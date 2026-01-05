/**
 * UI LAYER - User Dashboard
 * Dashboard para usuarios regulares
 */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
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
  Card,
  CardContent,
} from '@mui/material'
import { Logout, Add } from '@mui/icons-material'
import { useAuth } from '@application/context/AuthContext'
import { RequestLoanUseCase } from '@application/useCases/RequestLoanUseCase'
import { GetMyLoansUseCase } from '@application/useCases/GetMyLoansUseCase'
import { loanAdapter } from '@infrastructure/adapters/LoanAdapter'
import { Loan } from '@domain/models/Loan'
import { LoanStatus } from '@domain/enums'

const requestLoanUseCase = new RequestLoanUseCase(loanAdapter)
const getMyLoansUseCase = new GetMyLoansUseCase(loanAdapter)

const UserDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [loans, setLoans] = useState<Loan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  
  // Form state
  const [amount, setAmount] = useState('')
  const [termMonths, setTermMonths] = useState('')
  const [purpose, setPurpose] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadLoans()
  }, [])

  const loadLoans = async () => {
    try {
      setLoading(true)
      const data = await getMyLoansUseCase.execute()
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

  const handleSubmitLoan = async () => {
    setFormError('')
    setSubmitting(true)

    try {
      await requestLoanUseCase.execute({
        amount: parseFloat(amount),
        termMonths: parseInt(termMonths),
        purpose,
      })
      
      setOpenDialog(false)
      setAmount('')
      setTermMonths('')
      setPurpose('')
      loadLoans()
    } catch (err: any) {
      setFormError(err.message)
    } finally {
      setSubmitting(false)
    }
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

  return (
    <Box>
      <AppBar position="static" sx={{ background: 'var(--gradient-makers)', color: 'white' }}>
        <Toolbar>
          <Box className="gradient-makers-text" sx={{ 
            backgroundColor: 'white',
            display: 'inline-block',
            px: 1,
            borderRadius: 1,
            mr: 2
          }}>
             <Typography variant="h6" component="div" fontWeight="800" sx={{
               background: 'var(--gradient-makers)',
               WebkitBackgroundClip: 'text',
               WebkitTextFillColor: 'transparent',
               letterSpacing: '-0.5px'
             }}>
               makers loan system
             </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.fullName}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            My Loans
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            sx={{
              background: 'var(--gradient-makers)',
              color: 'white',
              fontWeight: 'bold',
              px: 3,
            }}
          >
            Request New Loan
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {loading ? (
          <Typography>Loading...</Typography>
        ) : loans.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              You don't have any loans yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Click "Request New Loan" to get started
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {loans.map((loan) => (
              <Grid item xs={12} md={6} key={loan.id}>
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        ${loan.amount.toLocaleString()}
                      </Typography>
                      <Chip
                        label={loan.status}
                        color={getStatusColor(loan.status)}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Term:</strong> {loan.termMonths} months
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Monthly Payment:</strong> ${loan.monthlyPayment.toLocaleString()}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Total Payment:</strong> ${loan.totalPayment.toLocaleString()}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Purpose:</strong> {loan.purpose}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Requested:</strong> {new Date(loan.requestedAt).toLocaleDateString()}
                    </Typography>
                    
                    {loan.rejectionReason && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        <strong>Rejection Reason:</strong> {loan.rejectionReason}
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request New Loan</DialogTitle>
        <DialogContent>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          
          <TextField
            fullWidth
            label="Loan Amount ($)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
            helperText="Min: $1,000 - Max: $1,000,000"
          />
          
          <TextField
            fullWidth
            label="Term (months)"
            type="number"
            value={termMonths}
            onChange={(e) => setTermMonths(e.target.value)}
            sx={{ mb: 2 }}
            helperText="Min: 6 months - Max: 360 months"
          />
          
          <TextField
            fullWidth
            label="Purpose"
            multiline
            rows={4}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            helperText="Min: 10 characters - Max: 500 characters"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSubmitLoan}
            variant="contained"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserDashboard

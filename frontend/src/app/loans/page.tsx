 import React from 'react';
import { Container, Typography } from '@mui/material';
import LoanList from '@src/components/LoanList';
 
export default function LoansPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Listagem de Empréstimos
      </Typography>
      <LoanList />
    </Container>
  );
}

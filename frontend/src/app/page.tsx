import React from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';

export default function HomePage() {
  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Bem-vindo à CrediCorp
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Soluções inteligentes em microcrédito para impulsionar o seu negócio.
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" component={Link} href="/loan-request">
          Nova Solicitação
        </Button>
        <Button variant="outlined" component={Link} href="/loans">
          Visualizar Empréstimos
        </Button>
      </Box>
    </Container>
  );
}

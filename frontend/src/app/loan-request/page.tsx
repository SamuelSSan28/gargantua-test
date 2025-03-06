import React from "react";
 import { Container } from "@mui/material";
import LoanForm from "@src/components/LoanForm";
 
 
export default function LoanRequestPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <LoanForm />
    </Container>
  );
}

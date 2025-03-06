"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, CircularProgress, Typography } from "@mui/material";
import LoanDetails from "@src/components/LoanDetails";
import { getLoanById, Loan } from "@src/api/loans";

export default function LoanDetailPage() {
  const { id } = useParams();
  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const data = await getLoanById(String(id));
          setLoan(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!loan) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">Empréstimo não encontrado.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <LoanDetails {...loan} />
    </Container>
  );
}

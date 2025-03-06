"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/navigation";
import { getLoans, Loan } from "@src/api/loans";
import StatusChip from "./StatusChip";

const LoanList: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const fetchLoans = async (pageNumber: number) => {
    try {
      const { loans, total } = await getLoans(pageNumber, rowsPerPage);
      setLoans(loans);
      setTotal(total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLoans(page);
  }, [page]);

  // TablePagination utiliza páginas 0-indexadas, então convertemos
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Cliente</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id} hover>
                <TableCell>{loan.name}</TableCell>
                <TableCell>{loan.value}</TableCell>
                <TableCell>
                  <StatusChip status={loan.status || ""} />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    startIcon={<InfoIcon />}
                    onClick={() => router.push(`/loans/${loan.id}`)}
                    disabled={loan.status === "PENDING"}
                  >
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </Paper>
  );
};

export default LoanList;

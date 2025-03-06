import { Loan } from "src/entities/loan.entity";

export interface ILoanRepository {
  createLoan(loan: Loan): Promise<Loan>;
  findById(id: number): Promise<Loan | null>;
  findAll(
    page: number,
    limit: number,
  ): Promise<{ data: Loan[]; total: number }>;
  updateLoan(loan: Loan): Promise<Loan>;
}

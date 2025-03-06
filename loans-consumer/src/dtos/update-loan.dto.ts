// Caso não use PartialType, você pode definir manualmente:
import { LoanStatus } from 'src/entities/loan.entity';

export class UpdateLoanDto {
  clientName?: string;
  amount?: number;
  latitude?: number;
  longitude?: number;
  status?: LoanStatus;
}

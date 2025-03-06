// src/services/loans.service.ts
import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from 'src/dtos/create-loan.dto';
import { CreateLoanUseCase } from 'src/usescases/create-loan.usecase';
import { GetLoanDetailsUseCase } from 'src/usescases/get-loan-details.usecase';
import { ListLoansUseCase } from 'src/usescases/list-loans.usecase';

@Injectable()
export class LoansService {
  constructor(
    private readonly createLoanUseCase: CreateLoanUseCase,
    private readonly listLoansUseCase: ListLoansUseCase,
    private readonly getLoanDetailsUseCase: GetLoanDetailsUseCase,
  ) {}

  createLoan(dto: CreateLoanDto) {
    return this.createLoanUseCase.execute(dto);
  }

  listLoans(page: number, limit: number) {
    return this.listLoansUseCase.execute(page, limit);
  }

  getLoanDetails(id: number) {
    return this.getLoanDetailsUseCase.execute(id);
  }
}

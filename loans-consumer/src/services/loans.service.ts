import { Injectable } from '@nestjs/common';
import { GetLoanDetailsUseCase } from 'src/usescases/get-loan-details.usecase';

import { UpdateLoanUseCase } from 'src/usescases/update-loan.usecase';
import { Loan } from 'src/entities/loan.entity';

@Injectable()
export class LoansService {
  constructor(
    private readonly getLoanDetailsUseCase: GetLoanDetailsUseCase,
    private readonly updateLoanUseCase: UpdateLoanUseCase,
  ) {}

  getLoanDetails(id: number) {
    return this.getLoanDetailsUseCase.execute(id);
  }

  updateLoan(dto: Loan) {
    return this.updateLoanUseCase.execute(dto);
  }
}

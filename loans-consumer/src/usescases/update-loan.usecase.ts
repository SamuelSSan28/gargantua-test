import { Injectable } from '@nestjs/common';
import { LoanRepository } from 'src/adapters/persistence/loan.repository.typeorm';
import { Loan } from 'src/entities/loan.entity';

@Injectable()
export class UpdateLoanUseCase {
  constructor(private readonly loanRepository: LoanRepository) {}

  async execute(loan: Loan): Promise<Loan> {
    const updatedLoan = await this.loanRepository.updateLoan(loan);

    return updatedLoan;
  }
}

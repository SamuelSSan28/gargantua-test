import { Injectable, NotFoundException } from '@nestjs/common';
import { LoanRepository } from 'src/repositories/loan.repository';

import { Loan } from 'src/entities/loan.entity';

@Injectable()
export class GetLoanDetailsUseCase {
  constructor(private readonly loanRepository: LoanRepository) {}

  async execute(id: number): Promise<Loan> {
    const loan = await this.loanRepository.findById(id);
    if (!loan) {
      throw new NotFoundException('Empréstimo não encontrado');
    }
    return loan;
  }
}

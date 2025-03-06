import { Injectable } from '@nestjs/common';
import { Loan } from 'src/entities/loan.entity';
import { LoanRepository } from 'src/repositories/loan.repository';

@Injectable()
export class ListLoansUseCase {
  constructor(private readonly loanRepository: LoanRepository) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<{ data: Loan[]; total: number }> {
    return this.loanRepository.findAll(page, limit);
  }
}

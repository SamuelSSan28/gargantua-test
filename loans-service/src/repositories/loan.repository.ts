import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Loan } from 'src/entities/loan.entity';
import { ILoanRepository } from 'src/interfaces/repositories/loan.repository.interface';

@Injectable()
export class LoanRepository
  extends Repository<Loan>
  implements ILoanRepository
{
  constructor(private dataSource: DataSource) {
    super(Loan, dataSource.manager);
  }

  async createLoan(loan: Loan): Promise<Loan> {
    return await this.save(loan);
  }

  async findById(id: number): Promise<Loan | null> {
    return await this.findOne({ where: { id } });
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: Loan[]; total: number }> {
    const [data, total] = await this.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async updateLoan(loan: Loan): Promise<Loan> {
    return await this.save(loan);
  }
}

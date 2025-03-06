import { Injectable } from '@nestjs/common';
import { LoanRepository } from 'src/repositories/loan.repository';
import { CreateLoanDto } from 'src/dtos/create-loan.dto';
import { Loan, LoanStatus } from 'src/entities/loan.entity';
import { PublisherService } from 'src/services/publisher.service';

@Injectable()
export class CreateLoanUseCase {
  constructor(
    private readonly loanRepository: LoanRepository,
    private readonly publisherService: PublisherService,
  ) {}

  async execute(dto: CreateLoanDto): Promise<Loan> {
    const loan = new Loan();
    loan.clientName = dto.clientName;
    loan.amount = dto.amount;
    loan.latitude = dto.latitude;
    loan.longitude = dto.longitude;
    loan.status = LoanStatus.PENDING;

    const createdLoan = await this.loanRepository.createLoan(loan);

    this.publisherService.publishLoanCreated({
      loanId: createdLoan.id,
      latitude: createdLoan.latitude,
      longitude: createdLoan.longitude,
    });

    return createdLoan;
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/entities/loan.entity';
import { LoanRepository } from 'src/adapters/persistence/loan.repository.typeorm';
import { LoansService } from 'src/services/loans.service';
import {
  CREDIT_SCORE_SERVICE,
  GEOCODING_SERVICE,
  LOAN_REPOSITORY,
} from 'src/shared/constants';
import { LoanProcessingService } from 'src/services/loan-processing.service';
import { OpenWeatherAdapter } from 'src/adapters/external/openweather.adapter';
import { RandomNumberAdapter } from 'src/adapters/external/random-number.adapter';
import { LoanQueueConsumerController } from 'src/controllers/loan-queue.controller';
import { GetLoanDetailsUseCase } from 'src/usescases/get-loan-details.usecase';
import { UpdateLoanUseCase } from 'src/usescases/update-loan.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Loan])],
  controllers: [LoanQueueConsumerController],
  providers: [
    { provide: LOAN_REPOSITORY, useClass: LoanRepository },
    { provide: CREDIT_SCORE_SERVICE, useClass: RandomNumberAdapter },
    { provide: GEOCODING_SERVICE, useClass: OpenWeatherAdapter },
    LoanRepository,
    GetLoanDetailsUseCase,
    UpdateLoanUseCase,
    LoansService,
    LoanProcessingService,
  ],
  exports: [LOAN_REPOSITORY],
})
export class LoansModule {}

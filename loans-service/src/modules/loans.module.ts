import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/entities/loan.entity';
import { LoanRepository } from 'src/repositories/loan.repository';
import { CreateLoanUseCase } from 'src/usescases/create-loan.usecase';
import { ListLoansUseCase } from 'src/usescases/list-loans.usecase';
import { GetLoanDetailsUseCase } from 'src/usescases/get-loan-details.usecase';
import { LoansController } from 'src/controllers/loans.controller';
import { LoansService } from 'src/services/loans.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PublisherService } from 'src/services/publisher.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_PUBLISHER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'loan.created',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Loan]),
  ],
  controllers: [LoansController],
  providers: [
    PublisherService,
    LoanRepository,
    CreateLoanUseCase,
    ListLoansUseCase,
    GetLoanDetailsUseCase,
    LoansService,
  ],
  exports: [],
})
export class LoansModule {}

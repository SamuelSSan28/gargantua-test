import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { LoanProcessingService } from 'src/services/loan-processing.service';

@Controller()
export class LoanQueueConsumerController {
  constructor(private readonly loanProcessingService: LoanProcessingService) {}

  @MessagePattern('loan.created')
  async handleLoanCreated(@Payload() message: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      console.log('Mensagem recebida no consumer:', message);

      await this.loanProcessingService.processLoan(message.loanId);
      console.log('Loan processado com sucesso');
    } catch (error) {
      console.error('Erro no processamento da mensagem:', error);

      channel.nack(originalMsg, false, false);
    }
  }
}

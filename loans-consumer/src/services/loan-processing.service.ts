import { Inject, Injectable, Logger } from '@nestjs/common';
import { LoansService } from './loans.service';
import { Loan, LoanStatus } from 'src/entities/loan.entity';
import { IGeocodingService } from 'src/interfaces/external/geocoding.service.interface';
import { ICreditScoreService } from 'src/interfaces/external/credit-score.service.interface';
import { CREDIT_SCORE_SERVICE, GEOCODING_SERVICE } from 'src/shared/constants';

@Injectable()
export class LoanProcessingService {
  private readonly logger = new Logger(LoanProcessingService.name);

  constructor(
    private readonly loansService: LoansService,
    @Inject(GEOCODING_SERVICE)
    private readonly geocodingService: IGeocodingService,
    @Inject(CREDIT_SCORE_SERVICE)
    private readonly creditScoreService: ICreditScoreService,
  ) {}

  async processLoan(loanId: number): Promise<Loan> {
    const loan = await this.loansService.getLoanDetails(loanId);
    if (!loan) {
      throw new Error(`Loan com ID ${loanId} não encontrado`);
    }

    try {
      const geoData = await this.geocodingService.reverseGeocode(
        loan.latitude,
        loan.longitude,
      );
      loan.city = geoData.city;
      loan.state = geoData.state;
      loan.country = geoData.country;

      console.log(geoData, 'geoData');
    } catch (error) {
      this.logger.error(
        'Erro ao obter dados de geolocalização',
        error,
        error.stack,
      );
      throw error;
    }

    try {
      const creditScore = await this.creditScoreService.getCreditScore();
      loan.creditScore = creditScore;
      loan.status =
        creditScore >= 600 ? LoanStatus.APPROVED : LoanStatus.REJECTED;

      console.log(loan.status, 'loan.status');
      console.log(creditScore, 'creditScore');
    } catch (error) {
      this.logger.error('Erro ao obter a pontuação de crédito', error.stack);
      throw error;
    }

    console.log(loan, 'loan');
    const updatedLoan = await this.loansService.updateLoan(loan);
    return updatedLoan;
  }
}

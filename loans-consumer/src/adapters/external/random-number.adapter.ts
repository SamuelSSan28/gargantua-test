 import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ICreditScoreService } from 'src/interfaces/external/credit-score.service.interface';

@Injectable()
export class RandomNumberAdapter implements ICreditScoreService {
  private readonly logger = new Logger(RandomNumberAdapter.name);

  async getCreditScore(): Promise<number> {
    try {
      // Chama a API RandomNumberAPI para obter um número aleatório entre 300 e 850
      const response = await axios.get(
        'https://www.randomnumberapi.com/api/v1.0/random?min=300&max=850&count=1',
      );

      // A API retorna um array de números; pegamos o primeiro valor.
      const score =
        response.data && response.data.length ? response.data[0] : null;

      if (score === null) {
        throw new Error('Nenhuma pontuação recebida da API');
      }

      return score;
    } catch (error) {
      this.logger.error('Erro ao obter credit score', error.stack);
      throw error;
    }
  }
}

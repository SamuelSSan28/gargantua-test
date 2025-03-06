// src/adapters/external/openweather.adapter.ts
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { IGeocodingService } from 'src/interfaces/external/geocoding.service.interface';

@Injectable()
export class OpenWeatherAdapter implements IGeocodingService {
  private readonly logger = new Logger(OpenWeatherAdapter.name);

  async reverseGeocode(
    lat: number,
    lon: number,
  ): Promise<{ city: string; state: string; country: string }> {
    const apiKey = process.env.OPENWEATHER_API_KEY; // Sua chave
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}&lang=pt`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.length > 0) {
        const data = response.data[0];
        return {
          city: data.name,
          state: data.state || '',
          country: data.country,
        };
      }
      throw new Error('Nenhum dado de geocodificação encontrado');
    } catch (error) {
      this.logger.error('Erro no reverseGeocode', error.stack);
      throw error;
    }
  }
}

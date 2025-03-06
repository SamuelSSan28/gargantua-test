// src/interfaces/external/geocoding.service.interface.ts
export interface IGeocodingService {
  reverseGeocode(
    lat: number,
    lon: number,
  ): Promise<{ city: string; state: string; country: string }>;
}

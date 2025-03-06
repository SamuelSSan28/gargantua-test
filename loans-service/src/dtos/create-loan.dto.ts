import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}

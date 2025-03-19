import { IsString } from 'class-validator';

export class CurrencyDto {
  @IsString()
  currency: string;

  @IsString()
  name: string;

  @IsString()
  high: string;

  @IsString()
  low: string;

  @IsString()
  createdDate: string;
}

import { Controller, Get } from '@nestjs/common';
import { CurrencyDto } from 'src/dtos/currency.dto';
import { CurrencyService } from '../services/currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('exchange-rates')
  async getCurrency(): Promise<CurrencyDto[]> {
    return await this.currencyService.getCurrencyData();
  }
}

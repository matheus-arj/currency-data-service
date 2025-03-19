import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyDto } from 'src/dtos/currency.dto';
import { CurrencyService } from '../services/currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('exchange-rates')
  async getCurrency(
    @Query('page') page: string = '1',
    @Query('size') size: string = '5',
  ): Promise<CurrencyDto[]> {
    return await this.currencyService.getCurrencyData(Number(page), Number(size));
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyDto } from 'src/dtos/currency.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { CurrencyService } from '../services/currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('exchange-rates')
  async getCurrency(@Query() paginationDto: PaginationDto): Promise<CurrencyDto[]> {
    const { page, size } = paginationDto;
    return await this.currencyService.getCurrencyData(page, size);
  }
}

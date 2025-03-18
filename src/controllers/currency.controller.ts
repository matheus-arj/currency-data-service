import { Controller, Get, Logger } from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';

@Controller('currency')
export class CurrencyController {
    private readonly logger = new Logger(CurrencyController.name);

    constructor(private readonly currencyService: CurrencyService) {}

    @Get('exchange-rates')
    async getCurrency() {
        try {
            return await this.currencyService.getCurrencyData();
        } catch (error) {
            this.logger.error(error);
            return { error: error.message };
        }
    }
}
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { CurrencyDto } from 'src/dtos/currency.dto';
import { ExceptionsEnum } from 'src/exceptions/enums/exceptions.enum';
import { ExternalApiException, ExternalApiNoDataException } from 'src/exceptions/exceptions';

@Injectable()
export class CurrencyService {
  //Logger to log error
  private readonly logger = new Logger(CurrencyService.name);

  //API URL to get currency exchange data
  private readonly URL = process.env.API_URL;

  async getCurrencyData(): Promise<CurrencyDto[]> {
    try {
      if (!this.URL) {
        throw new BadRequestException(ExceptionsEnum.API_URL_NOT_FOUND);
      }

      //Call to external API
      const response = await axios.get(this.URL);

      //If the data is empty, throw an error
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new ExternalApiNoDataException();
      }

      const filteredData = this.filterData(response.data);
      return filteredData;
    } catch (error) {
      if (error instanceof ExternalApiNoDataException) {
        throw error;
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new ExternalApiException();
    }
  }

  private filterData(
    data: Record<string, { name: string; high: string; low: string; create_date: string }>,
  ): CurrencyDto[] {
    //Filter the data to get only the necessary data
    const filteredData = Object.keys(data).map((key) => {
      return {
        currency: key,
        name: data[key].name,
        high: data[key].high,
        low: data[key].low,
        createdDate: data[key].create_date,
      };
    });
    return filteredData;
  }
}

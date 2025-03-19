/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { CurrencyDto } from 'src/dtos/currency.dto';
import {
  ApiUrlException,
  ExternalApiException,
  ExternalApiNoDataException,
} from 'src/exceptions/exceptions';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  // API URL to get currency exchange data
  private readonly URL = process.env.API_URL;

  public async getCurrencyData(page: number, size: number): Promise<CurrencyDto[]> {
    try {
      if (!this.URL) {
        throw new ApiUrlException();
      }

      // Call to external API
      const response = await axios.get(this.URL);

      // If the data is empty, throw an error
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new ExternalApiNoDataException();
      }

      const filteredData = this.filterData(response.data);
      return this.paginateData(filteredData, page, size);
    } catch (error) {
      if (error instanceof ApiUrlException) {
        this.logger.error(error.message);
        throw error;
      }

      if (error instanceof ExternalApiNoDataException) {
        this.logger.error(error.message);
        throw error;
      }

      this.logger.error(error);
      throw new ExternalApiException();
    }
  }

  private filterData(
    data: Record<string, { name: string; high: string; low: string; create_date: string }>,
  ): CurrencyDto[] {
    // Filter the data to get only the necessary data
    return Object.keys(data).map((key) => {
      return {
        currency: key,
        name: data[key].name,
        high: data[key].high,
        low: data[key].low,
        createdDate: data[key].create_date,
      };
    });
  }

  private paginateData(data: CurrencyDto[], page: number, size: number): CurrencyDto[] {
    // Paginate the filtered data
    const totalItems = data.length;
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;

    this.logger.log(
      `page: ${page}, size: ${size}, startIndex: ${startIndex}, endIndex: ${endIndex}, totalItems: ${totalItems}`,
    );

    if (startIndex >= totalItems) {
      // If the requested page is greater than the number of available pages
      return [];
    }

    // Return a portion of the array from startIndex to endIndex
    return data.slice(startIndex, endIndex);
  }
}

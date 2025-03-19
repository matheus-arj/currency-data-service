import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ExternalApiException, ExternalApiNoDataException } from 'src/exceptions/exceptions';

@Injectable()
export class CurrencyService {
  //Logger to log error
  private readonly logger = new Logger(CurrencyService.name);

  //API URL to get currency exchange data
  private readonly API_URL = 'https://economia.awesomeapi.com.br/all';

  async getCurrencyData(): Promise<any> {
    try {
      const response = await axios.get(this.API_URL);

      //If the data is empty, throw an error
      if (!response.data || Object.keys(response.data).length === 0) {
        throw new ExternalApiNoDataException();
      }

      //Filter the data to get only the necessary data
      const filteredData = Object.keys(response.data).map((key) => {
        return {
          currency: key,
          name: response.data[key].name,
          high: response.data[key].high,
          low: response.data[key].low,
          createdDate: response.data[key].create_date,
        };
      });

      return filteredData;
    } catch (error) {
      if (error instanceof ExternalApiNoDataException) {
        throw error;
      }
      throw new ExternalApiException();
    }
  }
}

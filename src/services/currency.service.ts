import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
    //Logger to log error
    private readonly logger = new Logger(CurrencyService.name);

    //API URL to get currency exchange data
    //TODO ENV
    private readonly API_URL = "https://economia.awesomeapi.com.br/all";

    async getCurrencyData(): Promise<Object> {
        try {
            const response = await axios.get(this.API_URL);

            //If the data is empty, throw an error
            if (!response.data || Object.keys(response.data).length === 0) {
                throw new NotFoundException("Data not found from API");
            }

            //Filter the data to get only the necessary data
            const filteredData = Object.keys(response.data).map(key => {
                return {
                    currency: response.data[key].code,
                    name: response.data[key].name,
                    high: response.data[key].high,
                    low: response.data[key].low,
                    createdDate: response.data[key].create_date
                };
            });

            return filteredData;
        } catch (error) {
            this.logger.error(error);
            //Throw an error if there is an error when try to get data from external API
            throw new NotFoundException("Error when try to get data from external API");
        }
    }
}


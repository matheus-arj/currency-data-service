import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionsEnum } from './enums/exceptions.enum';

/**
 * Custom exception to handle when no data is returned from the external API.
 */
export class ExternalApiNoDataException extends HttpException {
  constructor() {
    super(ExceptionsEnum.EXTERNAL_API_NO_DATA, HttpStatus.NOT_FOUND);
  }
}

/**
 * Custom exception to handle when there is an error while trying to get data from the external API.
 */
export class ExternalApiException extends HttpException {
  constructor() {
    super(ExceptionsEnum.EXTERNAL_API_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

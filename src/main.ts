import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { CurrencyModule } from './currency.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(CurrencyModule);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

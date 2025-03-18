import { NestFactory } from '@nestjs/core';
import { CurrencyModule } from './currency.module';


async function bootstrap() {
  const app = await NestFactory.create(CurrencyModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

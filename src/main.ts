import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { CurrencyModule } from './currency.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(CurrencyModule);

  const config = new DocumentBuilder()
    .setTitle('Exchange API')
    .setDescription('API documentation for querying exchange rates')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

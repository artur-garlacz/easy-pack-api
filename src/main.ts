// import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from 'src/app.module';
import { createLogger } from 'src/shared/logger';
import { setupSwagger } from 'src/shared/swagger';
import { AllExceptionsFilter } from 'src/shared/filters/all-excpetions.filter';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: createLogger(),
    },
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>('APP_PORT');
  const allExceptionsFilter = app.get(AllExceptionsFilter);
  console.log(__dirname);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(allExceptionsFilter);
  setupSwagger(app);
  await app.listen(port);
}
bootstrap();

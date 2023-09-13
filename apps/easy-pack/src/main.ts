import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '@app/ep/app.module';
import { createLogger } from '@app/ep/shared/logger';
import { AllExceptionsFilter } from '@app/ep/shared/filters/all-excpetions.filter';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/ep/shared/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: createLogger(),
    },
  );

  const configService = app.get(ConfigService);
  const port: string = configService.get<string>('APP_PORT');
  const allExceptionsFilter = app.get(AllExceptionsFilter);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(allExceptionsFilter);
  setupSwagger(app);
  await app.listen(port);
}
bootstrap();

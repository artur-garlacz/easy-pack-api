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

  setupSwagger(app);
  await app.listen(port);
}
bootstrap();

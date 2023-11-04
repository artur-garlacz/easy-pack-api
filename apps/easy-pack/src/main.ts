import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '@app/ep/app.module';
import { createLogger } from '@app/ep/shared/logger';
import { AllExceptionsFilter } from '@app/ep/shared/filters/all-excpetions.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/ep/shared/swagger';
import { SeedModule } from '@app/ep/shared/seeds/seed.module';
import { SeedService } from '@app/ep/shared/seeds/seed.service';

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

  // NestFactory.createApplicationContext(SeedModule)
  //   .then((appContext) => {
  //     const seeder = appContext.get(SeedService);
  //     seeder
  //       .seed()
  //       .then(() => {
  //         // logger.debug('Seeding complete!');
  //       })
  //       .catch((error) => {
  //         // logger.error('Seeding failed!');
  //         throw error;
  //       })
  //       .finally(() => appContext.close());
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(allExceptionsFilter);
  setupSwagger(app);
  await app.listen(port);
}
bootstrap();

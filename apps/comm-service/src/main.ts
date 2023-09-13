import { NestFactory } from '@nestjs/core';
import { CommServiceModule } from './comm-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CommServiceModule);
  await app.listen(3000);
}
bootstrap();

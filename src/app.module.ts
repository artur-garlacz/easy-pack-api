import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DbModule } from 'src/shared/infra/db/db.module';
// import { ConfigModule } from 'src/shared/infra/config/config.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule.forRoot()],
  controllers: [AppController],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}

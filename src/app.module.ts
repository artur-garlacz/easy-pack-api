import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DbModule } from 'src/shared/db/db.module';
import { CustomerModule } from 'src/modules/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule.forRoot(),
    CqrsModule,
    AuthModule,
    UserModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}

import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DbModule } from 'src/shared/db/db.module';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { KnexModule } from 'nest-knexjs';
import { DeliveryRequestModule } from 'src/modules/delivery-request/delivery-request.module';
import { AllExceptionsFilter } from 'src/shared/filters/all-excpetions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // DbModule.forRoot(),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
      },
    }),
    CqrsModule,
    AuthModule,
    UserModule,
    CustomerModule,
    DeliveryRequestModule,
  ],
  controllers: [AppController],
  providers: [Logger, AllExceptionsFilter],
  exports: [Logger],
})
export class AppModule {}

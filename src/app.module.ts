import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { KnexModule } from 'nest-knexjs';
import { DeliveryRequestModule } from 'src/modules/delivery-request/delivery-request.module';
import { AllExceptionsFilter } from 'src/shared/filters/all-excpetions.filter';
import { ParcelDeliveryModule } from 'src/modules/parcel-delivery/parcel-delivery.module';
import { MailerModule } from 'src/shared/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
      },
    }),
    MailerModule,
    CqrsModule,
    AuthModule,
    UserModule,
    CustomerModule,
    DeliveryRequestModule,
    ParcelDeliveryModule,
  ],
  controllers: [AppController],
  providers: [Logger, AllExceptionsFilter],
  exports: [Logger],
})
export class AppModule {}

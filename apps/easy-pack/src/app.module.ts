import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from '@app/ep/modules/auth/auth.module';
import { UserModule } from '@app/ep/modules/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomerModule } from '@app/ep/modules/customer/customer.module';
import { KnexModule } from 'nest-knexjs';
import { DeliveryRequestModule } from '@app/ep/modules/delivery-request/delivery-request.module';
import { AllExceptionsFilter } from '@app/ep/shared/filters/all-excpetions.filter';
import { ParcelDeliveryModule } from '@app/ep/modules/parcel-delivery/parcel-delivery.module';
import { MailerModule } from '@app/ep/shared/mailer/mailer.module';
import { SeedModule } from '@app/ep/shared/seeds/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
      },
    }),
    SeedModule,
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

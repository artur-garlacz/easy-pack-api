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
import { ParcelDeliveryModule } from 'src/modules/parcel-delivery/parcel-delivery.module';
import { EventStoreModule } from 'src/shared/event-store/event-store.module';

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
    // EventStoreModule,
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

import { ICustomerRepository } from '@app/ep/modules/customer/domain/customer.repository';
import { CustomerRepository } from '@app/ep/modules/customer/repository/customer.repository';
import { CommandHandlers as CustomerCommandHandlers } from '@app/ep/modules/customer/application/commands/handler';
import { CommandHandlers as ParcelCommandHandlers } from '@app/ep/modules/parcel-delivery/application/commands/handler';
import { EventHandlers as ParcelEventHandlers } from '@app/ep/modules/parcel-delivery/application/events/handler';
import { IParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/domain/interface/parcel-delivery.repository';
import { ParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/infra/db/parcel-delivery.repository';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';
import { EventStoreService } from '@app/ep/shared/event-store/event-store.service';
import { SeedService } from '@app/ep/shared/seeds/seed.service';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, ConfigModule],
  exports: [SeedService],
  providers: [
    {
      provide: IParcelDeliveryRepository,
      useClass: ParcelDeliveryRepository,
    },
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
    Logger,
    SeedService,
    DatabaseProvider,
    EventStoreService,
    ...CustomerCommandHandlers,
    ...ParcelCommandHandlers,
  ],
})
export class SeedModule {}

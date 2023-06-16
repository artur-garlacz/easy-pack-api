import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from 'src/modules/parcel-delivery/application/commands/handler';
import { EventHandlers } from 'src/modules/parcel-delivery/application/events/handler';
import { IParcelDeliveryRepository } from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';
import { ParcelDeliveryRepository } from 'src/modules/parcel-delivery/infra/db/parcel-delivery.repository';
import { DatabaseProvider } from 'src/shared/db/db.provider';
import { EventStoreService } from 'src/shared/event-store/event-store.service';

@Module({
  imports: [CqrsModule],
  providers: [
    {
      provide: IParcelDeliveryRepository,
      useClass: ParcelDeliveryRepository,
    },
    Logger,
    DatabaseProvider,
    EventStoreService,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class ParcelDeliveryModule {}

import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from 'src/modules/parcel-delivery/application/commands/handler';
import { EventHandlers } from 'src/modules/parcel-delivery/application/events/handler';
import { QueryHandlers } from 'src/modules/parcel-delivery/application/queries/handler';
import { IParcelDeliveryRepository } from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';
import { ParcelDeliveryRepository } from 'src/modules/parcel-delivery/infra/db/parcel-delivery.repository';
import { ParcelDeliveryController } from 'src/modules/parcel-delivery/infra/http/parcel-delivery.controller';
import { DatabaseProvider } from 'src/shared/db/db.provider';
import { EventStoreService } from 'src/shared/event-store/event-store.service';
import { MailerService } from 'src/shared/mailer/mailer.service';

@Module({
  imports: [CqrsModule],
  controllers: [ParcelDeliveryController],
  providers: [
    {
      provide: IParcelDeliveryRepository,
      useClass: ParcelDeliveryRepository,
    },
    Logger,
    DatabaseProvider,
    EventStoreService,
    MailerService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ParcelDeliveryModule {}

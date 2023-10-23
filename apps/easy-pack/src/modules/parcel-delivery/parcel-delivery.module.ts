import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from '@app/ep/modules/parcel-delivery/application/commands/handler';
import { EventHandlers } from '@app/ep/modules/parcel-delivery/application/events/handler';
import { QueryHandlers } from '@app/ep/modules/parcel-delivery/application/queries/handler';
import { IParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/domain/interface/parcel-delivery.repository';
import { ParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/infra/db/parcel-delivery.repository';
import { ParcelDeliveryController } from '@app/ep/modules/parcel-delivery/infra/http/parcel-delivery.controller';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';
import { EventStoreService } from '@app/ep/shared/event-store/event-store.service';
import { MailerService } from '@app/ep/shared/mailer/mailer.service';

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

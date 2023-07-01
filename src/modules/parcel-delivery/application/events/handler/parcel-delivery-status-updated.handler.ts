import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ParcelDeliveryStatusUpdatedEvent } from 'src/modules/parcel-delivery/application/events/impl/parcel-delivery-status-updated.event';
import { IParcelDeliveryRepository } from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';
import { EventStoreService } from 'src/shared/event-store/event-store.service';
import { MailerService } from 'src/shared/mailer/mailer.service';

@EventsHandler(ParcelDeliveryStatusUpdatedEvent)
export class ParcelDeliveryStatusCreatedHandler
  implements IEventHandler<ParcelDeliveryStatusUpdatedEvent>
{
  constructor(
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
    private readonly eventStoreService: EventStoreService,
    private readonly mailerService: MailerService,
  ) {}

  async handle(event: ParcelDeliveryStatusUpdatedEvent) {
    await this.eventStoreService.storeEvent(event);
    await this.parcelDeliveryRepository.updateParcelDelivery({
      id: event.entityId,
      status: event.payload.status,
    });
    // const parcelDelivery =
    //   await this.parcelDeliveryRepository.getParcelDeliveryDetails({
    //     trackingNumber: event.payload.trackingNumber,
    //   });

    // await this.mailerService.sendEmail({
    //   to: parcelDelivery.senderDetails.email,
    //   subject: 'Parcel created',
    //   template: 'parcel-created',
    //   context: {
    //     trackingNumber: event.payload.trackingNumber,
    //   },
    // });
  }
}

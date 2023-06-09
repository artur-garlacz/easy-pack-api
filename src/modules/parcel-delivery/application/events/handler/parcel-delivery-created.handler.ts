import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ParcelDeliveryCreatedEvent } from 'src/modules/parcel-delivery/application/events/impl/parcel-delivery-created.event';
import { IParcelDeliveryRepository } from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';
import { EventStoreService } from 'src/shared/event-store/event-store.service';
import { MailerService } from 'src/shared/mailer/mailer.service';

@EventsHandler(ParcelDeliveryCreatedEvent)
export class ParcelDeliveryCreatedHandler
  implements IEventHandler<ParcelDeliveryCreatedEvent>
{
  constructor(
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
    private readonly eventStoreService: EventStoreService,
    private readonly mailerService: MailerService,
  ) {}

  async handle(event: ParcelDeliveryCreatedEvent) {
    await this.eventStoreService.storeEvent(event);
    await this.parcelDeliveryRepository.createParcelDelivery({
      id: event.entityId,
      deliveryRequestId: event.payload.deliveryRequestId,
      trackingNumber: event.payload.trackingNumber,
    });

    const parcelDelivery =
      await this.parcelDeliveryRepository.getParcelDeliveryDetails({
        trackingNumber: event.payload.trackingNumber,
      });

    await this.mailerService.sendEmail({
      to: parcelDelivery.senderDetails.email,
      subject: 'Parcel created',
      template: 'parcel-created',
      context: {
        trackingLink: `http://localhost:3000/customer/find-parcel?parcelNumber=${event.payload.trackingNumber}`,
        trackingNumber: event.payload.trackingNumber,
      },
    });
  }
}

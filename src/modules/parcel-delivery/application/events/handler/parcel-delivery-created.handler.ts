import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ParcelDeliveryCreatedEvent } from 'src/modules/parcel-delivery/application/events/impl/parcel-delivery-created.event';
import { IParcelDeliveryRepository } from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';
import { EventStoreService } from 'src/shared/event-store/event-store.service';

@EventsHandler(ParcelDeliveryCreatedEvent)
export class ParcelDeliveryCreatedHandler
  implements IEventHandler<ParcelDeliveryCreatedEvent>
{
  constructor(
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async handle(event: ParcelDeliveryCreatedEvent) {
    this.eventStoreService.storeEvent(event);
    this.parcelDeliveryRepository.createParcelDelivery({
      id: event.entityId,
      deliveryRequestId: event.payload.deliveryRequestId,
      trackingNumber: event.payload.trackingNumber,
    });
  }
}

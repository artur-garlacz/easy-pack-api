import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CourierAssignedToParcelEvent } from 'src/modules/parcel-delivery/application/events/impl/courier-assigned-to-parcel.event';
import { IParcelDeliveryRepository } from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';
import { EventStoreService } from 'src/shared/event-store/event-store.service';

@EventsHandler(CourierAssignedToParcelEvent)
export class CourierAssignedToParcelHandler
  implements IEventHandler<CourierAssignedToParcelEvent>
{
  constructor(
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async handle(event: CourierAssignedToParcelEvent) {
    this.eventStoreService.storeEvent(event);
    this.parcelDeliveryRepository.updateParcelDelivery({
      id: event.entityId,
      userId: event.payload.userId,
    });
  }
}

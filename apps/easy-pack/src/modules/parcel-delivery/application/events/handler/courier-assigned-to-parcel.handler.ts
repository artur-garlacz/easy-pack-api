import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CourierAssignedToParcelEvent } from '@app/ep/modules/parcel-delivery/application/events/impl/courier-assigned-to-parcel.event';
import { IParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery.repository';
import { EventStoreService } from '@app/ep/shared/event-store/event-store.service';

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
    await this.eventStoreService.storeEvent(event);
    await this.parcelDeliveryRepository.updateParcelDelivery({
      id: event.entityId,
      userId: event.payload.userId,
    });
  }
}

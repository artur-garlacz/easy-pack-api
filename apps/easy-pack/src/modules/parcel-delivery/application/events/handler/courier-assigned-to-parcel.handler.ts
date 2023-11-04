import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CourierAssignedToParcelEvent } from '@app/ep/modules/parcel-delivery/application/events/impl/courier-assigned-to-parcel.event';
import { EventStoreService } from '@app/ep/shared/event-store/event-store.service';

@EventsHandler(CourierAssignedToParcelEvent)
export class CourierAssignedToParcelHandler
  implements IEventHandler<CourierAssignedToParcelEvent>
{
  constructor(private readonly eventStoreService: EventStoreService) {}

  async handle(event: CourierAssignedToParcelEvent) {
    await this.eventStoreService.storeEvent(event);
  }
}

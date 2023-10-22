import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AssignCourierToParcelCommand } from '@app/ep/modules/parcel-delivery/application/commands/impl/assign-courier-to-parcel.command';
import { CourierAssignedToParcelEvent } from '@app/ep/modules/parcel-delivery/application/events/impl/courier-assigned-to-parcel.event';
import { ENTITY_TYPE, EVENT_TYPE } from '@app/ep/shared/events/events';

@CommandHandler(AssignCourierToParcelCommand)
export class AssignCourierToParcelDeliveryHandler
  implements ICommandHandler<AssignCourierToParcelCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute({
    payload: { userId, deliveryRequestId },
  }: AssignCourierToParcelCommand) {
    this.eventBus.publish(
      new CourierAssignedToParcelEvent(
        '1.0.0',
        deliveryRequestId,
        EVENT_TYPE.COURIER_ASSIGNED_TO_PARCEL,
        ENTITY_TYPE.PARCEL_DELIVERY,
        {
          userId,
        },
      ),
    );
  }
}

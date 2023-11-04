import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AssignCourierToParcelCommand } from '@app/ep/modules/parcel-delivery/application/commands/impl/assign-courier-to-parcel.command';
import { CourierAssignedToParcelEvent } from '@app/ep/modules/parcel-delivery/application/events/impl/courier-assigned-to-parcel.event';
import { ENTITY_TYPE, EVENT_TYPE } from '@app/ep/shared/events/events';
import { IParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/domain/interface/parcel-delivery.repository';

@CommandHandler(AssignCourierToParcelCommand)
export class AssignCourierToParcelDeliveryHandler
  implements ICommandHandler<AssignCourierToParcelCommand>
{
  constructor(
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    payload: { userId, parcelDeliveryId },
  }: AssignCourierToParcelCommand) {
    await this.parcelDeliveryRepository.updateParcelDelivery({
      id: parcelDeliveryId,
      userId,
    });
    this.eventBus.publish(
      new CourierAssignedToParcelEvent(
        '1.0.0',
        parcelDeliveryId,
        EVENT_TYPE.COURIER_ASSIGNED_TO_PARCEL,
        ENTITY_TYPE.PARCEL_DELIVERY,
        {
          userId,
        },
      ),
    );
  }
}

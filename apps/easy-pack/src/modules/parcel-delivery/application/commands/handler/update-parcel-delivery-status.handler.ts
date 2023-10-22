import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateParcelDeliveryStatusCommand } from '@app/ep/modules/parcel-delivery/application/commands/impl/update-parcel-delivery-status.command';
import { ParcelDeliveryStatusUpdatedEvent } from '@app/ep/modules/parcel-delivery/application/events/impl/parcel-delivery-status-updated.event';
import { ParcelDeliveryNotFoundError } from '@app/ep/modules/parcel-delivery/domain/errors/parcel-delivery-not-found.error';
import { IParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery.repository';
import { ENTITY_TYPE, EVENT_TYPE } from '@app/ep/shared/events/events';

@CommandHandler(UpdateParcelDeliveryStatusCommand)
export class UpdateParcelDeliveryStatusHandler
  implements ICommandHandler<UpdateParcelDeliveryStatusCommand>
{
  constructor(
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    payload: { id, userId, status },
  }: UpdateParcelDeliveryStatusCommand) {
    const parcelDelivery =
      await this.parcelDeliveryRepository.getParcelDelivery(id);

    if (!parcelDelivery) {
      throw new ParcelDeliveryNotFoundError(`Parcel not found with id: ${id}`);
    }

    this.eventBus.publish(
      new ParcelDeliveryStatusUpdatedEvent(
        '1.0.0',
        id,
        EVENT_TYPE.PARCEL_STATUS_UPDATED,
        ENTITY_TYPE.PARCEL_DELIVERY,
        {
          userId,
          status,
        },
      ),
    );
  }
}

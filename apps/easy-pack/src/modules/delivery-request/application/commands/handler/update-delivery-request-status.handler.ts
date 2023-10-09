import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDeliveryRequestStatusCommand } from '@app/ep/modules/delivery-request/application/commands/impl/update-delivery-request.command';
import { DeliveryRequestAcceptedEvent } from '@app/ep/modules/delivery-request/application/events/impl/delivery-request-accepted.event';
import { IDeliveryRequestRepository } from '@app/ep/modules/delivery-request/domain/interface/delivery-request.interface';
import { DeliveryRequestStatus } from '@app/ep/modules/delivery-request/domain/entity/delivery-request';

@CommandHandler(UpdateDeliveryRequestStatusCommand)
export class UpdateDeliveryRequestStatusHandler
  implements ICommandHandler<UpdateDeliveryRequestStatusCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    @Inject(IDeliveryRequestRepository)
    private readonly deliveryRequestRepository: IDeliveryRequestRepository,
  ) {}

  async execute({
    payload: { id, userId, status },
  }: UpdateDeliveryRequestStatusCommand) {
    const deliveryRequest = await this.deliveryRequestRepository.getById(id);

    if (deliveryRequest.status !== DeliveryRequestStatus.CREATED) {
      throw new Error('Wrong request status');
    }

    await this.deliveryRequestRepository.updateDeliveryRequestStatus({
      id,
      status,
    });

    if (status === DeliveryRequestStatus.ACCEPTED) {
      this.eventBus.publish(
        new DeliveryRequestAcceptedEvent({ deliveryRequestId: id, userId }),
      );
    } else {
    }
  }
}

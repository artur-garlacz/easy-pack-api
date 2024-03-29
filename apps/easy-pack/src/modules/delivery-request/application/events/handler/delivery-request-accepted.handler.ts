import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeliveryRequestAcceptedEvent } from '@app/ep/modules/delivery-request/application/events/impl/delivery-request-accepted.event';
import { CreateParcelDeliveryCommand } from '@app/ep/modules/parcel-delivery/application/commands/impl/create-parcel-delivery.command';

@EventsHandler(DeliveryRequestAcceptedEvent)
export class DeliveryRequestAcceptedHandler
  implements IEventHandler<DeliveryRequestAcceptedEvent>
{
  constructor(private readonly commandBus: CommandBus) {}

  async handle({
    payload: { userId, deliveryRequestId },
  }: DeliveryRequestAcceptedEvent) {
    await this.commandBus.execute(
      new CreateParcelDeliveryCommand({
        deliveryRequestId,
        userId,
      }),
    );
  }
}

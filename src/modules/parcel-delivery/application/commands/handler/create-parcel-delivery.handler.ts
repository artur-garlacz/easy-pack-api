import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateParcelDeliveryCommand } from 'src/modules/parcel-delivery/application/commands/impl/create-parcel-delivery.command';
import { ParcelDelivery } from 'src/modules/parcel-delivery/domain/parcel-delivery';

@CommandHandler(CreateParcelDeliveryCommand)
export class CreateParcelDeliveryHandler
  implements ICommandHandler<CreateParcelDeliveryCommand>
{
  constructor(private readonly publisher: EventPublisher) {}

  async execute({
    payload: { userId, deliveryRequestId },
  }: CreateParcelDeliveryCommand) {
    const parcelDelivery = this.publisher.mergeObjectContext(
      new ParcelDelivery(),
    );

    parcelDelivery.create({ deliveryRequestId });
    parcelDelivery.assignCourierToParcel({ userId });

    parcelDelivery.commit();
  }
}

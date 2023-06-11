import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateDeliveryRequestCommand } from 'src/modules/parcel-delivery/application/commands/impl/create-delivery-request.command';
import { CreateDeliveryRequestPackageCommand } from 'src/modules/parcel-delivery/application/events/impl/add-delivery-request-package.command';

@CommandHandler(CreateDeliveryRequestCommand)
export class CreateDeliveryRequestHandler
  implements ICommandHandler<CreateDeliveryRequestCommand>
{
  constructor(private readonly eventBus: EventBus) {}

  async execute({ payload }: CreateDeliveryRequestCommand) {
    if (!payload.packages.length) {
      throw new Error('Packages are required');
    }

    payload.packages.forEach((p) => {
      this.eventBus.publish(new CreateDeliveryRequestPackageCommand({}));
    });
  }
}

import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterCustomerCommand } from 'src/modules/customer/application/commands/impl/register-customer.command';
import { CustomerRegisteredEvent } from 'src/modules/customer/application/events/impl/customer-registered.event';
import { ICustomerRepository } from 'src/modules/customer/domain/customer.repository';
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

import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateParcelDeliveryCommand } from '@app/ep/modules/parcel-delivery/application/commands/impl/create-parcel-delivery.command';
import { ParcelDelivery } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';
import { Inject } from '@nestjs/common';
import { ICustomerRepository } from '@app/ep/modules/customer/domain/customer.repository';
import { CustomerNotFoundError } from '@app/ep/modules/customer/domain/errors/customer-not-found.error';
import { EventStoreService } from '@app/ep/shared/event-store/event-store.service';

@CommandHandler(CreateParcelDeliveryCommand)
export class CreateParcelDeliveryHandler
  implements ICommandHandler<CreateParcelDeliveryCommand>
{
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    private readonly publisher: EventPublisher, // private readonly eventStoreService: EventStoreService,
  ) {}

  async execute({ payload: { customerId } }: CreateParcelDeliveryCommand) {
    const customer = await this.customerRepository.getById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError({ entityId: customerId });
    }

    const parcelDelivery = this.publisher.mergeObjectContext(
      new ParcelDelivery(),
    );

    // this.eventStoreService.storeEvent();

    parcelDelivery.create();
  }
}

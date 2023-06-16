import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CreateDeliveryRequestCommand } from 'src/modules/delivery-request/application/commands/impl/create-delivery-request.command';
import { IDeliveryRequestRepository } from 'src/modules/delivery-request/domain/delivery-request.repository';
import { DeliveryRequestAddress } from 'src/modules/delivery-request/domain/entity/address';
import { DeliveryRequest } from 'src/modules/delivery-request/domain/entity/delivery-request';
import {
  MeasurementUnit,
  Package,
} from 'src/modules/delivery-request/domain/entity/package';

@CommandHandler(CreateDeliveryRequestCommand)
export class CreateDeliveryRequestHandler
  implements ICommandHandler<CreateDeliveryRequestCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(IDeliveryRequestRepository)
    private readonly deliveryRequestRepository: IDeliveryRequestRepository,
  ) {}

  async execute({
    payload: {
      deliveryAddress,
      packages,
      pickUpAddress,
      type,
      description,
      shipmentAt,
      customerId,
    },
  }: CreateDeliveryRequestCommand) {
    if (!packages.length) {
      throw new Error('Packages are required');
    }

    const pickUp =
      await this.deliveryRequestRepository.createDeliveryRequestAddress(
        new DeliveryRequestAddress(randomUUID(), pickUpAddress),
      );

    const delivery =
      await this.deliveryRequestRepository.createDeliveryRequestAddress(
        new DeliveryRequestAddress(randomUUID(), deliveryAddress),
      );

    const deliveryRequest = new DeliveryRequest();
    deliveryRequest.create({
      pickUp,
      destination: delivery,
      type,
      description,
      shipmentAt,
      customerId,
    });

    await this.deliveryRequestRepository.createDeliveryRequest(deliveryRequest);

    for (const item of packages) {
      await this.deliveryRequestRepository.createPackage(
        new Package(
          randomUUID(),
          MeasurementUnit.CM,
          item.weight,
          item.length,
          item.width,
          item.height,
          item.description,
          deliveryRequest.id,
        ),
      );
    }

    this.publisher.mergeObjectContext(deliveryRequest);
  }
}

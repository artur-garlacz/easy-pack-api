import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateParcelDeliveryCommand } from '@app/ep/modules/parcel-delivery/application/commands/impl/create-parcel-delivery.command';
import { ParcelDelivery } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';
import { Inject } from '@nestjs/common';
import { ICustomerRepository } from '@app/ep/modules/customer/domain/customer.repository';
import { CustomerNotFoundError } from '@app/ep/modules/customer/domain/errors/customer-not-found.error';
import { IParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/domain/interface/parcel-delivery.repository';
import {
  MeasurementUnit,
  Package,
} from '@app/ep/modules/parcel-delivery/domain/package';
import { randomUUID } from 'crypto';
import { ParcelAddress } from '@app/ep/modules/parcel-delivery/domain/address';

@CommandHandler(CreateParcelDeliveryCommand)
export class CreateParcelDeliveryHandler
  implements ICommandHandler<CreateParcelDeliveryCommand>
{
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
    private readonly publisher: EventPublisher, // private readonly eventStoreService: EventStoreService,
  ) {}

  async execute({
    payload: {
      customerId,
      pickupAt,
      shipmentAt,
      price,
      description,
      pickupAddress,
      deliveryAddress,
      packages,
    },
  }: CreateParcelDeliveryCommand) {
    const customer = await this.customerRepository.getOne({ id: customerId });
    console.log('customer', customer);
    if (!customer) {
      throw new CustomerNotFoundError({ entityId: customerId });
    }

    const pickUp = await this.parcelDeliveryRepository.createParcelAddress(
      pickupAddress,
    );

    const delivery = await this.parcelDeliveryRepository.createParcelAddress(
      deliveryAddress,
    );

    const parcelDelivery = this.publisher.mergeObjectContext(
      new ParcelDelivery(),
    );
    parcelDelivery.create();

    await this.parcelDeliveryRepository.createParcelDelivery({
      customerId,
      id: parcelDelivery.id,
      price,
      pickupAt,
      shipmentAt,
      trackingNumber: parcelDelivery.trackingNumber,
      description,
      senderAddressId: pickUp.id,
      recipientAddressId: delivery.id,
    });

    for (const item of packages) {
      await this.parcelDeliveryRepository.createPackage(
        new Package(
          randomUUID(),
          MeasurementUnit.CM,
          item.weight,
          item.length,
          item.width,
          item.height,
          item.description,
          parcelDelivery.id,
        ),
      );
    }

    parcelDelivery.commit();
  }
}

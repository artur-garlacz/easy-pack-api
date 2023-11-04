import { ICustomerRepository } from '@app/ep/modules/customer/domain/customer.repository';
import { CreateParcelDeliveryCommand } from '@app/ep/modules/parcel-delivery/application/commands/impl/create-parcel-delivery.command';
import { parcelDeliverySeeds } from '@app/ep/shared/seeds/parcel-deliveries.seed';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { times } from 'ramda';

@Injectable()
export class SeedService {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {}

  async seed() {
    const customer = await this.createCustomer();
    await this.createParcelDeliveries(customer.id);
  }

  private async createParcelDeliveries(customerId: string) {
    for (const parcel of [
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
      ...parcelDeliverySeeds,
    ]) {
      await this.commandBus.execute(
        new CreateParcelDeliveryCommand({
          ...parcel,
          customerId,
        }),
      );
    }
  }

  private async createCustomer() {
    return await this.customerRepository.create({
      email: 'gartur25@o2.pl',
      cognitoId: this.configService.get('AWS_CUSTOMER_COGNITO_ID'),
      firstName: 'Bill',
      lastName: 'Scott',
    });
  }
}

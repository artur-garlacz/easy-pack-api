import { AggregateRoot } from '@nestjs/cqrs';
import { DeliveryRequestAddress } from './address';
import { Package } from './package';

export class DeliveryRequest extends AggregateRoot {
  private status: DeliveryRequestStatus;
  private packages: Package[];

  constructor(
    public readonly id: string,
    public readonly pickUp: DeliveryRequestAddress,
    public readonly destination: DeliveryRequestAddress,
    public readonly type: string,
    public readonly description: string,
    public readonly shipmentAt: Date | string,
  ) {
    super();
  }

  public getStatus(): DeliveryRequestStatus {
    return this.status;
  }

  public addPackage(packageItem: Package) {
    this.packages.push(packageItem);
  }
}

export enum DeliveryRequestStatus {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

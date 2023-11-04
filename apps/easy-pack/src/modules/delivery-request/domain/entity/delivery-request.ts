import { AggregateRoot } from '@nestjs/cqrs';
import { Package } from '../../../parcel-delivery/domain/package';

export class DeliveryRequest extends AggregateRoot {
  private _id: string;
  private _type: string;
  private _description: string;
  private _shipmentAt: Date | string;
  private _status: DeliveryRequestStatus;
  private _packages: Package[];
  private _customerId: string;

  public get status(): DeliveryRequestStatus {
    return this._status;
  }

  public get id(): string {
    return this._id;
  }

  public get type(): string {
    return this._type;
  }

  public get description(): string {
    return this._description;
  }

  public get shipmentAt(): Date | string {
    return this._shipmentAt;
  }

  public get customerId() {
    return this._customerId;
  }

  public accept() {
    this._status = DeliveryRequestStatus.ACCEPTED;
  }

  public reject() {
    this._status = DeliveryRequestStatus.REJECTED;
  }

  public addPackage(packageItem: Package) {
    this._packages.push(packageItem);
  }
}

export enum DeliveryRequestStatus {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

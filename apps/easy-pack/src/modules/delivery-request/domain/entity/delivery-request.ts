import { AggregateRoot } from '@nestjs/cqrs';
import { DeliveryRequestAddress } from './address';
import { Package } from './package';
import { randomUUID } from 'crypto';

export class DeliveryRequest extends AggregateRoot {
  private _id: string;
  private _type: string;
  private _description: string;
  private _shipmentAt: Date | string;
  private _status: DeliveryRequestStatus;
  private _packages: Package[];
  private _pickUp: DeliveryRequestAddress;
  private _destination: DeliveryRequestAddress;
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

  public get pickUp() {
    return this._pickUp;
  }

  public get destination() {
    return this._destination;
  }

  public get customerId() {
    return this._customerId;
  }

  public create({
    type,
    description,
    shipmentAt,
    pickUp,
    destination,
    customerId,
  }: {
    type: string;
    description: string;
    shipmentAt: Date | string;
    pickUp: DeliveryRequestAddress;
    destination: DeliveryRequestAddress;
    customerId: string;
  }) {
    this._id = randomUUID();
    this._type = type;
    this._description = description;
    this._shipmentAt = shipmentAt;
    this._pickUp = pickUp;
    this._destination = destination;
    this._customerId = customerId;
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

import { Injectable } from '@nestjs/common';
import { IDeliveryRequestRepository } from 'src/modules/delivery-request/domain/delivery-request.repository';
import { DeliveryRequestAddress } from 'src/modules/delivery-request/domain/entity/address';
import {
  DeliveryRequest,
  DeliveryRequestStatus,
} from 'src/modules/delivery-request/domain/entity/delivery-request';
import { Package } from 'src/modules/delivery-request/domain/entity/package';
import { DatabaseProvider } from 'src/shared/db/db.provider';

@Injectable()
export class DeliveryRequestRepository implements IDeliveryRequestRepository {
  constructor(private readonly db: DatabaseProvider) {}

  async getAll(): Promise<DeliveryRequest[]> {
    const deliveryRequests = await this.db
      .getKnexInstance()
      .select('*')
      .from('DeliveryRequest');

    return deliveryRequests as DeliveryRequest[];
  }

  getByCustomerId: (id: string) => Promise<DeliveryRequest>;

  async createDeliveryRequest({
    id,
    destination,
    pickUp,
    description,
    type,
    shipmentAt,
  }: DeliveryRequest) {
    const [deliveryRequest] = await this.db
      .getKnexInstance()
      .insert({
        id,
        senderDetailsId: pickUp.id,
        recipientDetailsId: destination.id,
        orderingPartyDetailsId: null,
        description,
        type,
        shipmentAt,
        status: DeliveryRequestStatus.CREATED,
      })
      .into('DeliveryRequest')
      .returning('*');

    return deliveryRequest as DeliveryRequest;
  }

  async createPackage({
    id,
    description,
    height,
    length,
    measurementUnit,
    weight,
    width,
    deliveryRequestId,
  }: Package & { deliveryRequestId: string }) {
    const [packageItem] = await this.db
      .getKnexInstance()
      .insert({
        id,
        description,
        height,
        length,
        measurementUnit,
        weight,
        width,
        deliveryRequestId,
      })
      .into('Package')
      .returning('*');

    return packageItem as any;
  }

  async createDeliveryRequestAddress({ id, address }: DeliveryRequestAddress) {
    const [pickUpAddress] = await this.db
      .getKnexInstance()
      .insert({
        id,
        country: address.country,
        city: address.city,
        street: address.street,
        postalCode: address.postalCode,
        locationNumber: address.locationNumber,
        email: address.email,
        phoneNumber: address.phoneNumber,
        firstName: address.firstName,
        lastName: address.lastName,
      })
      .into('DeliveryRequestAddress')
      .returning('*');

    return pickUpAddress as any;
  }
}

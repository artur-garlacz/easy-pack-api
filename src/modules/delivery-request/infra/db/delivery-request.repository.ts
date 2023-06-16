import { Injectable } from '@nestjs/common';
import {
  IDeliveryRequestRepository,
  IGetDeliveryRequestsArgs,
  IUpdateDeliveryRequestArgs,
} from 'src/modules/delivery-request/domain/delivery-request.repository';
import { DeliveryRequestAddress } from 'src/modules/delivery-request/domain/entity/address';
import {
  DeliveryRequest,
  DeliveryRequestStatus,
} from 'src/modules/delivery-request/domain/entity/delivery-request';
import { Package } from 'src/modules/delivery-request/domain/entity/package';
import { DatabaseProvider } from 'src/shared/db/db.provider';
import { removeEmptyProperties } from 'src/shared/utils/object';

@Injectable()
export class DeliveryRequestRepository implements IDeliveryRequestRepository {
  constructor(private readonly db: DatabaseProvider) {}

  async getById(id: string) {
    const [deliveryRequest] = await this.db
      .getKnexInstance()
      .select('*')
      .from('DeliveryRequest')
      .where('id', id);

    return deliveryRequest;
  }

  async getAll(args?: IGetDeliveryRequestsArgs): Promise<DeliveryRequest[]> {
    const conditions = removeEmptyProperties(args || {});
    const deliveryRequests = await this.db
      .getKnexInstance()
      .select([
        'id',
        'customerId',
        'description',
        'type',
        'status',
        'shipmentAt',
        'createdAt',
      ])
      .where(conditions)
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
    customerId,
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
        customerId,
        status: DeliveryRequestStatus.CREATED,
      })
      .into('DeliveryRequest')
      .returning('*');

    return deliveryRequest as DeliveryRequest;
  }

  async updateDeliveryRequestStatus({
    id,
    status,
  }: IUpdateDeliveryRequestArgs) {
    const [deliveryRequest] = await this.db
      .getKnexInstance()
      .update({ status })
      .where('id', id)
      .from('DeliveryRequest')
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

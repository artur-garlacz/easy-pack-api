import { Injectable } from '@nestjs/common';
import {
  IDeliveryRequestRepository,
  IGetDeliveryRequestsArgs,
  IUpdateDeliveryRequestArgs,
} from '@app/ep/modules/delivery-request/domain/interface/delivery-request.interface';
import {
  DeliveryRequest,
  DeliveryRequestStatus,
} from '@app/ep/modules/delivery-request/domain/entity/delivery-request';
import { Package } from '@app/ep/modules/parcel-delivery/domain/package';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';
import { removeEmptyProperties } from '@app/ep/shared/utils/object';

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

  async getRequests({
    pagination: { limit, page },
    filters,
  }: IGetDeliveryRequestsArgs): Promise<DeliveryRequest[]> {
    const deliveryRequests = await this.db.knex
      .select([
        'DeliveryRequest.id',
        'DeliveryRequest.customerId',
        'DeliveryRequest.status',
        'DeliveryRequest.createdAt',
        'ParcelDelivery.trackingNumber',
      ])
      .distinctOn('DeliveryRequest.id')
      .from('DeliveryRequest')
      .leftJoin(
        'ParcelDelivery',
        'DeliveryRequest.id',
        'ParcelDelivery.deliveryRequestId',
      )
      .where(
        this.db.knex.raw(
          filters.status
            ? `"DeliveryRequest"."status"='${filters.status}'`
            : `"DeliveryRequest"."status"<>'NULL'`,
        ),
      )
      .limit(limit)
      .offset((page - 1) * limit);

    return deliveryRequests as DeliveryRequest[];
  }

  async getNumberOfRequests({ filters }: IGetDeliveryRequestsArgs) {
    const conditions = removeEmptyProperties(filters || {});

    const requests = await this.db
      .getKnexInstance()
      .table('DeliveryRequest')
      .where(conditions)
      .count('id')
      .first();

    return Number(requests.count) || 0;
  }

  getByCustomerId: (id: string) => Promise<DeliveryRequest>;

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

  async createDeliveryRequestAddress({ id, address }: any) {
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

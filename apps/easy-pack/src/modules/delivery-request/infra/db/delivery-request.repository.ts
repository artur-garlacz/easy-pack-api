import { Injectable } from '@nestjs/common';
import {
  IDeliveryRequestRepository,
  IGetDeliveryRequestsArgs,
  IUpdateDeliveryRequestArgs,
} from '@app/ep/modules/delivery-request/domain/interface/delivery-request.interface';
import { DeliveryRequestAddress } from '@app/ep/modules/delivery-request/domain/entity/address';
import {
  DeliveryRequest,
  DeliveryRequestStatus,
} from '@app/ep/modules/delivery-request/domain/entity/delivery-request';
import { Package } from '@app/ep/modules/delivery-request/domain/entity/package';
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
        'DeliveryRequest.description',
        'DeliveryRequest.type',
        'DeliveryRequest.status',
        'DeliveryRequest.shipmentAt',
        'DeliveryRequest.createdAt',
        'packages.packages',
      ])
      .from('DeliveryRequest')
      .leftJoin(
        this.db
          .knex('Package')
          .select(
            this.db.knex.raw(
              '"Package"."deliveryRequestId", json_agg("Package".*) as "packages"',
            ),
          )
          .groupBy('Package.id')
          .as('packages'),
        'packages.deliveryRequestId',
        'DeliveryRequest.id',
      )

      // .where('DeliveryRequest.customerId', filters?.customerId || null)
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

import { Injectable } from '@nestjs/common';
import { ParcelDeliveryStatus } from 'src/modules/parcel-delivery/domain/parcel-delivery';
import {
  ICreateParcelDeliveryArgs,
  IGetParcelDeliveriesArgs,
  IGetParcelDeliveryArgs,
  IParcelDeliveryRepository,
  IUpdateParcelDeliveryArgs,
} from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';
import { DatabaseProvider } from 'src/shared/db/db.provider';
import { removeEmptyProperties } from 'src/shared/utils/object';

@Injectable()
export class ParcelDeliveryRepository implements IParcelDeliveryRepository {
  constructor(private readonly db: DatabaseProvider) {}

  async getParcelDelivery(id: string) {
    const [parcelDelivery] = await this.db
      .getKnexInstance()
      .select('*')
      .from('ParcelDelivery')
      .where({ id });

    return parcelDelivery || null;
  }

  async getParcelDeliveries({
    pagination: { limit, page },
    filters,
  }: IGetParcelDeliveriesArgs) {
    const conditions = removeEmptyProperties(filters || {});

    const parcelDeliveries = await this.db
      .getKnexInstance()
      .select([
        'ParcelDelivery.*',
        this.db.getKnexInstance().raw('row_to_json("sd".*) as "senderDetails"'),
        this.db
          .getKnexInstance()
          .raw('row_to_json("rd".*) as "recipientDetails"'),
        'DeliveryRequest.type',
        'DeliveryRequest.shipmentAt',
      ])
      .from('ParcelDelivery')
      .leftJoin(
        'DeliveryRequest',
        'ParcelDelivery.deliveryRequestId',
        'DeliveryRequest.id',
      )
      .leftJoin(
        {
          sd: 'DeliveryRequestAddress',
        },
        'DeliveryRequest.senderDetailsId',
        'sd.id',
      )
      .leftJoin(
        {
          rd: 'DeliveryRequestAddress',
        },
        'DeliveryRequest.recipientDetailsId',
        'rd.id',
      )
      .where(conditions)
      .limit(limit)
      .offset((page - 1) * limit);

    console.log(parcelDeliveries.length);

    return parcelDeliveries;
  }

  async getNumberOfParcels({
    filters,
  }: Pick<IGetParcelDeliveriesArgs, 'filters'>) {
    const conditions = removeEmptyProperties(filters || {});

    const parcelDeliveries = await this.db
      .getKnexInstance()
      .table('ParcelDelivery')
      .where(conditions)
      .count('id')
      .first();

    return Number(parcelDeliveries.count) || 0;
  }

  async getParcelDeliveryDetails(args: IGetParcelDeliveryArgs) {
    const [parcelDelivery] = await this.db
      .getKnexInstance()
      .select([
        'ParcelDelivery.*',
        this.db.getKnexInstance().raw('row_to_json("sd".*) as "senderDetails"'),
        this.db
          .getKnexInstance()
          .raw('row_to_json("rd".*) as "recipientDetails"'),
      ])
      .from('ParcelDelivery')
      .leftJoin(
        'DeliveryRequest',
        'ParcelDelivery.deliveryRequestId',
        'DeliveryRequest.id',
      )
      .leftJoin(
        {
          sd: 'DeliveryRequestAddress',
        },
        'DeliveryRequest.senderDetailsId',
        'sd.id',
      )
      .leftJoin(
        {
          rd: 'DeliveryRequestAddress',
        },
        'DeliveryRequest.recipientDetailsId',
        'rd.id',
      )
      .where('ParcelDelivery.trackingNumber', args?.trackingNumber || null)
      .orWhere('ParcelDelivery.id', args?.id || null);

    return parcelDelivery;
  }

  async createParcelDelivery({
    id,
    deliveryRequestId,
    trackingNumber,
    userId,
  }: ICreateParcelDeliveryArgs) {
    const [parcelDelivery] = await this.db
      .getKnexInstance()
      .insert({
        id,
        deliveryRequestId,
        userId: userId ?? null,
        status: ParcelDeliveryStatus.CREATED,
        trackingNumber,
      })
      .into('ParcelDelivery')
      .returning('*');

    return parcelDelivery;
  }

  async updateParcelDelivery({ id, ...args }: IUpdateParcelDeliveryArgs) {
    const conditions = removeEmptyProperties(args || {});

    const [parcelDelivery] = await this.db
      .getKnexInstance()
      .update({
        ...conditions,
      })
      .where({ id })
      .from('ParcelDelivery')
      .returning('*');

    console.log(parcelDelivery);

    return parcelDelivery;
  }
}

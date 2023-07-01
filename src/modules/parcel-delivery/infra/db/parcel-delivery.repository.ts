import { Injectable } from '@nestjs/common';
import { ParcelDeliveryStatus } from 'src/modules/parcel-delivery/domain/parcel-delivery';
import {
  ICreateParcelDeliveryArgs,
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

  async getAllParcelDeliveries(args?: { userId?: string }) {
    const conditions = removeEmptyProperties(args || {});

    const parcelDeliveries = await this.db
      .getKnexInstance()
      .select('*')
      .from('ParcelDelivery')
      .where(conditions);

    return parcelDeliveries;
  }

  async getParcelDeliveryDetails(args: IGetParcelDeliveryArgs) {
    // const conditions = removeEmptyProperties(args || {});

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
      .where('ParcelDelivery.trackingNumber', args.trackingNumber);

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

    return parcelDelivery;
  }
}

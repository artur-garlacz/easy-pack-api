import { Injectable } from '@nestjs/common';
import { ParcelDeliveryStatus } from 'src/modules/parcel-delivery/domain/parcel-delivery';
import {
  ICreateParcelDeliveryArgs,
  IParcelDeliveryRepository,
  IUpdateParcelDeliveryArgs,
} from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';
import { DatabaseProvider } from 'src/shared/db/db.provider';
import { removeEmptyProperties } from 'src/shared/utils/object';

@Injectable()
export class ParcelDeliveryRepository implements IParcelDeliveryRepository {
  constructor(private readonly db: DatabaseProvider) {}

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

  async updateParcelDelivery(args: IUpdateParcelDeliveryArgs) {
    const conditions = removeEmptyProperties(args || {});

    const [parcelDelivery] = await this.db
      .getKnexInstance()
      .update({
        ...conditions,
      })
      .from('ParcelDelivery')
      .returning('*');

    return parcelDelivery;
  }
}

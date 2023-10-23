import { Injectable } from '@nestjs/common';
import { ParcelDeliveryStatus } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';
import {
  ICreateParcelDeliveryArgs,
  IGetParcelDeliveriesArgs,
  IGetParcelDeliveryArgs,
  IParcelDeliveryRepository,
  IUpdateParcelDeliveryArgs,
} from '@app/ep/modules/parcel-delivery/domain/interface/parcel-delivery.repository';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';
import { removeEmptyProperties } from '@app/ep/shared/utils/object';

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
    const parcelDeliveries = await this.db
      .getKnexInstance()
      .select([
        'ParcelDelivery.*',
        this.db.getKnexInstance().raw('row_to_json("sd".*) as "senderDetails"'),
        this.db
          .getKnexInstance()
          .raw('row_to_json("rd".*) as "recipientDetails"'),
        'packages.packages',
        this.db.getKnexInstance().raw('row_to_json("User".*) as "user"'),
      ])
      .distinctOn('ParcelDelivery.id')
      .from('ParcelDelivery')
      .leftJoin(
        {
          sd: 'ParcelAddress',
        },
        'ParcelAddress.senderDetailsId',
        'sd.id',
      )
      .leftJoin(
        {
          rd: 'ParcelAddress',
        },
        'ParcelAddress.recipientDetailsId',
        'rd.id',
      )
      .leftJoin('User', 'ParcelDelivery.userId', 'User.id')
      .leftJoin(
        this.db
          .knex('Package')
          .select(
            this.db.knex.raw(
              '"Package"."parcelDeliveryId", json_agg("Package".*) as "packages"',
            ),
          )
          .groupBy('Package.id')
          .as('packages'),
        'packages.parcelDeliveryId',
        'ParcelDelivery.id',
      )
      .where((qb) => {
        if (filters.status) {
          qb.where('ParcelDelivery.status', '=', filters.status);
        }
      })
      .limit(limit)
      .offset((page - 1) * limit);

    return parcelDeliveries;
  }

  async getNumberOfParcels({
    filters,
  }: Pick<IGetParcelDeliveriesArgs, 'filters'>) {
    const parcelDeliveries = await this.db
      .getKnexInstance()
      .table('ParcelDelivery')
      .where((qb) => {
        if (filters?.status) {
          if (Array.isArray(filters.status)) {
            return qb.whereIn('ParcelDelivery.status', filters.status);
          }
          return qb.where('ParcelDelivery.status', '=', filters.status);
        }
      })
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
        {
          sd: 'ParcelAddress',
        },
        'ParcelDelivery.senderDetailsId',
        'sd.id',
      )
      .leftJoin(
        {
          rd: 'ParcelAddress',
        },
        'ParcelDelivery.recipientDetailsId',
        'rd.id',
      )
      .where('ParcelDelivery.trackingNumber', args?.trackingNumber || null)
      .orWhere('ParcelDelivery.id', args?.id || null);

    return parcelDelivery;
  }

  async createParcelDelivery({
    id,
    trackingNumber,
    userId,
  }: ICreateParcelDeliveryArgs) {
    const [parcelDelivery] = await this.db
      .getKnexInstance()
      .insert({
        id,
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

import { ParcelDeliveryStatus } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';
import { Pagination } from '@app/ep/shared/utils/pagination';

export class GetParcelDeliveriesQuery {
  constructor(
    public readonly pagination: Pagination,
    public readonly filters: {
      userId?: string;
      status?: ParcelDeliveryStatus;
    },
  ) {}
}

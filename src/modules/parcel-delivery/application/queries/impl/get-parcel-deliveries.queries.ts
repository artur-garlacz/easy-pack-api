import { ParcelDeliveryStatus } from 'src/modules/parcel-delivery/domain/parcel-delivery';
import { Pagination } from 'src/shared/utils/pagination';

export class GetParcelDeliveriesQuery {
  constructor(
    public readonly pagination: Pagination,
    public readonly filters: {
      userId?: string;
      status?: ParcelDeliveryStatus;
    },
  ) {}
}

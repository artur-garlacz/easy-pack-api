import { DeliveryRequestStatus } from '@app/ep/modules/delivery-request/domain/entity/delivery-request';
import { Pagination } from '@app/ep/shared/utils/pagination';

export class GetDeliveryRequestsQuery {
  constructor(
    public readonly pagination: Pagination,
    public readonly filters?: {
      customerId?: string;
      status?: DeliveryRequestStatus;
    },
  ) {}
}

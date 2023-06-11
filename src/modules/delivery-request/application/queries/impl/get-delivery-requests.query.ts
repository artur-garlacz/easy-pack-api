import { DeliveryRequestStatus } from 'src/modules/delivery-request/domain/entity/delivery-request';

export class GetDeliveryRequestsQuery {
  constructor(public readonly filters?: Filters) {}
}

class Filters {
  constructor(
    public readonly customerId?: string,
    public readonly status?: DeliveryRequestStatus,
  ) {}
}

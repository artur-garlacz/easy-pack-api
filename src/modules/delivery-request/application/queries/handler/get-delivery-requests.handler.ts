import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDeliveryRequestsQuery } from 'src/modules/delivery-request/application/queries/impl/get-delivery-requests.query';
import { IDeliveryRequestRepository } from 'src/modules/delivery-request/domain/delivery-request.repository';

@QueryHandler(GetDeliveryRequestsQuery)
export class GetDeliveryRequestsHandler
  implements IQueryHandler<GetDeliveryRequestsQuery>
{
  constructor(
    @Inject(IDeliveryRequestRepository)
    private readonly deliveryRequestRepository: IDeliveryRequestRepository,
  ) {}

  execute({ filters }: GetDeliveryRequestsQuery) {
    if (filters.customerId) {
      return this.deliveryRequestRepository.getCustomerRequests({ ...filters });
    }
    return this.deliveryRequestRepository.getAllRequests({
      status: filters.status,
    });
  }
}

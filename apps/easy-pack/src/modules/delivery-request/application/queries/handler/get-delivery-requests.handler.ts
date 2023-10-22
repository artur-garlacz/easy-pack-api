import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDeliveryRequestsQuery } from '@app/ep/modules/delivery-request/application/queries/impl/get-delivery-requests.query';
import { IDeliveryRequestRepository } from '@app/ep/modules/delivery-request/domain/interface/delivery-request.interface';

@QueryHandler(GetDeliveryRequestsQuery)
export class GetDeliveryRequestsHandler
  implements IQueryHandler<GetDeliveryRequestsQuery>
{
  constructor(
    @Inject(IDeliveryRequestRepository)
    private readonly deliveryRequestRepository: IDeliveryRequestRepository,
  ) {}

  async execute({ pagination, filters }: GetDeliveryRequestsQuery) {
    const requests = await this.deliveryRequestRepository.getRequests({
      pagination,
      filters,
    });

    const numberOfRequests =
      await this.deliveryRequestRepository.getNumberOfRequests({ filters });

    return {
      data: requests,
      currentPage: pagination.page,
      numberOfPages: Math.ceil(numberOfRequests / pagination.limit),
      itemsCount: numberOfRequests,
    };
  }
}

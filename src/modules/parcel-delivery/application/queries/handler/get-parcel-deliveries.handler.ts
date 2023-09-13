import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetParcelDeliveriesQuery } from 'src/modules/parcel-delivery/application/queries/impl/get-parcel-deliveries.queries';
import { IParcelDeliveryRepository } from 'src/modules/parcel-delivery/domain/parcel-delivery.repository';

@QueryHandler(GetParcelDeliveriesQuery)
export class GetParcelDeliveriesHandler
  implements IQueryHandler<GetParcelDeliveriesQuery>
{
  constructor(
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
  ) {}

  async execute({ pagination, filters }: GetParcelDeliveriesQuery) {
    const parcelDeliveries =
      await this.parcelDeliveryRepository.getParcelDeliveries({
        pagination,
        filters,
      });

    const numberOfParcelDeliveries =
      await this.parcelDeliveryRepository.getNumberOfParcels({
        filters,
      });

    return {
      data: parcelDeliveries,
      currentPage: pagination.page,
      numberOfPages: Math.ceil(numberOfParcelDeliveries / pagination.limit),
      itemsCount: numberOfParcelDeliveries,
    };
  }
}

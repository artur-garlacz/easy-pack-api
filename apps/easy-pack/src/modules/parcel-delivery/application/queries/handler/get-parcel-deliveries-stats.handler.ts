import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery.repository';
import { GetParcelDeliveriesStatsQuery } from '@app/ep/modules/parcel-delivery/application/queries/impl/get-parcel-deliveries-stats.queries';
import { ParcelDeliveryStatus } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';

@QueryHandler(GetParcelDeliveriesStatsQuery)
export class GetParcelDeliveriesStatsHandler
  implements IQueryHandler<GetParcelDeliveriesStatsQuery>
{
  constructor(
    @Inject(IParcelDeliveryRepository)
    private readonly parcelDeliveryRepository: IParcelDeliveryRepository,
  ) {}

  async execute() {
    const totalParcelsCount =
      await this.parcelDeliveryRepository.getNumberOfParcels({});
    const unresolvedParcelsCount =
      await this.parcelDeliveryRepository.getNumberOfParcels({
        filters: {
          status: [
            ParcelDeliveryStatus.CREATED,
            ParcelDeliveryStatus.PENDING,
            ParcelDeliveryStatus.IN_TRANSIT,
          ],
        },
      });
    const deliveredParcelsCount =
      await this.parcelDeliveryRepository.getNumberOfParcels({
        filters: {
          status: ParcelDeliveryStatus.DELIVERED,
        },
      });

    return { totalParcelsCount, unresolvedParcelsCount, deliveredParcelsCount };
  }
}

import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IParcelDeliveryRepository } from '@app/ep/modules/parcel-delivery/domain/interface/parcel-delivery.repository';
import { GetParcelDeliveriesStatsQuery } from '@app/ep/modules/parcel-delivery/application/queries/impl/get-parcel-deliveries-stats.queries';
import {
  ParcelDelivery,
  ParcelDeliveryStatus,
} from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';
import {
  calculateDatesDifferenceInMonths,
  getDateFullMonthsAgo,
} from '@app/ep/shared/utils/date';
import { groupBy } from 'ramda';

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

    const today = new Date();
    const yearAgo = getDateFullMonthsAgo(11, today);

    const parcels =
      await this.parcelDeliveryRepository.getParcelDeliveriesStats({
        filters: {
          date: {
            from: yearAgo,
            to: today,
          },
        },
      });

    const monthDifference = calculateDatesDifferenceInMonths({
      firstDate: yearAgo,
      secondDate: today,
    });

    return {
      chartData: getChartData({
        parcels,
        amountOfMonths: monthDifference + 1,
        dateFrom: today,
      }),
      totalStats: {
        totalParcelsCount,
        unresolvedParcelsCount,
        deliveredParcelsCount,
      },
    };
  }
}

function getChartData({
  parcels,
  amountOfMonths,
  dateFrom,
}: {
  parcels: ParcelDelivery[];
  amountOfMonths: number;
  dateFrom: Date;
}) {
  const datesForPastMonths = Array.from({ length: amountOfMonths }, (_, i) => {
    return getDateFullMonthsAgo(i, dateFrom).toDateString();
  });

  const parcelsGroupedByMonth = groupBy((parcel) => {
    const date = new Date(parcel.createdAt);
    date.setDate(1);
    return date.toDateString();
  }, parcels);

  const chartData = datesForPastMonths.map((dateKey) => {
    const parcelsForPeriod = parcelsGroupedByMonth[dateKey];
    const date = new Date(dateKey);

    return {
      period: date
        .toLocaleString('en-US', {
          month: 'short',
          year: '2-digit',
        })
        .replace(' ', " '"),
      rawDate: date,
      deliveredParcelsCount:
        parcelsForPeriod?.filter(
          (v) => v.status === ParcelDeliveryStatus.DELIVERED,
        ).length || 0,
      totalIncome: Number(
        parcelsForPeriod?.reduce((prev, curr) => {
          prev += Number(curr.price);
          return prev;
        }, 0) || 0,
      ).toFixed(2),
    };
  });

  return { items: chartData, hasData: !!parcels.length };
}

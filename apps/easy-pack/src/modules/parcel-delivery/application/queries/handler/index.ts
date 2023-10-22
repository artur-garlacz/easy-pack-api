import { GetParcelDeliveriesStatsHandler } from '@app/ep/modules/parcel-delivery/application/queries/handler/get-parcel-deliveries-stats.handler';
import { GetParcelDeliveriesHandler } from './get-parcel-deliveries.handler';
import { GetParcelDeliveryDetailsHandler } from './get-parcel-delivery-details.handler';

export const QueryHandlers = [
  GetParcelDeliveryDetailsHandler,
  GetParcelDeliveriesHandler,
  GetParcelDeliveriesStatsHandler,
];

import { GetParcelDeliveriesHandler } from './get-parcel-deliveries.handler';
import { GetParcelDeliveryStatusesHandler } from './get-parcel-delivery-statuses.handler';

export const QueryHandlers = [
  GetParcelDeliveryStatusesHandler,
  GetParcelDeliveriesHandler,
];

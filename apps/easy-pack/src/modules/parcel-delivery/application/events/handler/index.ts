import { CourierAssignedToParcelHandler } from '@app/ep/modules/parcel-delivery/application/events/handler/courier-assigned-to-parcel.handler';
import { ParcelDeliveryCreatedHandler } from './parcel-delivery-created.handler';
import { ParcelDeliveryStatusCreatedHandler } from './parcel-delivery-status-updated.handler';

export const EventHandlers = [
  ParcelDeliveryCreatedHandler,
  CourierAssignedToParcelHandler,
  ParcelDeliveryStatusCreatedHandler,
];

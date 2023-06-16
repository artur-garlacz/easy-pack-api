import { CourierAssignedToParcelHandler } from 'src/modules/parcel-delivery/application/events/handler/courier-assigned-to-parcel.handler';
import { ParcelDeliveryCreatedHandler } from './parcel-delivery-created.handler';

export const EventHandlers = [
  ParcelDeliveryCreatedHandler,
  CourierAssignedToParcelHandler,
];

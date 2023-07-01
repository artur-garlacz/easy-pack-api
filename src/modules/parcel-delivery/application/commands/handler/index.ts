import { UpdateParcelDeliveryStatusHandler } from './update-parcel-delivery-status.handler';
import { CreateParcelDeliveryHandler } from './create-parcel-delivery.handler';

export const CommandHandlers = [
  CreateParcelDeliveryHandler,
  UpdateParcelDeliveryStatusHandler,
];

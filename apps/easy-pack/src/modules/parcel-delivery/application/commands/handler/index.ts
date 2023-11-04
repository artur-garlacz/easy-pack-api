import { UpdateParcelDeliveryStatusHandler } from './update-parcel-delivery-status.handler';
import { CreateParcelDeliveryHandler } from './create-parcel-delivery.handler';
import { AssignCourierToParcelDeliveryHandler } from '@app/ep/modules/parcel-delivery/application/commands/handler/assign-courier-to-parcel.handler';

export const CommandHandlers = [
  CreateParcelDeliveryHandler,
  UpdateParcelDeliveryStatusHandler,
  AssignCourierToParcelDeliveryHandler,
];

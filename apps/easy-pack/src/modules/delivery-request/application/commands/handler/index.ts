import { CreateDeliveryRequestHandler } from './create-delivery-request.handler';
import { UpdateDeliveryRequestStatusHandler } from './update-delivery-request-status.handler';

export const CommandHandlers = [
  CreateDeliveryRequestHandler,
  UpdateDeliveryRequestStatusHandler,
];

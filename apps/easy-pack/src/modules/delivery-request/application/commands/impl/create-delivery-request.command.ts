import { CreateDeliveryRequestCommandValidator } from '@app/ep/modules/delivery-request/application/commands/schemas';

export class CreateDeliveryRequestCommand {
  constructor(public readonly payload: CreateDeliveryRequestCommandValidator) {}
}

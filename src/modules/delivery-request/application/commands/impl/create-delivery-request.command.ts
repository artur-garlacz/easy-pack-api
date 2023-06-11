import { CreateDeliveryRequestCommandValidator } from 'src/modules/delivery-request/application/commands/schemas';

export class CreateDeliveryRequestCommand {
  constructor(public readonly payload: CreateDeliveryRequestCommandValidator) {}
}

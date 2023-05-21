import { CreateDeliveryRequestCommandValidator } from 'src/modules/parcel-delivery/application/commands/schemas';

export class CreateDeliveryRequestCommand {
  constructor(public readonly payload: CreateDeliveryRequestCommandValidator) {}
}

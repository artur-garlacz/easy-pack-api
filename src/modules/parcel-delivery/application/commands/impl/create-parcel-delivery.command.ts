import { IsString } from 'class-validator';

export class CreateParcelDeliveryCommand {
  constructor(public readonly payload: CreateParcelDeliveryCommandValidator) {}
}

export class CreateParcelDeliveryCommandValidator {
  @IsString()
  userId: string;

  @IsString()
  deliveryRequestId: string;
}

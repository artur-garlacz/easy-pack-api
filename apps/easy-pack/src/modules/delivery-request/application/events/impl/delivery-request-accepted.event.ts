import { IsString } from 'class-validator';

export class DeliveryRequestAcceptedEvent {
  constructor(public readonly payload: DeliveryRequestAcceptedEventValidator) {}
}

export class DeliveryRequestAcceptedEventValidator {
  @IsString()
  userId: string;
  @IsString()
  deliveryRequestId: string;
}

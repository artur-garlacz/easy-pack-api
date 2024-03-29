import { IsString } from 'class-validator';
import { DeliveryRequestStatus } from '@app/ep/modules/delivery-request/domain/entity/delivery-request';

export class UpdateDeliveryRequestStatusCommand {
  constructor(
    public readonly payload: UpdateDeliveryRequestStatusCommandValidator,
  ) {}
}

export class UpdateDeliveryRequestStatusCommandValidator {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsString()
  status: DeliveryRequestStatus.ACCEPTED | DeliveryRequestStatus.REJECTED;
}

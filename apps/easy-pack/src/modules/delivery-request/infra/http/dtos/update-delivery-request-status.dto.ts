import { IsString } from 'class-validator';
import { DeliveryRequestStatus } from '@app/ep/modules/delivery-request/domain/entity/delivery-request';

export class UpdateDeliveryRequestStatusDto {
  @IsString()
  status: DeliveryRequestStatus.ACCEPTED | DeliveryRequestStatus.REJECTED;
}

import { IsString } from 'class-validator';
import { DeliveryRequestStatus } from 'src/modules/delivery-request/domain/entity/delivery-request';

export class UpdateDeliveryRequestStatusDto {
  @IsString()
  status: DeliveryRequestStatus.ACCEPTED | DeliveryRequestStatus.REJECTED;
}

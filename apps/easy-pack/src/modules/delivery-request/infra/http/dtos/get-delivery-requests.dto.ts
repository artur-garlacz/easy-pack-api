import { DeliveryRequestStatus } from '@app/ep/modules/delivery-request/domain/entity/delivery-request';
import { IsEnum, IsOptional } from 'class-validator';

export class GetDeliveryRequestFiltersDto {
  @IsEnum(DeliveryRequestStatus)
  @IsOptional()
  status: DeliveryRequestStatus;
}

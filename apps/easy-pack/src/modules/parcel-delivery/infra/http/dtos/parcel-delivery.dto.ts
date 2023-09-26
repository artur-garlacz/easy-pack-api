import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ParcelDeliveryStatus } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';

export class UpdateParcelDeliveryStatusDto {
  @IsEnum(ParcelDeliveryStatus)
  status:
    | ParcelDeliveryStatus.PENDING
    | ParcelDeliveryStatus.IN_TRANSIT
    | ParcelDeliveryStatus.DELIVERED;
}

export class ParcelDeliveryFiltersDto {
  @IsEnum(ParcelDeliveryStatus)
  @IsOptional()
  status:
    | ParcelDeliveryStatus.PENDING
    | ParcelDeliveryStatus.IN_TRANSIT
    | ParcelDeliveryStatus.DELIVERED;

  @IsOptional()
  @IsString()
  userId: string;
}

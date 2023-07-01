import { IsEnum } from 'class-validator';
import { ParcelDeliveryStatus } from 'src/modules/parcel-delivery/domain/parcel-delivery';

export class UpdateParcelDeliveryStatusDto {
  @IsEnum(ParcelDeliveryStatus)
  status:
    | ParcelDeliveryStatus.PENDING
    | ParcelDeliveryStatus.IN_TRANSIT
    | ParcelDeliveryStatus.DELIVERED;
}

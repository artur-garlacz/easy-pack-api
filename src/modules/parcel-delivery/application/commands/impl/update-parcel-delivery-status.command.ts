import { IsEnum, IsString } from 'class-validator';
import { ParcelDeliveryStatus } from 'src/modules/parcel-delivery/domain/parcel-delivery';

export class UpdateParcelDeliveryStatusCommand {
  constructor(
    public readonly payload: UpdateParcelDeliveryStatusCommandValidator,
  ) {}
}

class UpdateParcelDeliveryStatusCommandValidator {
  @IsString()
  id: string;

  @IsString()
  userId: string;

  @IsEnum(ParcelDeliveryStatus)
  status: ParcelDeliveryStatus;
}

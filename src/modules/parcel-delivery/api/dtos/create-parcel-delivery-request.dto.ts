import { IsString } from 'class-validator';

export class CreateParcelDeliveryRequestDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

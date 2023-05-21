import { IsString } from 'class-validator';

export class CreateDeliveryRequestValidator {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  cognitoId: string;
}

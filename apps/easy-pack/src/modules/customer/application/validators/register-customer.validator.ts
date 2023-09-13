import { IsString } from 'class-validator';

export class RegisterCustomerValidator {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  cognitoId: string;
}

import { IsEmail, IsString } from 'class-validator';

export class RegisterCustomerCommandValidator {
  @IsEmail()
  email: string;

  @IsString()
  cognitoId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

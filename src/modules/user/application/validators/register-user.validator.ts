import { IsString } from 'class-validator';

export class RegisterUserValidator {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  cognitoId: string;
}

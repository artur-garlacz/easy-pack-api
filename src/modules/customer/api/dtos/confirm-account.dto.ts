import { IsEmail, IsString } from 'class-validator';

export class ConfirmAccountDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}

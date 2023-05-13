import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginCustomerDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  password: string;
}

import { RegisterUserValidator } from 'src/modules/user/application/validators/register-user.validator';

export class RegisterUserCommand {
  constructor(public readonly payload: RegisterUserValidator) {}
}

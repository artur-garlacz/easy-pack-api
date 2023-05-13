import { RegisterUserValidator } from 'src/modules/user/application/validators/register-user.validator';

export class UserRegisteredEvent {
  constructor(public readonly payload: RegisterUserValidator) {}
}

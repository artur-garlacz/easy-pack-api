import { type RegisterCustomerCommandValidator } from 'src/modules/customer/application/commands/schemas';

export class RegisterCustomerCommand {
  constructor(public readonly payload: RegisterCustomerCommandValidator) {}
}

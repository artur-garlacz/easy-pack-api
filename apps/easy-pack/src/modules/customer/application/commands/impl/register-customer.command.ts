import { type RegisterCustomerCommandValidator } from '@app/ep/modules/customer/application/commands/schemas';

export class RegisterCustomerCommand {
  constructor(public readonly payload: RegisterCustomerCommandValidator) {}
}

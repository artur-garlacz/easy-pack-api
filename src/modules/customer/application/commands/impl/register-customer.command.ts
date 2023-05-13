import { RegisterCustomerValidator } from 'src/modules/customer/application/validators/register-customer.validator';

export class RegisterCustomerCommand {
  constructor(public readonly payload: RegisterCustomerValidator) {}
}

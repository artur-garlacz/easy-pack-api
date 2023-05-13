import { RegisterCustomerValidator } from 'src/modules/customer/application/validators/register-customer.validator';

export class CustomerRegisteredEvent {
  constructor(public readonly payload: RegisterCustomerValidator) {}
}

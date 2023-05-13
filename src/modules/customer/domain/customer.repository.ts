import { Customer } from 'src/modules/customer/domain/customer.entity';

export const ICustomerRepository = Symbol('ICustomerRepository');

export interface ICreateCustomer {
  email: string;
  cognitoId: string;
}

export interface ICustomerRepository {
  getById: (id: string) => Promise<Customer | null>;
  getByCognitoId: (id: string) => Promise<Customer | null>;
  create: (customer: ICreateCustomer) => Promise<Customer>;
}

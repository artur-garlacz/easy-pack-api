import { Customer } from '@app/ep/modules/customer/domain/customer.entity';

export const ICustomerRepository = Symbol('ICustomerRepository');

export interface ICreateCustomer {
  email: string;
  cognitoId: string;
  firstName: string;
  lastName: string;
}

export interface ICustomerRepository {
  getById: (id: string) => Promise<Customer | null>;
  getByCognitoId: (id: string) => Promise<Customer | null>;
  getByEmail: (email: string) => Promise<Customer | null>;
  create: (customer: ICreateCustomer) => Promise<Customer>;
}

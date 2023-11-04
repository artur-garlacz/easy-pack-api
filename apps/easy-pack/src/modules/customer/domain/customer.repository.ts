import { Customer } from '@app/ep/modules/customer/domain/customer.entity';

export const ICustomerRepository = Symbol('ICustomerRepository');

export interface ICreateCustomer {
  email: string;
  cognitoId: string;
  firstName: string;
  lastName: string;
}

export type IGetOneArgs = {
  id?: string;
  cognitoId?: string;
  email?: string;
};

export interface ICustomerRepository {
  getOne: (args: IGetOneArgs) => Promise<Customer | null>;
  create: (customer: ICreateCustomer) => Promise<Customer>;
}

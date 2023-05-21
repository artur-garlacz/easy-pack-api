import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  ICreateCustomer,
  ICustomerRepository,
} from 'src/modules/customer/domain/customer.repository';
import { DatabaseProvider } from 'src/shared/db/db.provider';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly db: DatabaseProvider) {}

  async getById() {
    return null;
  }

  async getByEmail(email: string) {
    try {
      const customer = await this.db
        .getKnexInstance()
        .select()
        .from('Customer')
        .where('email', email);

      return customer[0];
    } catch (e) {
      throw new Error('Could not register customer');
    }
  }

  async getByCognitoId(id: string) {
    const customer = await this.db
      .getKnexInstance()
      .select()
      .from('Customer')
      .where('cognitoId', id);

    return customer[0] as any;
  }

  async create({ cognitoId, email, firstName, lastName }: ICreateCustomer) {
    const customer = this.db
      .getKnexInstance()
      .insert({
        id: randomUUID(),
        email,
        cognitoId,
        firstName,
        lastName,
      })
      .into('Customer');

    return customer as any;
  }
}

import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import {
  ICreateCustomer,
  ICustomerRepository,
} from 'src/modules/customer/domain/customer.repository';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getById() {
    return null;
  }

  async getByCognitoId(id: string) {
    const customer = this.knex
      .table('Customer')
      .select('*')
      .where('cognitoId', id);

    return customer as any;
  }

  async create({ cognitoId, email }: ICreateCustomer) {
    const user = this.knex
      .insert({
        id: randomUUID(),
        email,
        cognitoId,
        firstName: 'sd',
        lastName: 'sd',
        role: 'COURIER',
      })
      .into('User');

    return user as any;
  }
}

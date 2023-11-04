import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  ICreateCustomer,
  ICustomerRepository,
  IGetOneArgs,
} from '@app/ep/modules/customer/domain/customer.repository';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';
import { removeEmptyProperties } from '@app/ep/shared/utils/object';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly db: DatabaseProvider) {}

  async getOne(filters: IGetOneArgs) {
    const conditions = removeEmptyProperties(filters);
    const [customer] = await this.db
      .getKnexInstance()
      .select()
      .from('Customer')
      .where(conditions);

    return customer || null;
  }

  async create({ cognitoId, email, firstName, lastName }: ICreateCustomer) {
    const [customer] = await this.db
      .getKnexInstance()
      .insert({
        id: randomUUID(),
        email,
        cognitoId,
        firstName,
        lastName,
      })
      .into('Customer')
      .returning('*');

    return customer;
  }
}

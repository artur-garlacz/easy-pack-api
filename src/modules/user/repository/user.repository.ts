import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import {
  ICreateUser,
  IUserRepository,
} from 'src/modules/user/domain/repository/user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getById(id: string) {
    return null;
  }

  async create({ cognitoId, email }: ICreateUser) {
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

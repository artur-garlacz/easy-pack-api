import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  ICreateUser,
  IUserRepository,
} from 'src/modules/user/domain/user.repository';
import { DatabaseProvider } from 'src/shared/db/db.provider';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly db: DatabaseProvider) {}

  async getById(id: string) {
    return null;
  }

  async create({ cognitoId, email }: ICreateUser) {
    const user = this.db
      .getKnexInstance()
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

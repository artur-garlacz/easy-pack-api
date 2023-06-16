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

  async getByCognitoId(id: string) {
    const [user] = await this.db
      .getKnexInstance()
      .select()
      .from('User')
      .where('cognitoId', id);

    return user as any;
  }

  async create({ cognitoId, email, firstName, lastName }: ICreateUser) {
    const user = this.db
      .getKnexInstance()
      .insert({
        id: randomUUID(),
        email,
        cognitoId,
        firstName,
        lastName,
        role: 'COURIER',
      })
      .into('User');

    return user as any;
  }
}

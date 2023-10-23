import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  ICourier,
  ICreateUser,
  IUserRepository,
} from '@app/ep/modules/user/domain/user.repository';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly db: DatabaseProvider) {}

  async getById(id: string) {
    const [user] = await this.db
      .getKnexInstance()
      .select()
      .from('User')
      .where('id', id);

    return user;
  }

  async getByCognitoId(cognitoId: string) {
    const [user] = await this.db
      .getKnexInstance()
      .select()
      .from('User')
      .where('cognitoId', cognitoId);

    return user;
  }

  async create({ cognitoId, email, firstName, lastName, role }: ICreateUser) {
    const user = await this.db
      .getKnexInstance()
      .insert({
        id: randomUUID(),
        email,
        cognitoId,
        firstName,
        lastName,
        role,
      })
      .into('User');

    return user as any;
  }

  async getCouriers(): Promise<ICourier[]> {
    const [couriers] = await this.db
      .getKnexInstance()
      .select('*')
      .from('User')
      .where('role', '=', 'COURIER');

    return couriers;
  }
}

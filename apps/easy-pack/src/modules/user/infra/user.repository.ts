import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  ICourier,
  ICreateUser,
  IGetCouriersArgs,
  IGetManyUsersArgs,
  IGetUsersCountArgs,
  IUserRepository,
} from '@app/ep/modules/user/domain/user.repository';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';
import { Courier } from '@app/ep/modules/user/domain/user.entity';

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

  async getMany({
    pagination: { limit, page },
    filters: { role },
  }: IGetManyUsersArgs): Promise<Courier[]> {
    const couriers = await this.db
      .getKnexInstance()
      .select('*')
      .from('User')
      .where('role', '=', role)
      .limit(limit)
      .offset((page - 1) * limit);

    return couriers;
  }

  async getCount({ filters: { role } }: IGetUsersCountArgs): Promise<number> {
    const couriers = await this.db
      .getKnexInstance()
      .from('User')
      .where('role', '=', role)
      .count('id')
      .first();

    return Number(couriers.count) || 0;
  }
}

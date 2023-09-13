import { USER_ROLE, User } from 'src/modules/user/domain/user.entity';

export const IUserRepository = Symbol('IUserRepository');

export interface ICreateUser {
  email: string;
  cognitoId: string;
  firstName: string;
  lastName: string;
  role: USER_ROLE;
}

export interface IUserRepository {
  getById: (id: string) => Promise<User | null>;
  getByCognitoId: (id: string) => Promise<User | null>;
  create: (user: ICreateUser) => Promise<User>;
}

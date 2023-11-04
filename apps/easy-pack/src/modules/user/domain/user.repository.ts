import {
  Courier,
  USER_ROLE,
  User,
} from '@app/ep/modules/user/domain/user.entity';
import { Pagination } from '@app/ep/shared/utils/pagination';

export const IUserRepository = Symbol('IUserRepository');

export type ICreateUser = {
  email: string;
  cognitoId: string;
  firstName: string;
  lastName: string;
  role: USER_ROLE;
};

export type ICourier = {
  email: string;
  firstName: string;
  lastName: string;
};

export type IGetCouriersArgs = {
  pagination: Pagination;
};

export type IGetManyUsersArgs = {
  pagination: Pagination;
  filters?: {
    role?: USER_ROLE;
  };
};
export type IGetUsersCountArgs = Pick<IGetManyUsersArgs, 'filters'>;

export interface IUserRepository {
  getById: (id: string) => Promise<User | null>;
  getByCognitoId: (id: string) => Promise<User | null>;
  create: (user: ICreateUser) => Promise<User>;
  getMany: (args: IGetManyUsersArgs) => Promise<Courier[]>;
  getCount: (args: IGetUsersCountArgs) => Promise<number>;
}

import { User } from 'src/modules/user/domain/user.entity';

export interface UserRepository {
  get: (id: string) => Promise<User>;
  find: (id: string) => Promise<User | null>;
  add: (user: User) => Promise<void>;
  save: (user: User) => Promise<User>;
}

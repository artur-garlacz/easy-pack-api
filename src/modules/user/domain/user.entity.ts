import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

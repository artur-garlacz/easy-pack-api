import { AggregateRoot } from '@nestjs/cqrs';

export class Customer extends AggregateRoot {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor() {
    super();
  }
}

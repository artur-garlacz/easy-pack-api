export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export enum USER_ROLE {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  COURIER = 'COURIER',
}

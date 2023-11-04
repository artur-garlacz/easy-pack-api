export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: USER_ROLE;
}

export type Courier = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: USER_ROLE;
  assignedParcelsCount: number;
};

export enum USER_ROLE {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  COURIER = 'COURIER',
}

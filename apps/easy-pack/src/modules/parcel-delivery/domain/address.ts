export class Address {
  public readonly street: string;
  public readonly city: string;
  public readonly country: string;
  public readonly postalCode: string;
  public readonly locationNumber: string;
  public readonly phoneNumber?: string;
  public readonly email?: string;
}

export class ParcelAddress extends Address {
  public readonly id: string;

  constructor(private data: Address & { id: string }) {
    super();
  }
}

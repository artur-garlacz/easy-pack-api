export class DeliveryRequestAddress {
  constructor(public readonly id: string, public readonly address: Address) {}
}

class Address {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly street: string;
  public readonly city: string;
  public readonly country: string;
  public readonly postalCode: string;
  public readonly locationNumber: string;
  public readonly phoneNumber: string;
  public readonly email: string;
}

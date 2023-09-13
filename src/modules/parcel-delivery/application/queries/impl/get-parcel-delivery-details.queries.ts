export class GetParcelDeliveryDetailsQuery {
  constructor(
    public readonly args: {
      trackingNumber?: string;
      parcelId?: string;
    },
  ) {}
}

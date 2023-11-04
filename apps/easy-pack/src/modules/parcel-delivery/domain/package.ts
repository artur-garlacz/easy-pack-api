export class Package {
  constructor(
    public readonly id: string,
    public readonly measurementUnit: MeasurementUnit,
    public readonly weight: number,
    public readonly length: number,
    public readonly width: number,
    public readonly height: number,
    public readonly description: string,
    public readonly parcelDeliveryId: string,
  ) {}
}

export enum MeasurementUnit {
  CM = 'CM',
}

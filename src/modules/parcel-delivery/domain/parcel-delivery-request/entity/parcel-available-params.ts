interface ParcelParams {
  maxWidth: number;
  maxHeight: number;
  maxLength: number;
  maxWeight: number;
  unit: MeasureUnit;
  size: ParcelSize;
}

export class SmallParcelParams implements ParcelParams {
  maxWeight = 8;
  maxLength = 15;
  maxWidth = 8;
  maxHeight = 30;
  unit = MeasureUnit.Cm;
  size = ParcelSize.Small;
}

export class MediumParcelParams implements ParcelParams {
  maxWeight = 15;
  maxLength = 20;
  maxWidth = 20;
  maxHeight = 40;
  unit = MeasureUnit.Cm;
  size = ParcelSize.Medium;
}

export class LargeParcelParams implements ParcelParams {
  maxWeight = 20;
  maxLength = 30;
  maxWidth = 50;
  maxHeight = 40;
  unit = MeasureUnit.Cm;
  size = ParcelSize.Large;
}

enum MeasureUnit {
  Cm = 'CM',
}

enum ParcelSize {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
  Custom = 'CUSTOM',
}

import { IsString } from 'class-validator';

export class AssignCourierToParcelCommand {
  constructor(public readonly payload: AssignCourierToParcelCommandValidator) {}
}

export class AssignCourierToParcelCommandValidator {
  @IsString()
  userId: string;

  @IsString()
  parcelDeliveryId: string;
}

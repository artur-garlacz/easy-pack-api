import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum PackageType {
  ENVELOPE = 'ENVELOPE',
  BOX = 'BOX',
  OTHER = 'OTHER',
}

class PackageDto {
  @IsNumber()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsString()
  description: string;
}

class AddressDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  street: string;
  @IsString()
  city: string;
  @IsString()
  country: string;
  @IsString()
  postalCode: string;
  @IsString()
  locationNumber: string;
  @IsString()
  phoneNumber: string;
  @IsEmail()
  email: string;
}

export class CreateDeliveryRequestCommandValidator {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => PackageDto)
  packages: PackageDto[];

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  pickUpAddress: AddressDto;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  deliveryAddress: AddressDto;

  @IsEnum(PackageType)
  type: PackageType;

  @IsString()
  description: string;

  @IsString()
  shipmentAt: Date | string;
}

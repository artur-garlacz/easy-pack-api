import { PackageType } from '@app/ep/modules/parcel-delivery/domain/parcel-delivery';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateParcelDeliveryCommand {
  constructor(public readonly payload: CreateParcelDeliveryCommandValidator) {}
}

class PackageDto {
  @IsEnum(PackageType)
  type: PackageType;

  @IsNumber()
  weight: number;

  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsString()
  @IsOptional()
  description: string;
}

class AddressDto {
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
  @IsOptional()
  phoneNumber: string;
  @IsEmail()
  @IsOptional()
  email: string;
}

export class CreateParcelDeliveryCommandValidator {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => PackageDto)
  packages: PackageDto[];

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  pickupAddress: AddressDto;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  deliveryAddress: AddressDto;

  @IsString()
  customerId: string;

  @IsString()
  description: string;

  @IsString()
  pickupAt: string;

  @IsString()
  shipmentAt: string;
}

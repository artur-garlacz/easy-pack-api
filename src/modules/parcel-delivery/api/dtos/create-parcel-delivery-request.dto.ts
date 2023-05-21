import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum PackageType {
  'ENVELOPE',
  'BOX',
  'OTHER',
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
  phoneNumber: string;
  @IsEmail()
  email: string;
}

export class CreateParcelDeliveryRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => PackageDto)
  packages: PackageDto[];

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  pickUpAddress: AddressDto;

  deliveryAddress: AddressDto;
}

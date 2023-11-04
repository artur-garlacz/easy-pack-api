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

  @IsString()
  description: string;

  @IsString()
  shipmentAt: Date | string;

  @IsString()
  customerId: string;
}

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EstimateDeliveryRequestCostDto {
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  pickUpAddress: string;

  @IsString()
  @IsOptional()
  shipmentUpAddress: string;

  @IsString()
  @IsOptional()
  packagesCount: string;
}

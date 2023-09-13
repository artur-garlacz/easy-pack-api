import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, Max, Min } from 'class-validator';

export type PaginatedResult<T> = {
  data: T[];
  numberOfPages: number;
  totalCount: number;
};

export type Pagination = {
  page: number;
  limit: number;
};

// export class PaginationDto {
//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber()
//   @Min(1)
//   page?: number = 1;

//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber()
//   limit?: number = 10;

//   constructor(page = 1, limit = 10) {
//     this.page = page;
//     this.limit = limit;
//   }
// }

export class PaginationDto {
  //   @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  //   @IsEnum(Order)
  //   @IsOptional()
  //   readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @IsInt()
  @ApiProperty()
  readonly page: number;

  @IsInt()
  @ApiProperty()
  readonly totalCount: number;

  @IsInt()
  @ApiProperty()
  readonly totalPages: number;

  constructor(data: T[], page: number, totalCount: number, totalPages: number) {
    this.data = data;
    this.page = page;
    this.totalCount = totalCount;
    this.totalPages = totalPages;
  }
}

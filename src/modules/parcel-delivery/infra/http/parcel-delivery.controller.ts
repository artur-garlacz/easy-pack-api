import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { GetParcelDeliveryStatusesQuery } from 'src/modules/parcel-delivery/application/queries/impl/get-parcel-delivery-statuses.queries';

@Controller()
export class ParcelDeliveryController {
  constructor(private queryBus: QueryBus) {}

  @Get('/api/parcel-delivery')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for getting parcel delivery details',
  })
  async getDeliveryRequest(@Query('parcelNumber') parcelNumber: string) {
    await this.queryBus.execute(
      new GetParcelDeliveryStatusesQuery(parcelNumber),
    );

    return {};
  }
}

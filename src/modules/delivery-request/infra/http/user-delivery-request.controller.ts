import { Controller, Get, HttpStatus } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { GetDeliveryRequestsQuery } from 'src/modules/delivery-request/application/queries/impl/get-delivery-requests.query';

@Controller()
export class UserDeliveryRequestController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('/api/users/delivery-requests')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for creating parcel delivery requests',
  })
  getDeliveryRequests() {
    return this.queryBus.execute(new GetDeliveryRequestsQuery());
  }
}

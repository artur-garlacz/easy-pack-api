import { Body, Controller, Get, HttpStatus, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateDeliveryRequestStatusCommand } from 'src/modules/delivery-request/application/commands/impl/update-delivery-request.command';
import { GetDeliveryRequestsQuery } from 'src/modules/delivery-request/application/queries/impl/get-delivery-requests.query';
import { UpdateDeliveryRequestStatusDto } from 'src/modules/delivery-request/infra/http/dtos/update-delivery-request-status.dto';

@Controller()
export class UserDeliveryRequestController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('/api/users/delivery-requests')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for getting parcel delivery requests',
  })
  getDeliveryRequests() {
    return this.queryBus.execute(new GetDeliveryRequestsQuery());
  }

  @Put('/api/users/delivery-requests/:id/status')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for updating parcel delivery request status',
  })
  updateDeliveryRequestStatus(
    @Param('id') id: string,
    @Body()
    { status }: UpdateDeliveryRequestStatusDto,
  ) {
    return this.commandBus.execute(
      new UpdateDeliveryRequestStatusCommand({ id, status }),
    );
  }
}

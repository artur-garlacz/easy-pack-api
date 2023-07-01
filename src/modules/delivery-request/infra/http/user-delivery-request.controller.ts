import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/modules/auth/auth.guard';
import { UpdateDeliveryRequestStatusCommand } from 'src/modules/delivery-request/application/commands/impl/update-delivery-request.command';
import { GetDeliveryRequestsQuery } from 'src/modules/delivery-request/application/queries/impl/get-delivery-requests.query';
import { DeliveryRequestStatus } from 'src/modules/delivery-request/domain/entity/delivery-request';
import { UpdateDeliveryRequestStatusDto } from 'src/modules/delivery-request/infra/http/dtos/update-delivery-request-status.dto';

@Controller()
export class UserDeliveryRequestController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('/api/users/delivery-requests')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for getting parcel delivery requests',
  })
  getDeliveryRequests(@Query('status') status: DeliveryRequestStatus) {
    return this.queryBus.execute(new GetDeliveryRequestsQuery({ status }));
  }

  @Put('/api/users/delivery-requests/:id/status')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for updating parcel delivery request status',
  })
  @UseGuards(UserAuthGuard)
  async updateDeliveryRequestStatus(
    @Request() req: any,
    @Param('id') id: string,
    @Body()
    { status }: UpdateDeliveryRequestStatusDto,
  ) {
    await this.commandBus.execute(
      new UpdateDeliveryRequestStatusCommand({
        id,
        status,
        userId: req.user.userId,
      }),
    );

    return { message: 'Successfully updated request status' };
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { CustomerAuthGuard } from '@app/ep/modules/auth/auth.guard';
import { CreateDeliveryRequestCommand } from '@app/ep/modules/delivery-request/application/commands/impl/create-delivery-request.command';
import { GetDeliveryRequestsQuery } from '@app/ep/modules/delivery-request/application/queries/impl/get-delivery-requests.query';
import { CreateDeliveryRequestDto } from '@app/ep/modules/delivery-request/infra/http/dtos/create-delivery-request.dto';
import { PaginationDto } from '@app/ep/shared/utils/pagination';

@Controller()
export class CustomerDeliveryRequestController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/api/customers/delivery-requests')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for creating parcel delivery requests',
  })
  @UseGuards(CustomerAuthGuard)
  async createDeliveryRequest(
    @Body()
    deliveryRequest: CreateDeliveryRequestDto,
    @Request() req: any,
  ) {
    await this.commandBus.execute(
      new CreateDeliveryRequestCommand({
        ...deliveryRequest,
        customerId: req.user.userId,
      }),
    );

    return { message: 'Successfully requested for parcel delivery' };
  }

  @Get('/api/customers/delivery-requests')
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Endpoint for getting customer's parcel delivery requests",
  })
  @UseGuards(CustomerAuthGuard)
  getDeliveryRequests(@Request() req: any, @Query() pagination: PaginationDto) {
    return this.queryBus.execute(
      new GetDeliveryRequestsQuery(pagination, { customerId: req.user.userId }),
    );
  }
}

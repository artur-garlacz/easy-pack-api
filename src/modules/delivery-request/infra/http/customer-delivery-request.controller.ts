import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { CustomerAuthGuard } from 'src/modules/auth/auth.guard';
import { CreateDeliveryRequestCommand } from 'src/modules/delivery-request/application/commands/impl/create-delivery-request.command';
import { GetDeliveryRequestsQuery } from 'src/modules/delivery-request/application/queries/impl/get-delivery-requests.query';
import { CreateDeliveryRequestDto } from 'src/modules/delivery-request/infra/http/dtos/create-delivery-request.dto';

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
  getDeliveryRequests(@Request() req: any) {
    return this.queryBus.execute(
      new GetDeliveryRequestsQuery({ customerId: req.user.userId }),
    );
  }
}

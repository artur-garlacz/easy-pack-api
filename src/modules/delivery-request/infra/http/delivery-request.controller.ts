import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { CreateDeliveryRequestCommand } from 'src/modules/delivery-request/application/commands/impl/create-delivery-request.command';
import { CreateDeliveryRequestDto } from 'src/modules/delivery-request/infra/http/dtos/create-delivery-request.dto';

@Controller()
export class DeliveryRequestController {
  constructor(private commandBus: CommandBus) {}

  @Post('/api/delivery-requests')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for creating parcel delivery requests',
  })
  createDeliveryRequest(
    @Body()
    deliveryRequest: CreateDeliveryRequestDto,
  ) {
    return this.commandBus.execute(
      new CreateDeliveryRequestCommand(deliveryRequest),
    );
  }
}

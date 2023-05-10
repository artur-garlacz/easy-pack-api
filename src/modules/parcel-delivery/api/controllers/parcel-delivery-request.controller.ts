import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class ParcelDeliveryRequestController {
  @Post('/api/parcel-delivery-requests')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for checking if app is up and running',
  })
  createParcelDeliveryRequest(): string {
    return 'Ok';
  }
}

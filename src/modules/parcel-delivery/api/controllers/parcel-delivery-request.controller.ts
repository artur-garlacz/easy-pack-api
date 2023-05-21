import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class ParcelDeliveryRequestController {
  @Post('/api/parcel-delivery-requests')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for creating parcel delivery requests',
  })
  createParcelDeliveryRequest(): string {
    return 'Ok';
  }
}

import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateParcelDeliveryRequestDto } from 'src/modules/parcel-delivery/api/dtos/create-parcel-delivery-request.dto';

@Controller()
export class ParcelDeliveryRequestController {
  @Post('/api/parcel-delivery-requests')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for creating parcel delivery requests',
  })
  createParcelDeliveryRequest(
    @Body() parcelRequest: CreateParcelDeliveryRequestDto,
  ): string {
    return 'Ok';
  }
}

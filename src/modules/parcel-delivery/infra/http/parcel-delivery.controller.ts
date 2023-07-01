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
import { UpdateParcelDeliveryStatusCommand } from 'src/modules/parcel-delivery/application/commands/impl/update-parcel-delivery-status.command';
import { GetParcelDeliveriesQuery } from 'src/modules/parcel-delivery/application/queries/impl/get-parcel-deliveries.queries';
import { GetParcelDeliveryStatusesQuery } from 'src/modules/parcel-delivery/application/queries/impl/get-parcel-delivery-statuses.queries';
import { UpdateParcelDeliveryStatusDto } from 'src/modules/parcel-delivery/infra/http/dtos/update-parcel-delivery-status.dto';

@Controller()
export class ParcelDeliveryController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Get('/api/parcel-delivery')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for getting parcel delivery details',
  })
  async getParcelDelivery(@Query('parcelNumber') parcelNumber?: string) {
    if (parcelNumber) {
      return await this.queryBus.execute(
        new GetParcelDeliveryStatusesQuery(parcelNumber),
      );
    }
  }

  @Get('/api/parcel-deliveries')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for getting parcel delivery details',
  })
  @UseGuards(UserAuthGuard)
  async getParcelDeliveries(@Request() req: any) {
    return await this.queryBus.execute(
      new GetParcelDeliveriesQuery(req.user.userId),
    );
  }

  @Put('/api/parcel-delivery/:id/status')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for updating parcel delivery status',
  })
  @UseGuards(UserAuthGuard)
  async updateParcelDeliveryStatus(
    @Request() req: any,
    @Param('id') id: string,
    @Body()
    { status }: UpdateParcelDeliveryStatusDto,
  ) {
    return await this.commandBus.execute(
      new UpdateParcelDeliveryStatusCommand({
        id,
        status,
        userId: req.user.userId,
      }),
    );
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/modules/auth/auth.guard';
import { AssignCourierToParcelCommand } from 'src/modules/parcel-delivery/application/commands/impl/assign-courier-to-parcel.command';
import { UpdateParcelDeliveryStatusCommand } from 'src/modules/parcel-delivery/application/commands/impl/update-parcel-delivery-status.command';
import { GetParcelDeliveriesQuery } from 'src/modules/parcel-delivery/application/queries/impl/get-parcel-deliveries.queries';
import { GetParcelDeliveryDetailsQuery } from 'src/modules/parcel-delivery/application/queries/impl/get-parcel-delivery-details.queries';
import {
  ParcelDeliveryFiltersDto,
  UpdateParcelDeliveryStatusDto,
} from 'src/modules/parcel-delivery/infra/http/dtos/parcel-delivery.dto';
import { PageDto, PaginationDto } from 'src/shared/utils/pagination';

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
        new GetParcelDeliveryDetailsQuery({ trackingNumber: parcelNumber }),
      );
    }
  }

  @Get('/api/parcel-deliveries/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for getting parcel delivery details',
  })
  // @UseGuards(UserAuthGuard)
  async getParcelDeliveryDetails(@Param('id') id: string) {
    return await this.queryBus.execute(
      new GetParcelDeliveryDetailsQuery({
        parcelId: id,
      }),
    );
  }

  @Get('/api/parcel-deliveries')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for getting parcel delivery details',
  })
  // @UseGuards(UserAuthGuard)
  async getParcelDeliveries(
    @Query() pagination: PaginationDto,
    @Query() filters: ParcelDeliveryFiltersDto,
  ): Promise<PageDto<any>> {
    console.log('filters', filters);
    return await this.queryBus.execute(
      new GetParcelDeliveriesQuery(pagination, {}),
    );
  }

  @Patch('/api/parcel-deliveries/:id/status')
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

  @Patch('/api/parcel-deliveries/:id/assigned-users')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for assigning users to parcel delivery',
  })
  // @UseGuards(UserAuthGuard)
  async assignUserToParcelDelivery(
    @Param('id') id: string,
    @Body()
    { userId }: { userId: string },
  ) {
    return await this.commandBus.execute(
      new AssignCourierToParcelCommand({
        deliveryRequestId: id,
        userId,
      }),
    );
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { UserAuthGuard } from '@app/ep/modules/auth/auth.guard';
import { AssignCourierToParcelCommand } from '@app/ep/modules/parcel-delivery/application/commands/impl/assign-courier-to-parcel.command';
import { UpdateParcelDeliveryStatusCommand } from '@app/ep/modules/parcel-delivery/application/commands/impl/update-parcel-delivery-status.command';
import { GetParcelDeliveriesQuery } from '@app/ep/modules/parcel-delivery/application/queries/impl/get-parcel-deliveries.queries';
import { GetParcelDeliveryDetailsQuery } from '@app/ep/modules/parcel-delivery/application/queries/impl/get-parcel-delivery-details.queries';
import {
  ParcelDeliveryFiltersDto,
  UpdateParcelDeliveryStatusDto,
} from '@app/ep/modules/parcel-delivery/infra/http/dtos/parcel-delivery.dto';
import { PaginationDto } from '@app/ep/shared/utils/pagination';
import { GetParcelDeliveriesStatsQuery } from '@app/ep/modules/parcel-delivery/application/queries/impl/get-parcel-deliveries-stats.queries';
import {
  CreateParcelDeliveryCommand,
  CreateParcelDeliveryDto,
} from '@app/ep/modules/parcel-delivery/application/commands/impl/create-parcel-delivery.command';

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

  @Post('/api/parcel-deliveries')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for creating parcel deliveries',
  })
  // @UseGuards(CustomerAuthGuard)
  async createDeliveryRequest(
    @Body()
    parcelDelivery: CreateParcelDeliveryDto,
    @Request() req: any,
  ) {
    await this.commandBus.execute(
      new CreateParcelDeliveryCommand({
        ...parcelDelivery,
        customerId: req.user.userId,
      }),
    );

    return { message: 'Parcel delivery created successfully' };
  }

  @Get('/api/parcel-deliveries/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for getting parcel delivery details',
  })
  @UseGuards(UserAuthGuard)
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
  @UseGuards(UserAuthGuard)
  async getParcelDeliveries(
    @Query() pagination: PaginationDto,
    @Query() filters?: ParcelDeliveryFiltersDto,
  ) {
    return await this.queryBus.execute(
      new GetParcelDeliveriesQuery(pagination, {
        status: filters.status,
      }),
    );
  }

  @Get('/api/parcel-deliveries/stats')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for getting parcel deliveries stats',
  })
  @UseGuards(UserAuthGuard)
  async getParcelDeliveriesStats() {
    return await this.queryBus.execute(new GetParcelDeliveriesStatsQuery());
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
    await this.commandBus.execute(
      new UpdateParcelDeliveryStatusCommand({
        id,
        status,
        userId: req.user.userId,
      }),
    );
    return { message: 'Parcel status updated successfully' };
  }

  @Patch('/api/parcel-deliveries/:id/assigned-users')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Endpoint for assigning users to parcel delivery',
  })
  @UseGuards(UserAuthGuard)
  async assignUserToParcelDelivery(
    @Param('id') id: string,
    @Body()
    { userId }: { userId: string },
  ) {
    await this.commandBus.execute(
      new AssignCourierToParcelCommand({
        parcelDeliveryId: id,
        userId,
      }),
    );

    return { message: 'User assigned to parcel successfully' };
  }
}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from '@app/ep/modules/delivery-request/application/commands/handler';
import { EventHandlers } from '@app/ep/modules/delivery-request/application/events/handler';
import { QueryHandlers } from '@app/ep/modules/delivery-request/application/queries/handler';
import { IDeliveryRequestRepository } from '@app/ep/modules/delivery-request/domain/delivery-request.repository';
import { DeliveryRequestRepository } from '@app/ep/modules/delivery-request/infra/db/delivery-request.repository';
import { CustomerDeliveryRequestController } from '@app/ep/modules/delivery-request/infra/http/customer-delivery-request.controller';
import { UserDeliveryRequestController } from '@app/ep/modules/delivery-request/infra/http/user-delivery-request.controller';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';

@Module({
  imports: [CqrsModule],
  controllers: [
    CustomerDeliveryRequestController,
    UserDeliveryRequestController,
  ],
  providers: [
    {
      provide: IDeliveryRequestRepository,
      useClass: DeliveryRequestRepository,
    },
    DatabaseProvider,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class DeliveryRequestModule {}

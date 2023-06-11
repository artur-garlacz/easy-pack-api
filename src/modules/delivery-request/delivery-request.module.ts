import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from 'src/modules/delivery-request/application/commands/handler';
import { QueryHandlers } from 'src/modules/delivery-request/application/queries/handler';
import { IDeliveryRequestRepository } from 'src/modules/delivery-request/domain/delivery-request.repository';
import { DeliveryRequestRepository } from 'src/modules/delivery-request/infra/db/delivery-request.repository';
import { DeliveryRequestController } from 'src/modules/delivery-request/infra/http/delivery-request.controller';
import { UserDeliveryRequestController } from 'src/modules/delivery-request/infra/http/user-delivery-request.controller';
import { DatabaseProvider } from 'src/shared/db/db.provider';

@Module({
  imports: [CqrsModule],
  controllers: [DeliveryRequestController, UserDeliveryRequestController],
  providers: [
    {
      provide: IDeliveryRequestRepository,
      useClass: DeliveryRequestRepository,
    },
    DatabaseProvider,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class DeliveryRequestModule {}

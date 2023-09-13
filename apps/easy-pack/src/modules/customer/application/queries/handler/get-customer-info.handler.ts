import { Logger } from '@nestjs/common';
import { QueryHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerRegisteredEvent } from '@app/ep/modules/customer/application/events/impl/customer-registered.event';

@QueryHandler(CustomerRegisteredEvent)
export class CustomerRegisteredHandler
  implements IEventHandler<CustomerRegisteredEvent>
{
  private logger = new Logger();

  handle(event: CustomerRegisteredEvent) {
    this.logger.log('CustomerRegisteredEvent');
  }
}

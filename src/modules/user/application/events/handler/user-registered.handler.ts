import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from 'src/modules/user/application/events/impl/user-registered.event';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler
  implements IEventHandler<UserRegisteredEvent>
{
  private logger = new Logger();

  handle(event: UserRegisteredEvent) {
    this.logger.log('UserRegisteredEvent');
  }
}

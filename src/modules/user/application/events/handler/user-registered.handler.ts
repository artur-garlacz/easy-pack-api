import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from 'src/modules/user/application/events/impl/user-registered.event';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler
  implements IEventHandler<UserRegisteredEvent>
{
  handle(event: UserRegisteredEvent) {
    console.log('UserRegisteredEvent...');
  }
}

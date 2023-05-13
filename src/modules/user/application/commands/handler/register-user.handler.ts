import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { RegisterUserCommand } from '../impl/register-user.command';
import { IUserRepository } from 'src/modules/user/domain/user.repository';
import { Inject } from '@nestjs/common';
import { UserRegisteredEvent } from 'src/modules/user/application/events/impl/user-registered.event';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async execute({ payload }: RegisterUserCommand) {
    console.log('RegisterUserHandler.command', payload);
    const user = await this.userRepository.create({ ...payload });
    console.log('RegisterUserHandler.user', user);
    this.eventBus.publish(
      new UserRegisteredEvent({
        cognitoId: payload.cognitoId,
        email: payload.email,
      }),
    );
  }
}

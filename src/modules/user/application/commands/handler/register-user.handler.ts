import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
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
    await this.userRepository.create({ ...payload });

    this.eventBus.publish(
      new UserRegisteredEvent({
        cognitoId: payload.cognitoId,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      }),
    );
  }
}

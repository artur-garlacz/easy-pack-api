import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { UserRepository } from 'src/modules/user/domain/repository/user.repository';
import { User } from 'src/modules/user/domain/user.entity';
import { randomUUID } from 'crypto';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RegisterUserCommand) {
    const { cognitoId, email } = command;

    const user = this.publisher.mergeObjectContext(
      await this.repository.save(new User(randomUUID(), email)),
    );
    user.commit();
  }
}

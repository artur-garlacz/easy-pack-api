import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthService } from 'src/modules/auth/auth.service';
import { RegisterUserCommand } from 'src/modules/user/application/commands/impl/register-user.command';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService,
  ) {}

  async signUpUser(email: string, password: string) {
    const [{ UserSub }] = await Promise.all([
      this.authService.signUpUser(email, password),
      this.authService.addUserToCustomGroup(email, 'Users'),
    ]);
    this.commandBus.execute(
      new RegisterUserCommand({ email, cognitoId: UserSub }),
    );
  }
}

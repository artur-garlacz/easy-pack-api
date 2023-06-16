import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginUserDto } from 'src/modules/user/api/dtos/login-user.dto';
import { RegisterUserDto } from 'src/modules/user/api/dtos/register-user.dto';
import { RegisterUserCommand } from 'src/modules/user/application/commands/impl/register-user.command';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService,
  ) {}

  async signUpUser({ email, firstName, lastName, password }: RegisterUserDto) {
    const { UserSub } = await this.authService.signUpUser(email, password);
    await this.authService.addUserToCustomGroup(email, 'Users');

    this.commandBus.execute(
      new RegisterUserCommand({
        email,
        cognitoId: UserSub,
        firstName,
        lastName,
      }),
    );
  }

  async signIn({ email, password }: LoginUserDto) {
    const res = await this.authService.loginUser(email, password);

    if (!res) throw new Error('Invalid credentials');

    return {
      accessToken: res.AccessToken,
      refreshToken: res.RefreshToken,
      expiresIn: res.ExpiresIn,
    };
  }
}

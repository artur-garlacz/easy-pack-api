import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '@app/ep/modules/auth/auth.service';
import { LoginUserDto } from '@app/ep/modules/user/infra/api/dtos/login-user.dto';
import { RegisterUserDto } from '@app/ep/modules/user/infra/api/dtos/register-user.dto';
import { USER_ROLE } from '@app/ep/modules/user/domain/user.entity';
import { IUserRepository } from '@app/ep/modules/user/domain/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly authService: AuthService,
  ) {}

  async signUpUser({ email, firstName, lastName, password }: RegisterUserDto) {
    const { UserSub } = await this.authService.signUpUser(email, password);
    await this.authService.addUserToCustomGroup(email, 'Users');

    await this.userRepository.create({
      cognitoId: UserSub,
      email,
      firstName,
      lastName,
      role: USER_ROLE.OWNER,
    });
  }

  // async createEmployee({ email, firstName, lastName, password }: ){
  //   await this.userRepository.create({
  //     cognitoId: UserSub,
  //     email,
  //     firstName,
  //     lastName,
  //     role: USER_ROLE.OWNER,
  //   });
  // }

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

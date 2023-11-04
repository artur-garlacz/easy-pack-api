import { randomFillSync } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '@app/ep/modules/auth/auth.service';
import { LoginUserDto } from '@app/ep/modules/user/infra/api/dtos/login-user.dto';
import { CreateUserDto } from '@app/ep/modules/user/infra/api/dtos/register-user.dto';
import { IUserRepository } from '@app/ep/modules/user/domain/user.repository';
import { MailerService } from '@app/ep/shared/mailer/mailer.service';
import { Pagination } from '@app/ep/shared/utils/pagination';
import { USER_ROLE } from '@app/ep/modules/user/domain/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository) private readonly userRepository: IUserRepository,
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  async createUser({ email, firstName, lastName, role }: CreateUserDto) {
    const password = this.generateRandomPassword();
    const { UserSub } = await this.authService.signUpUser(email, password);
    await this.authService.addUserToCustomGroup(email, 'Users');

    await this.userRepository.create({
      cognitoId: UserSub,
      email,
      firstName,
      lastName,
      role,
    });

    await this.mailerService.sendEmail({
      to: email,
      subject: `Welcome on board ${firstName} ${lastName}`,
      message: `You've been added to our system Easy Pack.\n Here is your temporary password: ${password}`,
    });

    return { message: 'User created successfully' };
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

  private generateRandomPassword(
    length = 20,
    characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
  ) {
    return Array.from(randomFillSync(new Uint32Array(length)))
      .map((x) => characters[x % characters.length])
      .join('');
  }

  async getCouriers({ pagination }: { pagination: Pagination }) {
    const filters = { role: USER_ROLE.COURIER };
    const couriers = await this.userRepository.getMany({
      pagination,
      filters,
    });
    const numberOfCouriers = await this.userRepository.getCount({
      filters,
    });

    return {
      data: couriers.map(({ firstName, lastName, ...item }) => ({
        ...item,
        fullName: `${firstName} ${lastName}`,
      })),
      currentPage: pagination.page,
      numberOfPages: Math.ceil(numberOfCouriers / pagination.limit),
      itemsCount: couriers.length,
    };
  }
}

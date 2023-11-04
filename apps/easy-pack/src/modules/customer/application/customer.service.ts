import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthService } from '@app/ep/modules/auth/auth.service';
import { ConfirmAccountDto } from '@app/ep/modules/customer/api/dtos/confirm-account.dto';
import { LoginCustomerDto } from '@app/ep/modules/customer/api/dtos/login-customer.dto';
import { RegisterCustomerDto } from '@app/ep/modules/customer/api/dtos/register-customer.dto';
import { ICustomerRepository } from '@app/ep/modules/customer/domain/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService,
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async signUp({ email, firstName, lastName, password }: RegisterCustomerDto) {
    const customer = await this.customerRepository.getOne({ email });

    if (customer) {
      throw new Error('Customer already exists');
    }

    const { UserSub } = await this.authService.signUpUser(email, password);
    this.authService.addUserToCustomGroup(email, 'Customers');

    if (!UserSub) throw new Error('Cognito id is undefined');

    await this.customerRepository.create({
      email,
      cognitoId: UserSub,
      firstName,
      lastName,
    });
  }

  async signIn({ email, password }: LoginCustomerDto) {
    const res = await this.authService.loginUser(email, password);

    if (!res) throw new Error('Invalid credentials');

    return {
      accessToken: res.AccessToken,
      refreshToken: res.RefreshToken,
      expiresIn: res.ExpiresIn,
    };
  }

  async confirm({ email, code }: ConfirmAccountDto) {
    return await this.authService.confirmUser(email, code);
  }
}

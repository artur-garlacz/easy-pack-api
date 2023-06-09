import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import { ICustomerRepository } from 'src/modules/customer/domain/customer.repository';
import { CustomerRepository } from 'src/modules/customer/repository/customer.repository';
import { DatabaseProvider } from 'src/shared/db/db.provider';
import { IUserRepository } from 'src/modules/user/domain/user.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    JwtStrategy,
    DatabaseProvider,
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

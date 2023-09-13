import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/ep/modules/auth/jwt.strategy';
import { ICustomerRepository } from '@app/ep/modules/customer/domain/customer.repository';
import { CustomerRepository } from '@app/ep/modules/customer/repository/customer.repository';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';
import { IUserRepository } from '@app/ep/modules/user/domain/user.repository';
import { UserRepository } from '@app/ep/modules/user/infra/user.repository';

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

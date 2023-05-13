import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/jwt.strategy';
import { ICustomerRepository } from 'src/modules/customer/domain/customer.repository';
import { CustomerRepository } from 'src/modules/customer/repository/customer.repository';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserController } from 'src/modules/user/infra/api/user.controller';
import { UserService } from 'src/modules/user/application/user.service';
import { IUserRepository } from 'src/modules/user/domain/user.repository';
import { UserRepository } from 'src/modules/user/infra/user.repository';
import { DatabaseProvider } from 'src/shared/db/db.provider';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    AuthService,
    UserService,
    DatabaseProvider,
  ],
})
export class UserModule {}

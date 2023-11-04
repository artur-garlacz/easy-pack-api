import { Logger, Module } from '@nestjs/common';
import { AuthService } from '@app/ep/modules/auth/auth.service';
import { UserController } from '@app/ep/modules/user/infra/api/user.controller';
import { UserService } from '@app/ep/modules/user/application/user.service';
import { IUserRepository } from '@app/ep/modules/user/domain/user.repository';
import { UserRepository } from '@app/ep/modules/user/infra/user.repository';
import { DatabaseProvider } from '@app/ep/shared/db/db.provider';
import { MailerService } from '@app/ep/shared/mailer/mailer.service';

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
    MailerService,
    Logger,
  ],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserController } from 'src/modules/user/api/user.controller';
import { CommandHandlers } from 'src/modules/user/application/commands/handler';
import { EventHandlers } from 'src/modules/user/application/events/handler';
import { UserService } from 'src/modules/user/application/user.service';
import { IUserRepository } from 'src/modules/user/domain/user.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { DatabaseProvider } from 'src/shared/db/db.provider';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    AuthService,
    UserService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    DatabaseProvider,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class UserModule {}

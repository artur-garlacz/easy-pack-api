import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { KnexModule } from 'nest-knexjs';
import { DbModule } from 'src/shared/db/db.module';
// import { ConfigModule } from 'src/shared/infra/config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule.forRoot(),
    // KnexModule.forRoot({
    //   config: {
    //     client: 'pg',
    //     useNullAsDefault: true,
    //     connection:
    //       'postgresql://admin:admin@localhost:5432/db?schema=public&connect_timeout=500',
    //   },
    // }),

    CqrsModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}

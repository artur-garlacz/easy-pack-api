import { DynamicModule, Module } from '@nestjs/common';
import { KnexModule, KnexModuleOptions } from 'nest-knexjs';

import { ConfigModule } from '@app/ep/shared/config/config.module';
import { ConfigService } from '@app/ep/shared/config/config.service';

@Module({})
export class DbModule {
  private static getConnectionOptions(): KnexModuleOptions {
    return {
      name: process.env.NODE_ENV || 'local',
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: process.env.DATABASE_URL,
        pool: {
          afterCreate: (conn, done) => {
            conn.query('SET timezone="UTC";', function (err) {
              if (err) {
                // first query failed,
                // return error and don't try to make next query
                done(err, conn);
              } else {
                // do the second query...
                conn.query('select 1+1 as result', function (err) {
                  console.log('Knex is up and running');
                  done(err, conn);
                });
              }
            });
          },
        },
      },
      retryAttempts: 4,
      retryDelay: 20000,
    };
  }

  public static forRoot(): DynamicModule {
    return {
      module: DbModule,
      imports: [
        KnexModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: () => DbModule.getConnectionOptions(),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}

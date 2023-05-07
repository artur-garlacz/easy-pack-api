import { DynamicModule, Inject, Logger, Module } from '@nestjs/common';
import { KnexModule, KnexModuleOptions } from 'nest-knexjs';

import { ConfigModule } from 'src/shared/infra/config/config.module';
import { ConfigService } from 'src/shared/infra/config/config.service';
import knexfile from 'knexfile';

@Module({})
export class DbModule {
  private static getConnectionOptions(
    config: ConfigService,
    logger: Logger,
  ): KnexModuleOptions {
    const configOptions = knexfile[process.env.NODE_ENV || 'local'];

    return {
      name: process.env.NODE_ENV || 'local',
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: process.env.DATABASE_URL,
        pool: {
          afterCreate: (conn, done) => {
            console.log('xd');
            conn.query('SET timezone="UTC";', function (err) {
              if (err) {
                // first query failed,
                // return error and don't try to make next query
                done(err, conn);
              } else {
                // do the second query...
                conn.query('SELECT set_limit(0.01);', function (err) {
                  // if err is not falsy,
                  //  connection is discarded from pool
                  // if connection aquire was triggered by a
                  // query the error is passed to query promise
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
          useFactory: (configService: ConfigService, logger: Logger) =>
            DbModule.getConnectionOptions(configService, logger),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}

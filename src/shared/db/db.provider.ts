import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

import knexConfig from 'knexfile';

@Injectable()
export class DatabaseProvider {
  knex: Knex;

  constructor() {
    const environment = process.env.NODE_ENV || 'local';
    const config = knexConfig[environment];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.knex = require('knex')(config);
  }

  getKnexInstance(): Knex {
    return this.knex;
  }
}

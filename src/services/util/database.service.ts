import * as knex from 'knex';
import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private _connection;

  constructor() {

    const information = this.getDatabaseInformation(process.env.ENV || 'development');
    this._connection = knex({
      client: 'postgres',
      connection: {
        host: information.host,
        user: information.username,
        password: information.password,
        database: information.database,
      },
      pool: { min: information.pool.min, max: information.pool.max },
    });
  }

  get connection() {
      return this._connection;
  }

  private getDatabaseInformation(env: string) {
    const resultado = readFileSync('src/config/config.json', {encoding: 'utf-8'});
    const resultadoParse = JSON.parse(resultado);
    return resultadoParse.datasource[env];
  }
}

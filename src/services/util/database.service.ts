import * as knex from 'knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private connection;

  constructor() {
    this.connection = knex({
      client: 'postgres',
      connection: {
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'data_base',
      },
      pool: { min: 2, max: 100 },
    });
  }

  getConnection() {
      return this.connection;
  }
}

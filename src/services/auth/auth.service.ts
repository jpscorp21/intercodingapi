import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as knex from 'knex';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  async login(usuario, password) {
    const connection = this.getConnection(usuario, password);

    return connection
      .raw(`select intercoding.f_validar_usuario('${usuario}', '${password}')`)
      .then(data => {

        const payload = { usuario };
        const token = this.jwtService.sign(payload);

        return {
          token,
          status: 'success',
        };
      })
      .catch(error => {
        return {
          status: 'error',
          message: 'El usuario no esta registrado en la base de datos',
        };
      })

      .finally(() => {
        connection.destroy();
      });
  }

  getConnection(usuario, password) {
    return knex({
      client: 'postgresql',
      connection: `postgres://${usuario}:${password}@localhost:5432/data_base`,
    });
  }

}

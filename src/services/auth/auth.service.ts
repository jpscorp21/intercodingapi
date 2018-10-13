import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../util/database.service';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService,
              private readonly databaseService: DatabaseService) {}

  async login(usuario, password) {

    return this.databaseService.connection
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
      });
  }

}

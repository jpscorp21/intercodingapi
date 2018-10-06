import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../util/database.service';

@Injectable()
export class StaffService {

    constructor(private databaseService: DatabaseService) {}

    validarJurado(usuario: string, password: string) {
      return this.databaseService.getConnection()
      .raw(`select intercoding.f_validar_jurado('${usuario}', '${password}')`)
      .then((data) => data.rows[0].f_validar_jurado);
    }
}

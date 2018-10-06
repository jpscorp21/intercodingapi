import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../util/database.service';

@Injectable()
export class LenguajesService {

    constructor(private databaseService: DatabaseService) {}

    getAll() {

        return this.databaseService.getConnection()
        .withSchema('intercoding')
        .table('t_lenguajes')
        .select();
    }

    getById(id) {

        return this.databaseService.getConnection()
        .withSchema('intercoding')
        .table('t_lenguajes')
        .select()
        .where('cod_lenguaje', id);
    }

}

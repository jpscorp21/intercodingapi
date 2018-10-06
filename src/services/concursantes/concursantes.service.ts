import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../util/database.service';

@Injectable()
export class ConcursantesService {
    constructor(private databaseService: DatabaseService) {}

    getConcursante(usuario: string) {
        return this.databaseService.getConnection()
        .withSchema('intercoding')
        .table('t_concursantes')
        .select()
        .where('usuario', usuario);
    }

    getAll() {
        return this.databaseService.getConnection()
        .withSchema('intercoding')
        .table('t_concursantes')
        .select();
    }
}

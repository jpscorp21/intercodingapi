import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../util/database.service';

@Injectable()
export class ConcursantesService {
    constructor(private databaseService: DatabaseService) {}

    getConcursante(usuario: string) {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .table('t_concursantes')
        .select()
        .where('usuario', usuario);
    }

    getAll() {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .table('t_concursantes')
        .select();
    }

    getAllConcursantes() {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .select('estado', 'cod_aleatorio',
                'eje.cod_ejercicio', 'titulo',
                'eje.cod_categoria',
                'eje.grado_dificultad', 'con.nombre', 'con.apellido', 'con.usuario', 'estado')
        .from('t_aleatorios as ale')
        .joinRaw(`
            inner join intercoding.t_ejercicios eje
            on ale.cod_ejercicio = eje.cod_ejercicio and
            ale.cod_categoria = eje.cod_categoria and
            ale.grado_dificultad = eje.grado_dificultad
            inner join intercoding.t_concursantes con
            on con.usuario = ale.usuario
        `)
        .whereIn('estado', ['DES'])
        .orderBy('cod_aleatorio', 'asc');
    }

    getConcursanteByDesarrollo(id) {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .select('estado', 'cod_aleatorio',
                'eje.cod_ejercicio', 'titulo',
                'eje.cod_categoria',
                'eje.grado_dificultad', 'con.nombre', 'con.apellido', 'con.usuario', 'estado')
        .from('t_aleatorios as ale')
        .joinRaw(`
            inner join intercoding.t_ejercicios eje
            on ale.cod_ejercicio = eje.cod_ejercicio and
            ale.cod_categoria = eje.cod_categoria and
            ale.grado_dificultad = eje.grado_dificultad
            inner join intercoding.t_concursantes con
            on con.usuario = ale.usuario
        `)
        .where('cod_aleatorio', id);
    }
}

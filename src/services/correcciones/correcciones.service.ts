import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../util/database.service';

@Injectable()
export class CorreccionesService {

    constructor(private databaseService: DatabaseService) {}

    getAll() {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .select('estado', 'cor.cod_aleatorio',
                'eje.cod_ejercicio', 'titulo',
                'eje.cod_categoria',
                'eje.grado_dificultad', 'con.nombre', 'con.apellido', 'con.usuario', 'estado')
        .from('t_correcciones as cor')
        .joinRaw(`
            inner join intercoding.t_aleatorios ale
            on ale.cod_aleatorio = cor.cod_aleatorio
            inner join intercoding.t_ejercicios eje
            on ale.cod_ejercicio = eje.cod_ejercicio and
            ale.cod_categoria = eje.cod_categoria and
            ale.grado_dificultad = eje.grado_dificultad
            inner join intercoding.t_concursantes con
            on con.usuario = ale.usuario
        `);
    }

}

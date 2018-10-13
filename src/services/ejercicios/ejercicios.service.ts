import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../util/database.service';

@Injectable()
export class EjerciciosService {
    constructor(private databaseService: DatabaseService) {}

    getAll(nombre: string, cod_categoria: string, grado_dificultad: string, cantidad: string) {

        return this.databaseService.connection()
        .withSchema('intercoding')
        .select('cod_aleatorio', 'eje.cod_ejercicio', 'descripcion', 'titulo', 'ejemplo', 'imagen', 'eje.cod_categoria', 'eje.grado_dificultad',
        'estado')
        .from('t_aleatorios as ale')
        .joinRaw(`
            inner join intercoding.t_ejercicios eje
            on ale.cod_ejercicio = eje.cod_ejercicio and
            ale.cod_categoria = eje.cod_categoria and
            ale.grado_dificultad = eje.grado_dificultad
        `)
        .where({
            usuario: nombre,
            ['eje.grado_dificultad']: grado_dificultad,
            ['eje.cod_categoria']: cod_categoria,
        })
        .whereIn('estado', ['NOL', 'LEC'])
        .orderBy('cod_aleatorio', 'asc')
        .limit(cantidad);

    }

    getEjercicioReanudar(nombre: string, cod_categoria: string, grado_dificultad: string) {

        return this.databaseService.connection()
        .withSchema('intercoding')
        .select('estado', 'cod_aleatorio',
                'eje.cod_ejercicio', 'descripcion', 'titulo',
                'ejemplo', 'imagen', 'eje.cod_categoria',
                'eje.grado_dificultad')
        .from('t_aleatorios as ale')
        .joinRaw(`
            inner join intercoding.t_ejercicios eje
            on ale.cod_ejercicio = eje.cod_ejercicio and
            ale.cod_categoria = eje.cod_categoria and
            ale.grado_dificultad = eje.grado_dificultad
        `)
        .where({
            usuario: nombre,
            ['eje.grado_dificultad']: grado_dificultad,
            ['eje.cod_categoria']: cod_categoria,
        })
        .whereIn('estado', ['LEC', 'DES', 'REV', 'COR'])
        .orderBy('cod_aleatorio', 'asc');

    }

    getById(id) {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .select('cod_ejercicio', 'titulo')
        .from('t_ejercicios')
        .where('cod_ejercicio', id);
    }

    updateEstado(estado, id) {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .table('t_aleatorios')
        .update('estado', estado)
        .where('cod_aleatorio', id);
    }

    updateNroEjercicio(nro, id) {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .table('t_aleatorios')
        .update('nro_ejercicio', nro)
        .where('cod_aleatorio', id);
    }

    searchEstadosTerminados(usuario, grado_dificultad, cod_categoria, cantidad) {
      return this.databaseService.connection()
      .raw(`select intercoding.f_terminados('${usuario}', 'TER', ${cod_categoria}, ${grado_dificultad}, ${cantidad})`)
      .then((data) => data.rows[0].f_terminados);
    }

    validarEntrega(id, puntaje, usuario) {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .table('t_aleatorios')
        .update({
            puntaje_jurado: puntaje,
            usuario_jurado: usuario,
        })
        .where('cod_aleatorio', id);
    }

    validarRevision(id, usuario) {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .table('t_aleatorios_det')
        .update({
            usuario_revision: usuario,
        })
        .where('cod_aleatorio', id)
        .whereNull('usuario_revision');

    }

    buscarEstado(usu, categoria) {
        return this.databaseService.connection()
        .withSchema('intercoding')
        .select('estado', 'cod_ejercicio', 'usuario', 'grado_dificultad', 'cod_categoria', 'cod_aleatorio')
        .from('t_aleatorios')
        .whereRaw(`estado in ('LEC', 'DES', 'REV', 'COR') and usuario = ? and cod_categoria = ?`, [usu, categoria]);
    }
}
